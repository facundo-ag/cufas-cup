/**
 * RANKING FIFA / HISTÓRICO SERVICE
 * Agrega y consolida todas las estadísticas de los jugadores a través de las distintas ediciones.
 */
import { EDITION_2025_DATA } from './data2025.js';

function normalizePlayerName(name) {
  if (!name) return '';
  const trimmed = name.trim();
  if (trimmed === 'Lucas (Lucas A)' || trimmed === 'Lucas') return 'Lucas A';
  if (trimmed === 'Lucca (Lucas B)' || trimmed === 'Lucca') return 'Lucas B';
  return trimmed;
}

export function computeHistoricalRanking(edition2State) {
  const rankingMap = {};

  function getOrCreatePlayer(rawName) {
    const name = normalizePlayerName(rawName);
    if (!rankingMap[name]) {
      rankingMap[name] = {
        name,
        editions: new Set(),
        pj: 0,
        pg: 0,
        pe: 0,
        pp: 0,
        gf: 0,
        gc: 0,
        dg: 0,
        pts: 0,
        titles: 0,       // 🏆 1er puesto
        runnerUps: 0,    // 🥈 2do puesto
        thirdPlaces: 0,  // 🥉 3er puesto
        fourthPlaces: 0, // 🏅 4to puesto
        bestFinish: 'Participante',
        teamsHistory: [] // [{ edition: '2025', team: 'Inter de Milán' }]
      };
    }
    return rankingMap[name];
  }

  // ==========================================
  // 1. PROCESAR EDICIÓN 2025 (Cufa's Cup I)
  // ==========================================
  // Registro de equipos usados en 2025
  EDITION_2025_DATA.teams.forEach(t => {
    const p = getOrCreatePlayer(t.player);
    p.editions.add("Cufa's Cup I (2025)");
    p.teamsHistory.push({ edition: "2025", team: t.team, shield: t.shield });
  });

  // Partidos Fase de Grupos 2025
  EDITION_2025_DATA.groupMatches.forEach(m => {
    const pHome = getOrCreatePlayer(m.homePlayer);
    const pAway = getOrCreatePlayer(m.awayPlayer);

    pHome.pj += 1;
    pAway.pj += 1;
    pHome.gf += m.homeScore;
    pHome.gc += m.awayScore;
    pAway.gf += m.awayScore;
    pAway.gc += m.homeScore;

    if (m.homeScore > m.awayScore) {
      pHome.pg += 1;
      pHome.pts += 3;
      pAway.pp += 1;
    } else if (m.homeScore < m.awayScore) {
      pAway.pg += 1;
      pAway.pts += 3;
      pHome.pp += 1;
    } else {
      pHome.pe += 1;
      pHome.pts += 1;
      pAway.pe += 1;
      pAway.pts += 1;
    }
  });

  // Partidos Playoffs 2025
  const playoffs25 = [
    ...EDITION_2025_DATA.playoffs.quarters,
    ...EDITION_2025_DATA.playoffs.semifinals,
    EDITION_2025_DATA.playoffs.thirdPlace,
    EDITION_2025_DATA.playoffs.final
  ];

  playoffs25.forEach(m => {
    if (!m || m.homeScore === null || m.awayScore === null) return;
    const pHome = getOrCreatePlayer(m.homePlayer);
    const pAway = getOrCreatePlayer(m.awayPlayer);

    pHome.pj += 1;
    pAway.pj += 1;
    pHome.gf += m.homeScore;
    pHome.gc += m.awayScore;
    pAway.gf += m.awayScore;
    pAway.gc += m.homeScore;

    if (m.homeScore > m.awayScore) {
      pHome.pg += 1;
      pHome.pts += 3;
      pAway.pp += 1;
    } else if (m.homeScore < m.awayScore) {
      pAway.pg += 1;
      pAway.pts += 3;
      pHome.pp += 1;
    } else {
      pHome.pe += 1;
      pHome.pts += 1;
      pAway.pe += 1;
      pAway.pts += 1;
    }
  });

  // Podio Oficial 2025
  const champ25 = getOrCreatePlayer(EDITION_2025_DATA.podium.champion.player);
  champ25.titles += 1;
  champ25.bestFinish = 'Campeón 🏆 (2025)';

  const runner25 = getOrCreatePlayer(EDITION_2025_DATA.podium.runnerUp.player);
  runner25.runnerUps += 1;
  if (!runner25.bestFinish.includes('Campeón')) runner25.bestFinish = 'Subcampeón 🥈 (2025)';

  const third25 = getOrCreatePlayer(EDITION_2025_DATA.podium.thirdPlace.player);
  third25.thirdPlaces += 1;
  if (!third25.bestFinish.includes('Campeón') && !third25.bestFinish.includes('Subcampeón')) {
    third25.bestFinish = '3° Puesto 🥉 (2025)';
  }

  const fourth25 = getOrCreatePlayer(EDITION_2025_DATA.podium.fourthPlace.player);
  fourth25.fourthPlaces += 1;
  if (fourth25.bestFinish === 'Participante') fourth25.bestFinish = '4° Puesto 🏅 (2025)';

  // ==========================================
  // 2. PROCESAR EDICIÓN 2026 (Cufa's Cup II)
  // ==========================================
  if (edition2State && edition2State.teams) {
    const teams26Map = {};
    edition2State.teams.forEach(t => {
      teams26Map[t.id] = t;
      if (t.player) {
        const p = getOrCreatePlayer(t.player);
        p.editions.add("Cufa's Cup II (2026)");
        p.teamsHistory.push({ edition: "2026", team: t.name, shield: t.shield });
      }
    });

    // Partidos Fase de Liga de Edición 2
    if (edition2State.matches) {
      edition2State.matches.forEach(m => {
        if (m.status !== 'finished' || m.homeScore === null || m.awayScore === null) return;
        const homeTeam = teams26Map[m.homeTeamId];
        const awayTeam = teams26Map[m.awayTeamId];
        if (!homeTeam || !awayTeam || !homeTeam.player || !awayTeam.player) return;

        const pHome = getOrCreatePlayer(homeTeam.player);
        const pAway = getOrCreatePlayer(awayTeam.player);

        pHome.pj += 1;
        pAway.pj += 1;
        pHome.gf += m.homeScore;
        pHome.gc += m.awayScore;
        pAway.gf += m.awayScore;
        pAway.gc += m.homeScore;

        if (m.homeScore > m.awayScore) {
          pHome.pg += 1;
          pHome.pts += 3;
          pAway.pp += 1;
        } else if (m.homeScore < m.awayScore) {
          pAway.pg += 1;
          pAway.pts += 3;
          pHome.pp += 1;
        } else {
          pHome.pe += 1;
          pHome.pts += 1;
          pAway.pe += 1;
          pAway.pts += 1;
        }
      });
    }

    // Eliminatorias de Edición 2
    if (edition2State.bracket) {
      const allKnockoutMatches = [];
      const br = edition2State.bracket;
      if (br.playoffs) allKnockoutMatches.push(...br.playoffs);
      if (br.quarters) allKnockoutMatches.push(...br.quarters);
      if (br.semifinals) allKnockoutMatches.push(...br.semifinals);
      if (br.thirdPlace) allKnockoutMatches.push(br.thirdPlace);
      if (br.final) allKnockoutMatches.push(br.final);

      allKnockoutMatches.forEach(m => {
        if (!m || m.status !== 'finished' || m.homeScore === null || m.awayScore === null) return;
        const pHome = m.homeTeam?.player ? getOrCreatePlayer(m.homeTeam.player) : null;
        const pAway = m.awayTeam?.player ? getOrCreatePlayer(m.awayTeam.player) : null;

        if (pHome && pAway) {
          pHome.pj += 1;
          pAway.pj += 1;
          pHome.gf += m.homeScore;
          pHome.gc += m.awayScore;
          pAway.gf += m.awayScore;
          pAway.gc += m.homeScore;

          if (m.homeScore > m.awayScore) {
            pHome.pg += 1;
            pHome.pts += 3;
            pAway.pp += 1;
          } else if (m.homeScore < m.awayScore) {
            pAway.pg += 1;
            pAway.pts += 3;
            pHome.pp += 1;
          } else {
            pHome.pe += 1;
            pHome.pts += 1;
            pAway.pe += 1;
            pAway.pts += 1;
          }
        }
      });

      // Podio Edición 2 si está definido
      if (br.champion?.player) {
        const c2 = getOrCreatePlayer(br.champion.player);
        c2.titles += 1;
        c2.bestFinish = 'Campeón 🏆 (2026)';
      }
      if (br.runnerUp?.player) {
        const r2 = getOrCreatePlayer(br.runnerUp.player);
        r2.runnerUps += 1;
        if (!r2.bestFinish.includes('Campeón')) r2.bestFinish = 'Subcampeón 🥈 (2026)';
      }
      if (br.thirdPlaceWinner?.player) {
        const t2 = getOrCreatePlayer(br.thirdPlaceWinner.player);
        t2.thirdPlaces += 1;
        if (!t2.bestFinish.includes('Campeón') && !t2.bestFinish.includes('Subcampeón')) {
          t2.bestFinish = '3° Puesto 🥉 (2026)';
        }
      }
    }
  }

  // ==========================================
  // 3. CALCULAR DIFERENCIAS Y EFECTIVIDAD
  // ==========================================
  const rankingList = Object.values(rankingMap).map(p => {
    p.dg = p.gf - p.gc;
    p.editionsCount = p.editions.size;
    p.editionsList = Array.from(p.editions);
    p.effectiveness = p.pj > 0 ? Math.round((p.pts / (p.pj * 3)) * 100) : 0;
    p.winRate = p.pj > 0 ? Math.round((p.pg / p.pj) * 100) : 0;
    return p;
  });

  // ==========================================
  // 4. CRITERIO DE DESEMPATE OFICIAL FIFA / CUFA'S CUP
  // ==========================================
  // 1° Puntos (PTS)
  // 2° Títulos (🏆)
  // 3° Subcampeonatos (🥈)
  // 4° Diferencia de Gol (+/-)
  // 5° Goles a Favor (GF)
  // 6° Partidos Ganados (PG)
  rankingList.sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    if (b.titles !== a.titles) return b.titles - a.titles;
    if (b.runnerUps !== a.runnerUps) return b.runnerUps - a.runnerUps;
    if (b.dg !== a.dg) return b.dg - a.dg;
    if (b.gf !== a.gf) return b.gf - a.gf;
    return b.pg - a.pg;
  });

  // Asignar posición histórica 1..N
  rankingList.forEach((p, idx) => {
    p.rank = idx + 1;
  });

  return rankingList;
}
