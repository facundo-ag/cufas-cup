/**
 * CUFA'S CUP I - EDICIÓN 2025
 * Datos Oficiales con Escudos extraídos de resultados_del_torneo.md
 */

export function getTeamShield2025(teamOrPlayer) {
  if (!teamOrPlayer) return '⚽';
  const val = String(teamOrPlayer).toLowerCase();
  if (val.includes('barcelona') || val.includes('chino')) return 'Escudos/Barcelona.png';
  if (val.includes('juventus') || val.includes('tomi')) return 'Escudos/juventus.png';
  if (val.includes('inglaterra') || val.includes('marcos')) return 'Escudos/Inglaterra.png';
  if (val.includes('bayern') || val.includes('pehuen')) return 'Escudos/Bayern Munich.png';
  if (val.includes('inter') || val.includes('diego')) return 'Escudos/Inter d Milan.png';
  if (val.includes('psg') || val.includes('parís') || val.includes('hernesto')) return 'Escudos/PSG.png';
  if (val.includes('alemania') || val.includes('lucas a') || val.includes('lucas')) return 'Escudos/alemania.png';
  if (val.includes('bajos') || val.includes('holanda') || val.includes('leo')) return 'Escudos/holanda.png';
  if (val.includes('liverpool') || val.includes('facu')) return 'Escudos/Liverpool.png';
  if (val.includes('boca') || val.includes('mati')) return 'Escudos/Boca.png';
  if (val.includes('tottenham') || val.includes('santi')) return 'Escudos/Tottenham.png';
  if (val.includes('argentina') || val.includes('agus')) return 'Escudos/Argentina.png';
  if (val.includes('portugal') || val.includes('franco')) return 'Escudos/Portugal.png';
  if (val.includes('francia') || val.includes('lucca') || val.includes('lucas b')) return 'Escudos/Francia.png';
  if (val.includes('españa') || val.includes('lorenzo')) return 'Escudos/españa.png';
  if (val.includes('city') || val.includes('hernan')) return 'Escudos/Manchester City.png';
  return '⚽';
}

export const EDITION_2025_DATA = {
  id: 'cufas_cup_1',
  name: "Cufa's Cup I",
  season: "2025",
  format: "Fase de Grupos (4 grupos de 4) + Playoffs",
  teamsCount: 16,
  status: "finished",

  // 16 Jugadores y Equipos con Escudos Oficiales
  teams: [
    // Grupo A
    { id: 't25_diego', player: 'Diego', team: 'Inter de Milán', group: 'A', shield: 'Escudos/Inter d Milan.png' },
    { id: 't25_hernesto', player: 'Hernesto', team: 'París Saint-Germain (PSG)', group: 'A', shield: 'Escudos/PSG.png' },
    { id: 't25_facu', player: 'Facu', team: 'Liverpool', group: 'A', shield: 'Escudos/Liverpool.png' },
    { id: 't25_mati', player: 'Mati', team: 'Boca Juniors', group: 'A', shield: 'Escudos/Boca.png' },

    // Grupo B
    { id: 't25_chino', player: 'Chino', team: 'FC Barcelona', group: 'B', shield: 'Escudos/Barcelona.png' },
    { id: 't25_marcos', player: 'Marcos', team: 'Selección de Inglaterra', group: 'B', shield: 'Escudos/Inglaterra.png' },
    { id: 't25_santi', player: 'Santi', team: 'Tottenham Hotspur', group: 'B', shield: 'Escudos/Tottenham.png' },
    { id: 't25_agus', player: 'Agus', team: 'Selección de Argentina', group: 'B', shield: 'Escudos/Argentina.png' },

    // Grupo C
    { id: 't25_pehuen', player: 'Pehuen', team: 'Bayern Múnich', group: 'C', shield: 'Escudos/Bayern Munich.png' },
    { id: 't25_tomi', player: 'Tomi', team: 'Juventus', group: 'C', shield: 'Escudos/juventus.png' },
    { id: 't25_franco', player: 'Franco', team: 'Selección de Portugal', group: 'C', shield: 'Escudos/Portugal.png' },
    { id: 't25_lucca', player: 'Lucas B', displayName: 'Lucca (Lucas B)', team: 'Selección de Francia', group: 'C', shield: 'Escudos/Francia.png' },

    // Grupo D
    { id: 't25_lucas', player: 'Lucas A', displayName: 'Lucas (Lucas A)', team: 'Selección de Alemania', group: 'D', shield: 'Escudos/alemania.png' },
    { id: 't25_leo', player: 'Leo', team: 'Selección de Países Bajos', group: 'D', shield: 'Escudos/holanda.png' },
    { id: 't25_lorenzo', player: 'Lorenzo', team: 'Selección de España', group: 'D', shield: 'Escudos/españa.png' },
    { id: 't25_hernan', player: 'Hernan', team: 'Manchester City', group: 'D', shield: 'Escudos/Manchester City.png' }
  ],

  // Tablas de Posiciones de la Fase de Grupos
  groupStandings: {
    A: [
      { player: 'Diego', team: 'Inter de Milán', shield: 'Escudos/Inter d Milan.png', pj: 3, pg: 2, pe: 1, pp: 0, gf: 6, gc: 3, dg: 3, pts: 7, pos: 1 },
      { player: 'Hernesto', team: 'París Saint-Germain (PSG)', shield: 'Escudos/PSG.png', pj: 3, pg: 2, pe: 1, pp: 0, gf: 6, gc: 3, dg: 3, pts: 7, pos: 2 },
      { player: 'Facu', team: 'Liverpool', shield: 'Escudos/Liverpool.png', pj: 3, pg: 0, pe: 1, pp: 2, gf: 4, gc: 6, dg: -2, pts: 1, pos: 3 },
      { player: 'Mati', team: 'Boca Juniors', shield: 'Escudos/Boca.png', pj: 3, pg: 0, pe: 1, pp: 2, gf: 2, gc: 6, dg: -4, pts: 1, pos: 4 }
    ],
    B: [
      { player: 'Chino', team: 'FC Barcelona', shield: 'Escudos/Barcelona.png', pj: 3, pg: 3, pe: 0, pp: 0, gf: 19, gc: 1, dg: 18, pts: 9, pos: 1 },
      { player: 'Marcos', team: 'Selección de Inglaterra', shield: 'Escudos/Inglaterra.png', pj: 3, pg: 2, pe: 0, pp: 1, gf: 7, gc: 3, dg: 4, pts: 6, pos: 2 },
      { player: 'Santi', team: 'Tottenham Hotspur', shield: 'Escudos/Tottenham.png', pj: 3, pg: 1, pe: 0, pp: 2, gf: 4, gc: 9, dg: -5, pts: 3, pos: 3 },
      { player: 'Agus', team: 'Selección de Argentina', shield: 'Escudos/Argentina.png', pj: 3, pg: 0, pe: 0, pp: 3, gf: 1, gc: 18, dg: -17, pts: 0, pos: 4 }
    ],
    C: [
      { player: 'Pehuen', team: 'Bayern Múnich', shield: 'Escudos/Bayern Munich.png', pj: 3, pg: 3, pe: 0, pp: 0, gf: 7, gc: 0, dg: 7, pts: 9, pos: 1 },
      { player: 'Tomi', team: 'Juventus', shield: 'Escudos/juventus.png', pj: 3, pg: 2, pe: 0, pp: 1, gf: 11, gc: 2, dg: 9, pts: 6, pos: 2 },
      { player: 'Franco', team: 'Selección de Portugal', shield: 'Escudos/Portugal.png', pj: 3, pg: 1, pe: 0, pp: 2, gf: 2, gc: 6, dg: -4, pts: 3, pos: 3 },
      { player: 'Lucas B', displayName: 'Lucca', team: 'Selección de Francia', shield: 'Escudos/Francia.png', pj: 3, pg: 0, pe: 0, pp: 3, gf: 0, gc: 12, dg: -12, pts: 0, pos: 4 }
    ],
    D: [
      { player: 'Lucas A', displayName: 'Lucas', team: 'Selección de Alemania', shield: 'Escudos/alemania.png', pj: 3, pg: 2, pe: 0, pp: 1, gf: 9, gc: 3, dg: 6, pts: 6, pos: 1 },
      { player: 'Leo', team: 'Selección de Países Bajos', shield: 'Escudos/holanda.png', pj: 3, pg: 1, pe: 2, pp: 0, gf: 4, gc: 3, dg: 1, pts: 5, pos: 2 },
      { player: 'Lorenzo', team: 'Selección de España', shield: 'Escudos/españa.png', pj: 3, pg: 0, pe: 2, pp: 1, gf: 4, gc: 7, dg: -3, pts: 2, pos: 3 },
      { player: 'Hernan', team: 'Manchester City', shield: 'Escudos/Manchester City.png', pj: 3, pg: 0, pe: 2, pp: 1, gf: 5, gc: 9, dg: -4, pts: 2, pos: 4 }
    ]
  },

  // Partidos Fase de Grupos
  groupMatches: [
    // Grupo A
    { group: 'A', homePlayer: 'Facu', homeTeam: 'Liverpool', homeScore: 2, awayScore: 3, awayPlayer: 'Diego', awayTeam: 'Inter de Milán' },
    { group: 'A', homePlayer: 'Mati', homeTeam: 'Boca Juniors', homeScore: 1, awayScore: 3, awayPlayer: 'Hernesto', awayTeam: 'PSG' },
    { group: 'A', homePlayer: 'Facu', homeTeam: 'Liverpool', homeScore: 1, awayScore: 1, awayPlayer: 'Mati', awayTeam: 'Boca Juniors' },
    { group: 'A', homePlayer: 'Diego', homeTeam: 'Inter de Milán', homeScore: 1, awayScore: 1, awayPlayer: 'Hernesto', awayTeam: 'PSG' },
    { group: 'A', homePlayer: 'Diego', homeTeam: 'Inter de Milán', homeScore: 2, awayScore: 0, awayPlayer: 'Mati', awayTeam: 'Boca Juniors' },
    { group: 'A', homePlayer: 'Facu', homeTeam: 'Liverpool', homeScore: 1, awayScore: 2, awayPlayer: 'Hernesto', awayTeam: 'PSG' },

    // Grupo B
    { group: 'B', homePlayer: 'Santi', homeTeam: 'Tottenham', homeScore: 3, awayScore: 0, awayPlayer: 'Agus', awayTeam: 'Selección de Argentina' },
    { group: 'B', homePlayer: 'Chino', homeTeam: 'FC Barcelona', homeScore: 2, awayScore: 0, awayPlayer: 'Marcos', awayTeam: 'Selección de Inglaterra' },
    { group: 'B', homePlayer: 'Santi', homeTeam: 'Tottenham', homeScore: 0, awayScore: 4, awayPlayer: 'Chino', awayTeam: 'FC Barcelona' },
    { group: 'B', homePlayer: 'Agus', homeTeam: 'Selección de Argentina', homeScore: 0, awayScore: 2, awayPlayer: 'Marcos', awayTeam: 'Selección de Inglaterra' },
    { group: 'B', homePlayer: 'Agus', homeTeam: 'Selección de Argentina', homeScore: 1, awayScore: 13, awayPlayer: 'Chino', awayTeam: 'FC Barcelona' },
    { group: 'B', homePlayer: 'Santi', homeTeam: 'Tottenham', homeScore: 1, awayScore: 5, awayPlayer: 'Marcos', awayTeam: 'Selección de Inglaterra' },

    // Grupo C
    { group: 'C', homePlayer: 'Tomi', homeTeam: 'Juventus', homeScore: 7, awayScore: 0, awayPlayer: 'Lucas B', awayTeam: 'Selección de Francia' },
    { group: 'C', homePlayer: 'Franco', homeTeam: 'Selección de Portugal', homeScore: 0, awayScore: 4, awayPlayer: 'Tomi', awayTeam: 'Juventus' },
    { group: 'C', homePlayer: 'Pehuen', homeTeam: 'Bayern Múnich', homeScore: 2, awayScore: 0, awayPlayer: 'Franco', awayTeam: 'Selección de Portugal' },
    { group: 'C', homePlayer: 'Tomi', homeTeam: 'Juventus', homeScore: 0, awayScore: 2, awayPlayer: 'Pehuen', awayTeam: 'Bayern Múnich' },
    { group: 'C', homePlayer: 'Lucas B', homeTeam: 'Selección de Francia', homeScore: 0, awayScore: 2, awayPlayer: 'Franco', awayTeam: 'Selección de Portugal' },
    { group: 'C', homePlayer: 'Lucas B', homeTeam: 'Selección de Francia', homeScore: 0, awayScore: 3, awayPlayer: 'Pehuen', awayTeam: 'Bayern Múnich' },

    // Grupo D
    { group: 'D', homePlayer: 'Leo', homeTeam: 'Selección de Países Bajos', homeScore: 1, awayScore: 0, awayPlayer: 'Lucas A', awayTeam: 'Selección de Alemania' },
    { group: 'D', homePlayer: 'Lorenzo', homeTeam: 'Selección de España', homeScore: 2, awayScore: 2, awayPlayer: 'Hernan', awayTeam: 'Manchester City' },
    { group: 'D', homePlayer: 'Hernan', homeTeam: 'Manchester City', homeScore: 1, awayScore: 5, awayPlayer: 'Lucas A', awayTeam: 'Selección de Alemania' },
    { group: 'D', homePlayer: 'Leo', homeTeam: 'Selección de Países Bajos', homeScore: 2, awayScore: 2, awayPlayer: 'Hernan', awayTeam: 'Manchester City' },
    { group: 'D', homePlayer: 'Leo', homeTeam: 'Selección de Países Bajos', homeScore: 1, awayScore: 1, awayPlayer: 'Lorenzo', awayTeam: 'Selección de España' },
    { group: 'D', homePlayer: 'Lucas A', homeTeam: 'Selección de Alemania', homeScore: 4, awayScore: 1, awayPlayer: 'Lorenzo', awayTeam: 'Selección de España' }
  ],

  // Fase Final (Playoffs) con Escudos
  playoffs: {
    quarters: [
      { id: 'q1', label: 'Cuartos 1', homePlayer: 'Diego', homeTeam: 'Inter de Milán', homeShield: 'Escudos/Inter d Milan.png', homeScore: 1, awayScore: 2, awayPlayer: 'Marcos', awayTeam: 'Selección de Inglaterra', awayShield: 'Escudos/Inglaterra.png', winner: 'Marcos' },
      { id: 'q2', label: 'Cuartos 2', homePlayer: 'Tomi', homeTeam: 'Juventus', homeShield: 'Escudos/juventus.png', homeScore: 2, awayScore: 1, awayPlayer: 'Lucas A', awayTeam: 'Selección de Alemania', awayShield: 'Escudos/alemania.png', winner: 'Tomi' },
      { id: 'q3', label: 'Cuartos 3', homePlayer: 'Pehuen', homeTeam: 'Bayern Múnich', homeShield: 'Escudos/Bayern Munich.png', homeScore: 3, awayScore: 1, awayPlayer: 'Leo', awayTeam: 'Selección de Países Bajos', awayShield: 'Escudos/holanda.png', winner: 'Pehuen' },
      { id: 'q4', label: 'Cuartos 4', homePlayer: 'Hernesto', homeTeam: 'PSG', homeShield: 'Escudos/PSG.png', homeScore: 1, awayScore: 4, awayPlayer: 'Chino', awayTeam: 'FC Barcelona', awayShield: 'Escudos/Barcelona.png', winner: 'Chino' }
    ],
    semifinals: [
      { id: 's1', label: 'Semifinal 1', homePlayer: 'Marcos', homeTeam: 'Selección de Inglaterra', homeShield: 'Escudos/Inglaterra.png', homeScore: 1, awayScore: 2, awayPlayer: 'Tomi', awayTeam: 'Juventus', awayShield: 'Escudos/juventus.png', winner: 'Tomi' },
      { id: 's2', label: 'Semifinal 2', homePlayer: 'Pehuen', homeTeam: 'Bayern Múnich', homeShield: 'Escudos/Bayern Munich.png', homeScore: 0, awayScore: 6, awayPlayer: 'Chino', awayTeam: 'FC Barcelona', awayShield: 'Escudos/Barcelona.png', winner: 'Chino' }
    ],
    thirdPlace: {
      id: 'tp',
      label: 'Tercer Puesto 🥉',
      homePlayer: 'Marcos',
      homeTeam: 'Selección de Inglaterra',
      homeShield: 'Escudos/Inglaterra.png',
      homeScore: 3,
      awayScore: 0,
      awayPlayer: 'Pehuen',
      awayTeam: 'Bayern Múnich',
      awayShield: 'Escudos/Bayern Munich.png',
      winner: 'Marcos'
    },
    final: {
      id: 'f',
      label: 'Gran Final 🏆',
      homePlayer: 'Tomi',
      homeTeam: 'Juventus',
      homeShield: 'Escudos/juventus.png',
      homeScore: 0,
      awayScore: 2,
      awayPlayer: 'Chino',
      awayTeam: 'FC Barcelona',
      awayShield: 'Escudos/Barcelona.png',
      winner: 'Chino'
    }
  },

  // Podio y Cuadro de Honor
  podium: {
    champion: { player: 'Chino', team: 'FC Barcelona', shield: 'Escudos/Barcelona.png', title: 'Campeón 🏆' },
    runnerUp: { player: 'Tomi', team: 'Juventus', shield: 'Escudos/juventus.png', title: 'Subcampeón 🥈' },
    thirdPlace: { player: 'Marcos', team: 'Selección de Inglaterra', shield: 'Escudos/Inglaterra.png', title: '3° Puesto 🥉' },
    fourthPlace: { player: 'Pehuen', team: 'Bayern Múnich', shield: 'Escudos/Bayern Munich.png', title: '4° Puesto 🏅' }
  }
};
