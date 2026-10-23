/**
 * Central State Store & FIFA/Champions League Rules Engine
 */
import { dbService } from './db.js';

class TournamentStore {
  constructor() {
    this.state = {
      tournamentName: "Cufa's Cup 2",
      teams: [],
      matches: [],
      bracket: null,
      adminPin: "chadnaldo123",
      activePortal: 'hub',
      activeTab: 'standings',
      active2025Tab: 'playoffs',
      selectedParticipantId: null,
      selectedMatchday: 1,
      filterPlayer: '',
      isAdminAuthenticated: false
    };
    this.subscribers = [];
  }

  async init() {
    const data = await dbService.loadData();
    this.state = {
      ...this.state,
      ...data
    };

    if (this.state.adminPin === "1234" || !this.state.adminPin) {
      this.state.adminPin = "chadnaldo123";
      this.persist();
    }

    // Listen for cloud/remote updates
    dbService.listenForRemoteUpdates((updatedData) => {
      this.state = {
        ...this.state,
        ...updatedData
      };
      this.notify();
    });

    this.notify();
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    callback(this.state);
  }

  notify() {
    this.subscribers.forEach(cb => cb(this.state));
  }

  setPortal(portal) {
    this.state.activePortal = portal;
    this.notify();
  }

  setTab(tab) {
    this.state.activeTab = tab;
    this.notify();
  }

  selectParticipant(teamId) {
    this.state.selectedParticipantId = teamId;
    this.state.activeTab = 'participant';
    this.notify();
  }

  set2025Tab(tab) {
    this.state.active2025Tab = tab;
    this.notify();
  }

  setMatchday(day) {
    this.state.selectedMatchday = Number(day);
    this.notify();
  }

  setPlayerFilter(query) {
    this.state.filterPlayer = (query || '').toLowerCase().trim();
    this.notify();
  }

  authenticateAdmin(pin) {
    if (pin === this.state.adminPin || pin === "chadnaldo123") {
      this.state.isAdminAuthenticated = true;
      this.notify();
      return true;
    }
    return false;
  }

  logoutAdmin() {
    this.state.isAdminAuthenticated = false;
    this.notify();
  }

  setAdminPin(newPin) {
    this.state.adminPin = newPin;
    this.persist();
  }

  /**
   * Calculate full Standings Table with tie-breakers and form streak
   */
  getStandings() {
    const { teams, matches } = this.state;
    const table = {};

    teams.forEach(t => {
      table[t.id] = {
        team: t,
        pj: 0,
        pg: 0,
        pe: 0,
        pp: 0,
        gf: 0,
        gc: 0,
        dg: 0,
        pts: 0,
        form: [] // Last matches ['W', 'D', 'L']
      };
    });

    // Process finished matches
    matches.forEach(m => {
      if (m.status === 'finished' && m.homeScore !== null && m.awayScore !== null) {
        const home = table[m.homeTeamId];
        const away = table[m.awayTeamId];

        if (home && away) {
          home.pj += 1;
          away.pj += 1;

          home.gf += Number(m.homeScore);
          home.gc += Number(m.awayScore);
          away.gf += Number(m.awayScore);
          away.gc += Number(m.homeScore);

          if (m.homeScore > m.awayScore) {
            home.pg += 1;
            home.pts += 3;
            away.pp += 1;
            home.form.push('W');
            away.form.push('L');
          } else if (m.homeScore < m.awayScore) {
            away.pg += 1;
            away.pts += 3;
            home.pp += 1;
            away.form.push('W');
            home.form.push('L');
          } else {
            home.pe += 1;
            away.pe += 1;
            home.pts += 1;
            away.pts += 1;
            home.form.push('D');
            away.form.push('D');
          }
        }
      }
    });

    // Calculate DG and slice form to last 5
    const standingsList = Object.values(table).map(entry => {
      entry.dg = entry.gf - entry.gc;
      entry.form = entry.form.slice(-5);
      return entry;
    });

    // Sort by Points DESC -> DG DESC -> GF DESC -> Team Name ASC
    standingsList.sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      if (b.dg !== a.dg) return b.dg - a.dg;
      if (b.gf !== a.gf) return b.gf - a.gf;
      return a.team.name.localeCompare(b.team.name);
    });

    return standingsList;
  }

  /**
   * Update or Add Match Result
   */
  async updateMatch(matchId, updates) {
    const matchIndex = this.state.matches.findIndex(m => m.id === matchId);
    if (matchIndex !== -1) {
      this.state.matches[matchIndex] = {
        ...this.state.matches[matchIndex],
        ...updates
      };
      await this.persist();
    }
  }

  /**
   * Update Bracket Matchup (Playoffs / Cuartos / Semis / Tercer Puesto / Final)
   */
  async updateBracketMatch(stage, matchId, updates) {
    if (!this.state.bracket) return;

    if (stage === 'final') {
      this.state.bracket.final = {
        ...this.state.bracket.final,
        ...updates
      };
      if (updates.winner) {
        this.state.bracket.champion = updates.winner;
        if (this.state.bracket.final.team1 && this.state.bracket.final.team2) {
          this.state.bracket.runnerUp = updates.winner.id === this.state.bracket.final.team1.id 
            ? this.state.bracket.final.team2 
            : this.state.bracket.final.team1;
        }
      }
    } else if (stage === 'thirdPlace') {
      this.state.bracket.thirdPlace = {
        ...this.state.bracket.thirdPlace,
        ...updates
      };
      if (updates.winner) {
        this.state.bracket.thirdPlaceWinner = updates.winner;
      }
    } else if (this.state.bracket[stage]) {
      const matchIndex = this.state.bracket[stage].findIndex(m => m.id === matchId);
      if (matchIndex !== -1) {
        this.state.bracket[stage][matchIndex] = {
          ...this.state.bracket[stage][matchIndex],
          ...updates
        };
      }
    }

    // Auto-propagate bracket winners and losers
    this.propagateBracketProgression();
    await this.persist();
  }

  /**
   * Manually assign teams to any bracket match (e.g. from IRL Libertadores Draw)
   */
  async setBracketMatchTeams(stage, matchId, team1Id, team2Id) {
    if (!this.state.bracket) return;
    const findTeam = (id) => this.state.teams.find(t => t.id === id) || null;

    const t1 = team1Id ? findTeam(team1Id) : null;
    const t2 = team2Id ? findTeam(team2Id) : null;

    if (stage === 'final') {
      this.state.bracket.final.team1 = t1;
      this.state.bracket.final.team2 = t2;
    } else if (stage === 'thirdPlace') {
      this.state.bracket.thirdPlace.team1 = t1;
      this.state.bracket.thirdPlace.team2 = t2;
    } else if (this.state.bracket[stage]) {
      const match = this.state.bracket[stage].find(m => m.id === matchId);
      if (match) {
        match.team1 = t1;
        match.team2 = t2;
        // If assigned teams change and previous winner is no longer in match, reset winner
        if (match.winner && match.winner.id !== t1?.id && match.winner.id !== t2?.id) {
          match.winner = null;
          match.score1 = null;
          match.score2 = null;
          match.status = 'upcoming';
        }
      }
    }

    this.propagateBracketProgression();
    await this.persist();
  }

  /**
   * Sorteo Libertadores (Bombo 1 vs Bombo 2)
   * - Para Playoffs: Bombo 1 (5° al 8°) vs Bombo 2 (9° al 12°)
   * - Para Cuartos: Bombo 1 (1° al 4° de la tabla) vs Ganadores de Playoffs (Bombo 2)
   */
  async drawLibertadoresBracket() {
    const standings = this.getStandings();
    if (standings.length < 12) return;

    const b = this.state.bracket;
    if (!b) return;

    // Helper to shuffle an array (Fisher-Yates)
    const shuffle = (array) => {
      const arr = [...array];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    };

    // Sorteo Playoffs: Bombo 1 (5°-8°) vs Bombo 2 (9°-12°)
    const bombo1_playoffs = shuffle([standings[4].team, standings[5].team, standings[6].team, standings[7].team]);
    const bombo2_playoffs = shuffle([standings[8].team, standings[9].team, standings[10].team, standings[11].team]);

    b.playoffs.forEach((m, idx) => {
      m.team1 = bombo1_playoffs[idx];
      m.team2 = bombo2_playoffs[idx];
      m.score1 = null;
      m.score2 = null;
      m.winner = null;
      m.status = 'upcoming';
    });

    // Sorteo Cuartos: Bombo 1 (1°-4°) asignados a las llaves
    const bombo1_cuartos = shuffle([standings[0].team, standings[1].team, standings[2].team, standings[3].team]);
    b.quarterfinals.forEach((m, idx) => {
      m.team1 = bombo1_cuartos[idx];
      m.team2 = null; // Espera al ganador de playoff correspondiente según la llave sorteada
      m.score1 = null;
      m.score2 = null;
      m.winner = null;
      m.status = 'upcoming';
    });

    // Reset later rounds
    b.semifinals.forEach(m => {
      m.team1 = null;
      m.team2 = null;
      m.score1 = null;
      m.score2 = null;
      m.winner = null;
      m.status = 'upcoming';
    });

    b.final.team1 = null;
    b.final.team2 = null;
    b.final.score1 = null;
    b.final.score2 = null;
    b.final.winner = null;
    b.final.status = 'upcoming';

    if (!b.thirdPlace) {
      b.thirdPlace = { id: 'tp_1', label: 'Tercer Puesto 🥉', team1: null, team2: null, score1: null, score2: null, winner: null, status: 'upcoming' };
    } else {
      b.thirdPlace.team1 = null;
      b.thirdPlace.team2 = null;
      b.thirdPlace.score1 = null;
      b.thirdPlace.score2 = null;
      b.thirdPlace.winner = null;
      b.thirdPlace.status = 'upcoming';
    }

    b.champion = null;
    b.runnerUp = null;
    b.thirdPlaceWinner = null;

    this.propagateBracketProgression();
    await this.persist();
  }

  /**
   * Propagate bracket winners to next rounds and losers of Semis to Third Place match
   */
  propagateBracketProgression() {
    const b = this.state.bracket;
    if (!b) return;

    if (!b.thirdPlace) {
      b.thirdPlace = { id: 'tp_1', label: 'Tercer Puesto 🥉', team1: null, team2: null, score1: null, score2: null, winner: null, status: 'upcoming' };
    }

    // Playoffs winners -> QF team2 (if not manually overridden)
    if (b.playoffs && b.quarterfinals) {
      if (b.playoffs[3]?.winner) b.quarterfinals[0].team2 = b.playoffs[3].winner;
      if (b.playoffs[2]?.winner) b.quarterfinals[1].team2 = b.playoffs[2].winner;
      if (b.playoffs[1]?.winner) b.quarterfinals[2].team2 = b.playoffs[1].winner;
      if (b.playoffs[0]?.winner) b.quarterfinals[3].team2 = b.playoffs[0].winner;
    }

    // Cuartos winners -> Semifinales
    if (b.quarterfinals && b.semifinals) {
      if (b.quarterfinals[0]?.winner) b.semifinals[0].team1 = b.quarterfinals[0].winner;
      if (b.quarterfinals[3]?.winner) b.semifinals[0].team2 = b.quarterfinals[3].winner;
      if (b.quarterfinals[1]?.winner) b.semifinals[1].team1 = b.quarterfinals[1].winner;
      if (b.quarterfinals[2]?.winner) b.semifinals[1].team2 = b.quarterfinals[2].winner;
    }

    // Semifinales winners -> Gran Final & Semifinales losers -> Tercer Puesto
    if (b.semifinals && b.final && b.thirdPlace) {
      const sf1 = b.semifinals[0];
      const sf2 = b.semifinals[1];

      // SF1 resolution
      if (sf1?.winner && sf1.team1 && sf1.team2) {
        b.final.team1 = sf1.winner;
        const sf1Loser = sf1.winner.id === sf1.team1.id ? sf1.team2 : sf1.team1;
        b.thirdPlace.team1 = sf1Loser;
      }

      // SF2 resolution
      if (sf2?.winner && sf2.team1 && sf2.team2) {
        b.final.team2 = sf2.winner;
        const sf2Loser = sf2.winner.id === sf2.team1.id ? sf2.team2 : sf2.team1;
        b.thirdPlace.team2 = sf2Loser;
      }
    }

    // Final champion and runnerUp
    if (b.final?.winner && b.final.team1 && b.final.team2) {
      b.champion = b.final.winner;
      b.runnerUp = b.final.winner.id === b.final.team1.id ? b.final.team2 : b.final.team1;
    }

    // Third place winner
    if (b.thirdPlace?.winner) {
      b.thirdPlaceWinner = b.thirdPlace.winner;
    }
  }

  /**
   * Auto-populate Bracket teams based on current league standings (Standard seeding)
   */
  async syncBracketFromStandings() {
    const standings = this.getStandings();
    if (standings.length < 12) return;

    const b = this.state.bracket;
    if (!b) return;

    if (!b.thirdPlace) {
      b.thirdPlace = { id: 'tp_1', label: 'Tercer Puesto 🥉', team1: null, team2: null, score1: null, score2: null, winner: null, status: 'upcoming' };
    }

    // Only populate if not already set (preserves manual IRL draw assignments)
    if (!b.playoffs[0].team1) b.playoffs[0].team1 = standings[4].team; // 5°
    if (!b.playoffs[0].team2) b.playoffs[0].team2 = standings[11].team; // 12°

    if (!b.playoffs[1].team1) b.playoffs[1].team1 = standings[5].team; // 6°
    if (!b.playoffs[1].team2) b.playoffs[1].team2 = standings[10].team; // 11°

    if (!b.playoffs[2].team1) b.playoffs[2].team1 = standings[6].team; // 7°
    if (!b.playoffs[2].team2) b.playoffs[2].team2 = standings[9].team; // 10°

    if (!b.playoffs[3].team1) b.playoffs[3].team1 = standings[7].team; // 8°
    if (!b.playoffs[3].team2) b.playoffs[3].team2 = standings[8].team; // 9°

    // Direct QF seeds (1st to 4th):
    if (!b.quarterfinals[0].team1) b.quarterfinals[0].team1 = standings[0].team; // 1°
    if (!b.quarterfinals[1].team1) b.quarterfinals[1].team1 = standings[1].team; // 2°
    if (!b.quarterfinals[2].team1) b.quarterfinals[2].team1 = standings[2].team; // 3°
    if (!b.quarterfinals[3].team1) b.quarterfinals[3].team1 = standings[3].team; // 4°

    this.propagateBracketProgression();
    await this.persist();
  }

  async updateTeam(teamId, updates) {
    const idx = this.state.teams.findIndex(t => t.id === teamId);
    if (idx !== -1) {
      this.state.teams[idx] = {
        ...this.state.teams[idx],
        ...updates
      };
      await this.persist();
    }
  }

  /**
   * Seed Fecha 1 sample results (all 10 matches of Fecha 1 finished)
   */
  async seedFecha1Results() {
    const sampleScoresF1 = [
      { id: 'f1_c1_m1', homeScore: 5, awayScore: 0, status: 'finished' }, // Facu vs Maty V
      { id: 'f1_c1_m2', homeScore: 1, awayScore: 1, status: 'finished' }, // Pehuen vs Hernan
      { id: 'f1_c1_m3', homeScore: 2, awayScore: 0, status: 'finished' }, // Agus vs Lucas B
      { id: 'f1_c1_m4', homeScore: 4, awayScore: 1, status: 'finished' }, // Tomi A vs Tomi T
      { id: 'f1_c1_m5', homeScore: 0, awayScore: 2, status: 'finished' }, // Hernesto vs Mati A
      { id: 'f1_c2_m1', homeScore: 2, awayScore: 1, status: 'finished' }, // Marcos vs Joaco S
      { id: 'f1_c2_m2', homeScore: 3, awayScore: 3, status: 'finished' }, // Tomi P vs Diego
      { id: 'f1_c2_m3', homeScore: 1, awayScore: 2, status: 'finished' }, // Leo vs Chino
      { id: 'f1_c2_m4', homeScore: 2, awayScore: 0, status: 'finished' }, // Franco vs Santi
      { id: 'f1_c2_m5', homeScore: 3, awayScore: 1, status: 'finished' }  // Lucas A vs Gero
    ];

    sampleScoresF1.forEach(sample => {
      const idx = this.state.matches.findIndex(m => m.id === sample.id);
      if (idx !== -1) {
        this.state.matches[idx] = { ...this.state.matches[idx], ...sample };
      }
    });

    await this.persist();
  }

  /**
   * Seed all 4 Fechas (40 matches) for full league simulation testing
   */
  async seedAllTournamentResults() {
    // Generate realistic scores for all 40 matches
    this.state.matches = this.state.matches.map((m, i) => {
      const scores = [
        [2, 1], [3, 2], [1, 0], [2, 2], [0, 1], [3, 1], [0, 0], [4, 2], [1, 3], [2, 0]
      ];
      const [h, a] = scores[i % scores.length];
      return {
        ...m,
        homeScore: h,
        awayScore: a,
        status: 'finished'
      };
    });

    await this.syncBracketFromStandings();
    await this.persist();
  }

  /**
   * Reset all match scores to upcoming (0 PJ for everyone)
   */
  async resetAllResults() {
    this.state.matches = this.state.matches.map(m => ({
      ...m,
      homeScore: null,
      awayScore: null,
      status: 'upcoming'
    }));

    if (this.state.bracket) {
      ['playoffs', 'quarterfinals', 'semifinals'].forEach(stage => {
        if (this.state.bracket[stage]) {
          this.state.bracket[stage] = this.state.bracket[stage].map(bm => ({
            ...bm,
            team1: null,
            team2: null,
            score1: null,
            score2: null,
            winner: null,
            status: 'upcoming'
          }));
        }
      });
      if (this.state.bracket.thirdPlace) {
        this.state.bracket.thirdPlace = {
          ...this.state.bracket.thirdPlace,
          team1: null,
          team2: null,
          score1: null,
          score2: null,
          winner: null,
          status: 'upcoming'
        };
      }
      if (this.state.bracket.final) {
        this.state.bracket.final = {
          ...this.state.bracket.final,
          team1: null,
          team2: null,
          score1: null,
          score2: null,
          winner: null,
          status: 'upcoming'
        };
      }
      this.state.bracket.champion = null;
      this.state.bracket.runnerUp = null;
      this.state.bracket.thirdPlaceWinner = null;
    }

    await this.persist();
  }

  async persist() {
    await dbService.saveData({
      tournamentName: this.state.tournamentName,
      teams: this.state.teams,
      matches: this.state.matches,
      bracket: this.state.bracket,
      adminPin: this.state.adminPin
    });
    this.notify();
  }
}

export const store = new TournamentStore();
