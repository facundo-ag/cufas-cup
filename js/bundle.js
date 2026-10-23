/**
 * CUFA'S CUP - OFFICIAL BUNDLE
 * Multi-edition Portal: Cufa's Cup I (2025), Cufa's Cup II (2026), Ranking FIFA Histórico
 * Standalone bundle with zero-CORS issues for both file:// and http/https environments.
 */
(function () {
  'use strict';

  // ===================================================
  // MODULE: js/ui/renderUtils.js
  // ===================================================

/**
 * Shared UI Render Utilities
 */
function renderShield(shieldPath, altName = '') {
  if (!shieldPath) return `<span style="font-size: 1.2rem;">⚽</span>`;
  if (shieldPath.includes('/') || shieldPath.includes('.')) {
    // Cache buster to ensure browser immediately loads newly replaced image files
    const separator = shieldPath.includes('?') ? '&' : '?';
    const cacheBuster = 'v=3stars_1';
    return `<img src="${encodeURI(shieldPath)}${separator}${cacheBuster}" alt="${escapeHtml(altName)}" class="shield-img" onerror="this.outerHTML='⚽'" />`;
  }
  return `<span style="font-size: 1.2rem;">${shieldPath}</span>`;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[m]));
}

function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
    <span>${escapeHtml(message)}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}


  // ===================================================
  // MODULE: js/data2025.js
  // ===================================================

/**
 * CUFA'S CUP I - EDICIÓN 2025
 * Datos Oficiales con Escudos extraídos de resultados_del_torneo.md
 */

function getTeamShield2025(teamOrPlayer) {
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

const EDITION_2025_DATA = {
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


  // ===================================================
  // MODULE: js/mockData.js
  // ===================================================

/**
 * Official Teams and 4-Matchday Schedule for Cufa's Cup II (20 Teams)
 */
const OFFICIAL_TEAMS = [
  { id: 't_real_madrid', name: 'Real Madrid', player: 'Lucas A', type: 'Club', shield: 'Escudos/Real Madrid.png' },
  { id: 't_barcelona', name: 'Barcelona', player: 'Diego', type: 'Club', shield: 'Escudos/Barcelona.png' },
  { id: 't_atletico', name: 'Atletico de Madrid', player: 'Franco', type: 'Club', shield: 'Escudos/Atletico Madrid.png' },
  { id: 't_mancity', name: 'Manchester City', player: 'Tomi P', type: 'Club', shield: 'Escudos/Manchester City.png' },
  { id: 't_manunited', name: 'Manchester United', player: 'Marcos', type: 'Club', shield: 'Escudos/Manchester united.png' },
  { id: 't_liverpool', name: 'Liverpool', player: 'Gero', type: 'Club', shield: 'Escudos/Liverpool.png' },
  { id: 't_arsenal', name: 'Arsenal', player: 'Hernesto', type: 'Club', shield: 'Escudos/Arsenal.png' },
  { id: 't_chelsea', name: 'Chelsea', player: 'Hernan', type: 'Club', shield: 'Escudos/chelsea.png' },
  { id: 't_astonvilla', name: 'Aston Villa', player: 'Santi', type: 'Club', shield: 'Escudos/Aston villa.png' },
  { id: 't_bayern', name: 'Bayern Munich', player: 'Chino', type: 'Club', shield: 'Escudos/Bayern Munich.png' },
  { id: 't_leverkusen', name: 'Bayer Leverkusen', player: 'Leo', type: 'Club', shield: 'Escudos/bayer_leverkusen.png' },
  { id: 't_psg', name: 'PSG', player: 'Agus', type: 'Club', shield: 'Escudos/PSG.png' },
  { id: 't_inter', name: 'Inter de Milan', player: 'Mati A', type: 'Club', shield: 'Escudos/Inter d Milan.png' },
  { id: 't_milan', name: 'Milan', player: 'Tomi A', type: 'Club', shield: 'Escudos/Milan.png' },
  { id: 't_inglaterra', name: 'Inglaterra', player: 'Pehuen', type: 'Selección', shield: 'Escudos/Inglaterra.png' },
  { id: 't_espana', name: 'España', player: 'Facu', type: 'Selección', shield: 'Escudos/españa.png' },
  { id: 't_francia', name: 'Francia', player: 'Tomi T', type: 'Selección', shield: 'Escudos/Francia.png' },
  { id: 't_argentina', name: 'Argentina', player: 'Maty V', type: 'Selección', shield: 'Escudos/Argentina.png' },
  { id: 't_portugal', name: 'Portugal', player: 'Lucas B', type: 'Selección', shield: 'Escudos/Portugal.png' },
  { id: 't_alemania', name: 'Alemania', player: 'Joaco S', type: 'Selección', shield: 'Escudos/alemania.png' }
];

/**
 * Exact 4 Fechas from official Fixture with Consola 1 and Consola 2 assignments
 */
const OFFICIAL_MATCHES = [
  // ================= FECHA 1 =================
  // Consola 1
  { id: 'f1_c1_m1', matchday: 1, console: 'Consola 1', turn: 'T1 (Inaugural)', homeTeamId: 't_espana', awayTeamId: 't_argentina', homeScore: 3, awayScore: 2, status: 'finished' },
  { id: 'f1_c1_m2', matchday: 1, console: 'Consola 1', turn: 'T2', homeTeamId: 't_inglaterra', awayTeamId: 't_chelsea', homeScore: 1, awayScore: 1, status: 'finished' },
  { id: 'f1_c1_m3', matchday: 1, console: 'Consola 1', turn: 'T3', homeTeamId: 't_psg', awayTeamId: 't_portugal', homeScore: 2, awayScore: 0, status: 'finished' },
  { id: 'f1_c1_m4', matchday: 1, console: 'Consola 1', turn: 'T4', homeTeamId: 't_milan', awayTeamId: 't_francia', homeScore: 4, awayScore: 1, status: 'finished' },
  { id: 'f1_c1_m5', matchday: 1, console: 'Consola 1', turn: 'T5', homeTeamId: 't_arsenal', awayTeamId: 't_inter', homeScore: 0, awayScore: 2, status: 'finished' },
  // Consola 2
  { id: 'f1_c2_m1', matchday: 1, console: 'Consola 2', turn: 'T2', homeTeamId: 't_manunited', awayTeamId: 't_alemania', homeScore: 2, awayScore: 1, status: 'finished' },
  { id: 'f1_c2_m2', matchday: 1, console: 'Consola 2', turn: 'T3', homeTeamId: 't_mancity', awayTeamId: 't_barcelona', homeScore: 3, awayScore: 3, status: 'finished' },
  { id: 'f1_c2_m3', matchday: 1, console: 'Consola 2', turn: 'T4', homeTeamId: 't_leverkusen', awayTeamId: 't_bayern', homeScore: 1, awayScore: 2, status: 'finished' },
  { id: 'f1_c2_m4', matchday: 1, console: 'Consola 2', turn: 'T5', homeTeamId: 't_atletico', awayTeamId: 't_astonvilla', homeScore: 2, awayScore: 0, status: 'finished' },
  { id: 'f1_c2_m5', matchday: 1, console: 'Consola 2', turn: 'T6', homeTeamId: 't_real_madrid', awayTeamId: 't_liverpool', homeScore: 3, awayScore: 1, status: 'finished' },

  // ================= FECHA 2 =================
  // Consola 1
  { id: 'f2_c1_m1', matchday: 2, console: 'Consola 1', turn: 'T1', homeTeamId: 't_barcelona', awayTeamId: 't_inglaterra', homeScore: null, awayScore: null, status: 'upcoming' },
  { id: 'f2_c1_m2', matchday: 2, console: 'Consola 1', turn: 'T2', homeTeamId: 't_inter', awayTeamId: 't_bayern', homeScore: null, awayScore: null, status: 'upcoming' },
  { id: 'f2_c1_m3', matchday: 2, console: 'Consola 1', turn: 'T3', homeTeamId: 't_espana', awayTeamId: 't_francia', homeScore: null, awayScore: null, status: 'upcoming' },
  { id: 'f2_c1_m4', matchday: 2, console: 'Consola 1', turn: 'T4', homeTeamId: 't_psg', awayTeamId: 't_atletico', homeScore: null, awayScore: null, status: 'upcoming' },
  { id: 'f2_c1_m5', matchday: 2, console: 'Consola 1', turn: 'T5', homeTeamId: 't_leverkusen', awayTeamId: 't_milan', homeScore: null, awayScore: null, status: 'upcoming' },
  // Consola 2
  { id: 'f2_c2_m1', matchday: 2, console: 'Consola 2', turn: 'T1', homeTeamId: 't_portugal', awayTeamId: 't_manunited', homeScore: null, awayScore: null, status: 'upcoming' },
  { id: 'f2_c2_m2', matchday: 2, console: 'Consola 2', turn: 'T2', homeTeamId: 't_chelsea', awayTeamId: 't_real_madrid', homeScore: null, awayScore: null, status: 'upcoming' },
  { id: 'f2_c2_m3', matchday: 2, console: 'Consola 2', turn: 'T3', homeTeamId: 't_arsenal', awayTeamId: 't_alemania', homeScore: null, awayScore: null, status: 'upcoming' },
  { id: 'f2_c2_m4', matchday: 2, console: 'Consola 2', turn: 'T4', homeTeamId: 't_astonvilla', awayTeamId: 't_argentina', homeScore: null, awayScore: null, status: 'upcoming' },
  { id: 'f2_c2_m5', matchday: 2, console: 'Consola 2', turn: 'T5', homeTeamId: 't_mancity', awayTeamId: 't_liverpool', homeScore: null, awayScore: null, status: 'upcoming' },

  // ================= FECHA 3 =================
  // Consola 1
  { id: 'f3_c1_m1', matchday: 3, console: 'Consola 1', turn: 'T1', homeTeamId: 't_inter', awayTeamId: 't_alemania', homeScore: null, awayScore: null, status: 'upcoming' },
  { id: 'f3_c1_m2', matchday: 3, console: 'Consola 1', turn: 'T2', homeTeamId: 't_francia', awayTeamId: 't_portugal', homeScore: null, awayScore: null, status: 'upcoming' },
  { id: 'f3_c1_m3', matchday: 3, console: 'Consola 1', turn: 'T3', homeTeamId: 't_mancity', awayTeamId: 't_argentina', homeScore: null, awayScore: null, status: 'upcoming' },
  { id: 'f3_c1_m4', matchday: 3, console: 'Consola 1', turn: 'T4', homeTeamId: 't_atletico', awayTeamId: 't_leverkusen', homeScore: null, awayScore: null, status: 'upcoming' },
  { id: 'f3_c1_m5', matchday: 3, console: 'Consola 1', turn: 'T5', homeTeamId: 't_chelsea', awayTeamId: 't_manunited', homeScore: null, awayScore: null, status: 'upcoming' },
  // Consola 2
  { id: 'f3_c2_m1', matchday: 3, console: 'Consola 2', turn: 'T1', homeTeamId: 't_bayern', awayTeamId: 't_inglaterra', homeScore: null, awayScore: null, status: 'upcoming' },
  { id: 'f3_c2_m2', matchday: 3, console: 'Consola 2', turn: 'T2', homeTeamId: 't_barcelona', awayTeamId: 't_liverpool', homeScore: null, awayScore: null, status: 'upcoming' },
  { id: 'f3_c2_m3', matchday: 3, console: 'Consola 2', turn: 'T3', homeTeamId: 't_astonvilla', awayTeamId: 't_real_madrid', homeScore: null, awayScore: null, status: 'upcoming' },
  { id: 'f3_c2_m4', matchday: 3, console: 'Consola 2', turn: 'T4', homeTeamId: 't_arsenal', awayTeamId: 't_milan', homeScore: null, awayScore: null, status: 'upcoming' },
  { id: 'f3_c2_m5', matchday: 3, console: 'Consola 2', turn: 'T5', homeTeamId: 't_psg', awayTeamId: 't_espana', homeScore: null, awayScore: null, status: 'upcoming' },

  // ================= FECHA 4 =================
  // Consola 1
  { id: 'f4_c1_m1', matchday: 4, console: 'Consola 1', turn: 'T1', homeTeamId: 't_manunited', awayTeamId: 't_liverpool', homeScore: null, awayScore: null, status: 'upcoming' },
  { id: 'f4_c1_m2', matchday: 4, console: 'Consola 1', turn: 'T2', homeTeamId: 't_alemania', awayTeamId: 't_psg', homeScore: null, awayScore: null, status: 'upcoming' },
  { id: 'f4_c1_m3', matchday: 4, console: 'Consola 1', turn: 'T3', homeTeamId: 't_francia', awayTeamId: 't_astonvilla', homeScore: null, awayScore: null, status: 'upcoming' },
  { id: 'f4_c1_m4', matchday: 4, console: 'Consola 1', turn: 'T4', homeTeamId: 't_atletico', awayTeamId: 't_real_madrid', homeScore: null, awayScore: null, status: 'upcoming' },
  { id: 'f4_c1_m5', matchday: 4, console: 'Consola 1', turn: 'T5', homeTeamId: 't_mancity', awayTeamId: 't_chelsea', homeScore: null, awayScore: null, status: 'upcoming' },
  // Consola 2
  { id: 'f4_c2_m1', matchday: 4, console: 'Consola 2', turn: 'T1', homeTeamId: 't_inglaterra', awayTeamId: 't_milan', homeScore: null, awayScore: null, status: 'upcoming' },
  { id: 'f4_c2_m2', matchday: 4, console: 'Consola 2', turn: 'T2', homeTeamId: 't_argentina', awayTeamId: 't_arsenal', homeScore: null, awayScore: null, status: 'upcoming' },
  { id: 'f4_c2_m3', matchday: 4, console: 'Consola 2', turn: 'T3', homeTeamId: 't_leverkusen', awayTeamId: 't_espana', homeScore: null, awayScore: null, status: 'upcoming' },
  { id: 'f4_c2_m4', matchday: 4, console: 'Consola 2', turn: 'T4', homeTeamId: 't_bayern', awayTeamId: 't_barcelona', homeScore: null, awayScore: null, status: 'upcoming' },
  { id: 'f4_c2_m5', matchday: 4, console: 'Consola 2', turn: 'T5', homeTeamId: 't_inter', awayTeamId: 't_portugal', homeScore: null, awayScore: null, status: 'upcoming' }
];

const INITIAL_BRACKET = {
  playoffs: [
    { id: 'po_1', label: 'Playoff 1 (5° vs 12°)', team1: null, team2: null, score1: null, score2: null, winner: null, status: 'upcoming' },
    { id: 'po_2', label: 'Playoff 2 (6° vs 11°)', team1: null, team2: null, score1: null, score2: null, winner: null, status: 'upcoming' },
    { id: 'po_3', label: 'Playoff 3 (7° vs 10°)', team1: null, team2: null, score1: null, score2: null, winner: null, status: 'upcoming' },
    { id: 'po_4', label: 'Playoff 4 (8° vs 9°)', team1: null, team2: null, score1: null, score2: null, winner: null, status: 'upcoming' }
  ],
  quarterfinals: [
    { id: 'qf_1', label: 'Cuartos 1 (1° vs Ganador PO 4)', team1: null, team2: null, score1: null, score2: null, winner: null, status: 'upcoming' },
    { id: 'qf_2', label: 'Cuartos 2 (2° vs Ganador PO 3)', team1: null, team2: null, score1: null, score2: null, winner: null, status: 'upcoming' },
    { id: 'qf_3', label: 'Cuartos 3 (3° vs Ganador PO 2)', team1: null, team2: null, score1: null, score2: null, winner: null, status: 'upcoming' },
    { id: 'qf_4', label: 'Cuartos 4 (4° vs Ganador PO 1)', team1: null, team2: null, score1: null, score2: null, winner: null, status: 'upcoming' }
  ],
  semifinals: [
    { id: 'sf_1', label: 'Semifinal 1', team1: null, team2: null, score1: null, score2: null, winner: null, status: 'upcoming' },
    { id: 'sf_2', label: 'Semifinal 2', team1: null, team2: null, score1: null, score2: null, winner: null, status: 'upcoming' }
  ],
  thirdPlace: {
    id: 'tp_1',
    label: 'Tercer Puesto 🥉',
    team1: null,
    team2: null,
    score1: null,
    score2: null,
    winner: null,
    status: 'upcoming'
  },
  final: {
    id: 'f_1',
    label: 'Gran Final Cufa\'s Cup II 🏆',
    team1: null,
    team2: null,
    score1: null,
    score2: null,
    winner: null,
    status: 'upcoming'
  },
  champion: null,
  runnerUp: null,
  thirdPlaceWinner: null
};


  // ===================================================
  // MODULE: js/rankingService.js
  // ===================================================

/**
 * RANKING FIFA / HISTÓRICO SERVICE
 * Agrega y consolida todas las estadísticas de los jugadores a través de las distintas ediciones.
 */

function normalizePlayerName(name) {
  if (!name) return '';
  const trimmed = name.trim();
  if (trimmed === 'Lucas (Lucas A)' || trimmed === 'Lucas') return 'Lucas A';
  if (trimmed === 'Lucca (Lucas B)' || trimmed === 'Lucca') return 'Lucas B';
  return trimmed;
}

function computeHistoricalRanking(edition2State) {
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


  // ===================================================
  // MODULE: js/db.js
  // ===================================================

/**
 * Persistence layer: Supports Firebase Firestore + LocalStorage fallback
 */

const STORAGE_KEY = 'cufas_cup_v2_official_data';
const FIREBASE_CONFIG_KEY = 'cufas_cup_firebase_config';

const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyD0loQKxKXd9bs7XMUtMQAccyLriI16K0g",
  authDomain: "cufa-s-cup.firebaseapp.com",
  databaseURL: "https://cufa-s-cup-default-rtdb.firebaseio.com",
  projectId: "cufa-s-cup",
  storageBucket: "cufa-s-cup.firebasestorage.app",
  messagingSenderId: "156974604636",
  appId: "1:156974604636:web:ce37ee3f61ab34ca6ea199",
  measurementId: "G-B5564NLTEG"
};

class DatabaseService {
  constructor() {
    this.firebaseApp = null;
    this.firestore = null;
    this.firestoreDoc = null;
    this.isFirebaseActive = false;
    this.listeners = [];
  }

  /**
   * Initialize and load data from Firebase or LocalStorage
   */
  async loadData() {
    // 1. Si Firebase está activo, intentar leer datos remotos
    if (this.isFirebaseActive && this.rtdbRef) {
      try {
        const snapshot = await this.rtdbRef.once('value');
        const remote = snapshot.val();
        if (remote && remote.teams && remote.matches && remote.teams.length === 20) {
          remote.teams = remote.teams.map(t => {
            const official = OFFICIAL_TEAMS.find(ot => ot.id === t.id);
            return official ? { ...t, shield: official.shield } : t;
          });
          if (remote.bracket) {
            if (!remote.bracket.thirdPlace) remote.bracket.thirdPlace = { ...INITIAL_BRACKET.thirdPlace };
            if (remote.bracket.runnerUp === undefined) remote.bracket.runnerUp = null;
            if (remote.bracket.thirdPlaceWinner === undefined) remote.bracket.thirdPlaceWinner = null;
          }
          localStorage.setItem(STORAGE_KEY, JSON.stringify(remote));
          this.notifyStatus('synced');
          return remote;
        }
      } catch (e) {
        console.warn('Could not fetch from RTDB on loadData, falling back to local:', e);
      }
    }

    // 2. Si no, leer de localStorage
    const local = localStorage.getItem(STORAGE_KEY);
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (parsed.teams && parsed.matches && parsed.teams.length === 20) {
          parsed.teams = parsed.teams.map(t => {
            const official = OFFICIAL_TEAMS.find(ot => ot.id === t.id);
            return official ? { ...t, shield: official.shield } : t;
          });
          if (parsed.bracket) {
            if (!parsed.bracket.thirdPlace) {
              parsed.bracket.thirdPlace = { ...INITIAL_BRACKET.thirdPlace };
            }
            if (parsed.bracket.runnerUp === undefined) parsed.bracket.runnerUp = null;
            if (parsed.bracket.thirdPlaceWinner === undefined) parsed.bracket.thirdPlaceWinner = null;
          }
          if (parsed.adminPin === "1234" || !parsed.adminPin) {
            parsed.adminPin = "chadnaldo123";
            localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
          }
          // Sembrar en Firebase si estaba vacío
          if (this.isFirebaseActive && this.rtdbRef) {
            this.rtdbRef.set(parsed).then(() => {
              this.notifyStatus('synced');
            }).catch(err => console.warn('Seed sync error:', err));
          }
          return parsed;
        }
      } catch (e) {
        console.error('Error parsing local storage:', e);
      }
    }

    // Default Seed Data from Official Presentation & Fixture
    const initialData = {
      tournamentName: "Cufa's Cup II",
      season: "2025/2026",
      format: "Champions League (20 Equipos - 4 Fechas)",
      adminPin: "chadnaldo123",
      teams: OFFICIAL_TEAMS,
      matches: OFFICIAL_MATCHES,
      bracket: INITIAL_BRACKET,
      lastUpdated: new Date().toISOString()
    };

    await this.saveData(initialData);
    return initialData;
  }

  /**
   * Save data to LocalStorage and optionally Firebase
   */
  async saveData(data) {
    data.lastUpdated = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

    // Try sync with Firebase if configured
    if (this.isFirebaseActive && window.firebase) {
      if (this.rtdbRef) {
        try {
          await this.rtdbRef.set(data);
          this.notifyStatus('synced');
        } catch (err) {
          console.warn('Realtime Database sync failed, saved locally:', err);
          this.notifyStatus('local');
        }
      } else if (this.firestoreDoc) {
        try {
          await this.firestoreDoc.set(data);
          this.notifyStatus('synced');
        } catch (err) {
          console.warn('Firestore sync failed, saved locally:', err);
          this.notifyStatus('local');
        }
      }
    } else {
      this.notifyStatus('local');
    }

    return data;
  }

  /**
   * Connect to Firebase (Firestore or Realtime Database) via custom user config
   */
  async initFirebase(config) {
    if (!config || (!config.apiKey && !config.databaseURL) || (!config.projectId && !config.databaseURL)) {
      this.isFirebaseActive = false;
      this.notifyStatus('local');
      return false;
    }

    try {
      if (window.firebase && window.firebase.apps) {
        if (!window.firebase.apps.length) {
          this.firebaseApp = window.firebase.initializeApp(config);
        } else {
          this.firebaseApp = window.firebase.app();
        }

        // 1. Realtime Database setup if available
        if (window.firebase.database) {
          try {
            this.rtdb = window.firebase.database();
            this.rtdbRef = this.rtdb.ref('tournament_active');

            // Escuchar estado de conexión
            this.rtdb.ref('.info/connected').on('value', (snap) => {
              if (snap.val() === true) {
                this.isFirebaseActive = true;
                this.notifyStatus('synced');
              } else {
                if (!this.isFirebaseActive) {
                  this.notifyStatus('local');
                }
              }
            });
          } catch (e) {
            console.warn('RTDB init warning:', e);
          }
        }

        // 2. Firestore setup if available
        if (window.firebase.firestore && config.projectId) {
          try {
            this.firestore = window.firebase.firestore();
            this.firestoreDoc = this.firestore.collection('tournaments').doc('cufas_cup_active');
          } catch (e) {
            console.warn('Firestore init warning:', e);
          }
        }

        this.isFirebaseActive = true;
        localStorage.setItem(FIREBASE_CONFIG_KEY, JSON.stringify(config));
        this.notifyStatus('synced');
        return true;
      }
    } catch (e) {
      console.error('Firebase init error:', e);
      this.isFirebaseActive = false;
      this.notifyStatus('local');
      return false;
    }
  }

  getSavedFirebaseConfig() {
    try {
      const cfg = localStorage.getItem(FIREBASE_CONFIG_KEY);
      return cfg ? JSON.parse(cfg) : null;
    } catch (e) {
      return null;
    }
  }

  /**
   * Listen for remote updates via Realtime Database or Firestore
   */
  listenForRemoteUpdates(onUpdateCallback) {
    // Realtime Database listener
    if (this.isFirebaseActive && this.rtdbRef) {
      this.rtdbRef.on('value', (snapshot) => {
        const remoteData = snapshot.val();
        if (remoteData) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(remoteData));
          onUpdateCallback(remoteData);
          this.notifyStatus('synced');
        }
      }, (err) => {
        console.warn('RTDB listener error:', err);
        this.notifyStatus('local');
      });
    }

    // Firestore listener
    if (this.isFirebaseActive && this.firestoreDoc) {
      this.firestoreDoc.onSnapshot((doc) => {
        if (doc.exists) {
          const remoteData = doc.data();
          localStorage.setItem(STORAGE_KEY, JSON.stringify(remoteData));
          onUpdateCallback(remoteData);
          this.notifyStatus('synced');
        }
      }, (err) => {
        console.warn('Firestore snapshot error:', err);
      });
    }

    // Also support multi-tab synchronization via storage event
    window.addEventListener('storage', (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const updated = JSON.parse(e.newValue);
          onUpdateCallback(updated);
        } catch (err) {}
      }
    });
  }

  onStatusChange(cb) {
    this.listeners.push(cb);
    cb(this.isFirebaseActive ? 'synced' : 'local');
  }

  notifyStatus(status) {
    this.listeners.forEach(cb => cb(status));
  }

  /**
   * Export all tournament data as downloadable JSON
   */
  exportJSON(data) {
    const str = JSON.stringify(data, null, 2);
    const blob = new Blob([str], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cufas_cup_2_data_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  /**
   * Import tournament data from JSON file
   */
  async importJSON(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const json = JSON.parse(e.target.result);
          if (json.teams && json.matches) {
            await this.saveData(json);
            resolve(json);
          } else {
            reject(new Error('Formato de JSON inválido: faltan campos teams o matches.'));
          }
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = () => reject(new Error('Error al leer el archivo.'));
      reader.readAsText(file);
    });
  }
}

const dbService = new DatabaseService();


  // ===================================================
  // MODULE: js/store.js
  // ===================================================

/**
 * Central State Store & FIFA/Champions League Rules Engine
 */

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

const store = new TournamentStore();


  // ===================================================
  // MODULE: js/ui/hub.js
  // ===================================================

/**
 * UI: HUB PRINCIPAL / PORTAL DE BIENVENIDA
 * Menú central cinematográfico con 4 accesos: Edición 1, Edición 2, Edición 3 (Suspenso) y Ranking FIFA
 */

function renderHub(container, onNavigate) {
  if (!container) return;

  container.innerHTML = `
    <div class="hub-hero">
      <div class="hub-banner-box">
        <img src="fotos/bannertorneo.png.png" alt="CUFA'S CUP" class="hub-main-banner" />
      </div>
      <div class="hub-hero-badge">
        <span>🏆 PLATAFORMA OFICIAL • FIFA TOURNAMENT</span>
      </div>
      <h1 class="hub-hero-title">CUFA'S CUP</h1>
      <p class="hub-hero-subtitle">
        El portal definitivo para el seguimiento en vivo, archivos históricos y ranking de todos los tiempos.
      </p>
    </div>

    <div class="hub-grid">
      
      <!-- CARD 1: EDICIÓN ANTERIOR 2025 -->
      <div class="hub-card hub-card-past" id="hub-goto-2025">
        <div class="hub-card-glow"></div>
        <div class="hub-card-header">
          <span class="hub-badge hub-badge-silver">📜 ARCHIVO HISTÓRICO</span>
          <span class="hub-year">EDICIÓN 2025</span>
        </div>
        <div class="hub-card-body">
          <div class="hub-card-poster">
            <img src="fotos/Cufas cup 1.jpg" alt="Cufa's Cup 1 Oficial" class="hub-poster-img" />
          </div>
          <h2 class="hub-edition-name">CUFA'S CUP I</h2>
          <p class="hub-edition-desc">
            El torneo inaugural. 16 jugadores en 4 grupos, cuartos de final, semifinales y la histórica consagración.
          </p>
          <div class="hub-stats-row">
            <div class="hub-stat-item">
              <span class="hub-stat-val">16</span>
              <span class="hub-stat-label">Equipos</span>
            </div>
            <div class="hub-stat-item">
              <span class="hub-stat-val">32</span>
              <span class="hub-stat-label">Partidos</span>
            </div>
            <div class="hub-stat-item">
              <span class="hub-stat-val gold-text">Chino 🏆</span>
              <span class="hub-stat-label">Campeón</span>
            </div>
          </div>
        </div>
        <div class="hub-card-footer">
          <button class="btn-tv btn-tv-secondary hub-btn">
            EXPLORAR EDICIÓN 2025 ➔
          </button>
        </div>
      </div>

      <!-- CARD 2: EDICIÓN ACTUAL 2026 (DESTACADA) -->
      <div class="hub-card hub-card-active" id="hub-goto-2026">
        <div class="hub-card-glow-active"></div>
        <div class="hub-card-header">
          <span class="hub-badge hub-badge-live">
            <span class="live-dot-pulse"></span> EN VIVO • CLOUD RTDB
          </span>
          <span class="hub-year highlight">TEMPORADA 2025/2026</span>
        </div>
        <div class="hub-card-body">
          <div class="hub-card-poster">
            <img src="fotos/Cufas cup 2.jpg" alt="Cufa's Cup 2 Oficial" class="hub-poster-img" />
          </div>
          <h2 class="hub-edition-name live-title">CUFA'S CUP II</h2>
          <p class="hub-edition-desc">
            La edición actual. 20 equipos en Fase de Liga con clasificación directa a Cuartos y llaves de Playoffs eliminatorios.
          </p>
          <div class="hub-stats-row">
            <div class="hub-stat-item">
              <span class="hub-stat-val">20</span>
              <span class="hub-stat-label">Equipos</span>
            </div>
            <div class="hub-stat-item">
              <span class="hub-stat-val">40</span>
              <span class="hub-stat-label">Liga</span>
            </div>
            <div class="hub-stat-item">
              <span class="hub-stat-val cyan-text">Playoffs</span>
              <span class="hub-stat-label">Cruces</span>
            </div>
          </div>
        </div>
        <div class="hub-card-footer">
          <button class="btn-tv btn-tv-primary hub-btn hub-btn-pulse">
            INGRESAR A LA EDICIÓN ACTUAL ➔
          </button>
        </div>
      </div>

      <!-- CARD 3: RANKING FIFA HISTÓRICO -->
      <div class="hub-card hub-card-ranking" id="hub-goto-ranking">
        <div class="hub-card-glow-gold"></div>
        <div class="hub-card-header">
          <span class="hub-badge hub-badge-gold">🌟 SALÓN DE LA FAMA</span>
          <span class="hub-year gold-text">ALL-TIME</span>
        </div>
        <div class="hub-card-body">
          <div class="hub-card-poster">
            <div class="hub-poster-ranking-emblem">
              <img src="fotos/bannertorneo.png.png" alt="Ranking FIFA" class="hub-poster-ranking-img" />
            </div>
          </div>
          <h2 class="hub-edition-name gold-title">RANKING FIFA</h2>
          <p class="hub-edition-desc">
            Tabla histórica acumulada de todos los tiempos. Puntos, victorias, efectividad, goles y títulos de cada jugador.
          </p>
          <div class="hub-stats-row">
            <div class="hub-stat-item">
              <span class="hub-stat-val">22+</span>
              <span class="hub-stat-label">Jugadores</span>
            </div>
            <div class="hub-stat-item">
              <span class="hub-stat-val">2</span>
              <span class="hub-stat-label">Ediciones</span>
            </div>
            <div class="hub-stat-item">
              <span class="hub-stat-val gold-text">Histórico</span>
              <span class="hub-stat-label">Medallero</span>
            </div>
          </div>
        </div>
        <div class="hub-card-footer">
          <button class="btn-tv btn-tv-gold hub-btn">
            VER TABLA HISTÓRICA ➔
          </button>
        </div>
      </div>

      <!-- CARD 4: CUADRO DE SUSPENSO (AL FINAL DE TODO) -->
      <div class="hub-card hub-card-suspense" id="hub-goto-2027">
        <div class="hub-card-glow-suspense"></div>
        <div class="hub-card-header">
          <span class="hub-badge hub-badge-suspense">⏳ PRÓXIMAMENTE</span>
          <span class="hub-year highlight-gold" style="color: #f5c518;">???</span>
        </div>
        <div class="hub-card-body">
          <div class="hub-card-poster poster-suspense">
            <img src="fotos/Cufas cup 3.jpg" alt="???" class="hub-poster-img img-blurred" />
            <div class="suspense-overlay">
              <div class="suspense-spinner"></div>
              <span class="suspense-loading-text">CARGANDO...</span>
            </div>
          </div>
          <h2 class="hub-edition-name suspense-title">???</h2>
          <p class="hub-edition-desc suspense-question-desc">
            ??? ???????? ?????? ?????????? ????????? ?? ???????? ??? ???? ??????? ?
          </p>
          <div class="hub-stats-row">
            <div class="hub-stat-item">
              <span class="hub-stat-val">???</span>
              <span class="hub-stat-label">Equipos</span>
            </div>
            <div class="hub-stat-item">
              <span class="hub-stat-val">???</span>
              <span class="hub-stat-label">Formato</span>
            </div>
            <div class="hub-stat-item">
              <span class="hub-stat-val gold-text">???</span>
              <span class="hub-stat-label">Fecha</span>
            </div>
          </div>
        </div>
        <div class="hub-card-footer">
          <button class="btn-tv btn-tv-secondary hub-btn-suspense" id="btn-suspense-action">
            🔒 PRÓXIMAMENTE...
          </button>
        </div>
      </div>

    </div>
  `;

  // Listeners para las tarjetas
  container.querySelector('#hub-goto-2025')?.addEventListener('click', () => onNavigate('edition-2025'));
  container.querySelector('#hub-goto-2026')?.addEventListener('click', () => onNavigate('edition-2026'));
  container.querySelector('#hub-goto-ranking')?.addEventListener('click', () => onNavigate('ranking'));

  // Suspenso Próxima Edición
  const suspenseTrigger = () => {
    showToast("⏳ ¡Próxima edición en preparación! Próximamente se revelará el formato y los clasificados.", "info");
  };
  container.querySelector('#hub-goto-2027')?.addEventListener('click', suspenseTrigger);
  container.querySelector('#btn-suspense-action')?.addEventListener('click', (e) => {
    e.stopPropagation();
    suspenseTrigger();
  });
}


  // ===================================================
  // MODULE: js/ui/edition2025.js
  // ===================================================

/**
 * UI: EDICIÓN 2025 (Cufa's Cup I)
 * Muestra el archivo oficial completo: Grupos, Fixture, Playoffs TV Broadcast con Escudos y Podio
 */



function renderEdition2025(container, onBackToHub) {
  if (!container) return;

  const data = EDITION_2025_DATA;
  const currentTab = store.state.active2025Tab || 'playoffs';

  container.innerHTML = `
    <!-- Hero Header with Official Photo for Edition 2025 -->
    <div class="edition-hero-card">
      <div class="edition-hero-inner">
        <div class="edition-hero-media">
          <img src="fotos/Cufas cup 1.jpg" alt="Cufa's Cup 1 Oficial" class="edition-official-poster" />
        </div>
        <div class="edition-hero-details">
          <div class="edition-meta-top">
            <button class="btn-tv btn-tv-secondary btn-back-hub" id="btn-back-to-hub-25">
              ⬅ VOLVER AL MENÚ
            </button>
            <span class="hub-badge hub-badge-silver">📜 ARCHIVO HISTÓRICO OFICIAL</span>
            <span class="pill-stat">EDICIÓN 2025</span>
          </div>
          <h2 class="edition-title">CUFA'S CUP I (2025)</h2>
          <p class="edition-subtitle" style="margin: 0.4rem 0 0.65rem;">
            Torneo Inaugural • 16 Jugadores • 4 Grupos • Cuartos, Semis y Gran Final • Campeón: <strong style="color: #f5c518;">Chino 🏆 (FC Barcelona)</strong>
          </p>
          <div class="edition-pills-row">
            <span class="pill-stat">🏟️ 16 Equipos</span>
            <span class="pill-stat">⚽ 32 Partidos</span>
            <span class="pill-stat gold-border">🥇 Campeón: Chino (Barça)</span>
            <span class="pill-stat silver-border">🥈 Subcampeón: Tomi (Juve)</span>
            <span class="pill-stat bronze-border">🥉 3er Puesto: Marcos (Inglaterra)</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Subtab Content -->
    <div class="edition-subcontent" id="edition-2025-subcontent"></div>
  `;

  const subcontent = container.querySelector('#edition-2025-subcontent');

  // Wire back button
  container.querySelector('#btn-back-to-hub-25')?.addEventListener('click', onBackToHub);

  // Render active subtab
  if (currentTab === 'playoffs') {
    renderPlayoffsView(subcontent, data);
  } else if (currentTab === 'groups') {
    renderGroupsView(subcontent, data);
  } else if (currentTab === 'podium') {
    renderPodiumView(subcontent, data);
  }
}

/**
 * Vista de Eliminatorias estilo TV Broadcast con Escudos Oficiales
 */
function renderPlayoffsView(container, data) {
  const p = data.playoffs;

  container.innerHTML = `
    <div class="broadcast-card" style="padding: 1.5rem 1rem;">
      
      <div class="broadcast-top-info" style="margin-bottom: 1.5rem;">
        <div class="broadcast-title">
          <span>⚔️</span> CUADRO OFICIAL DE ELIMINATORIAS (CUFA'S CUP 2025)
        </div>
        <div class="broadcast-meta-right">
          <span style="color: #00e5ff;">CUARTOS A PARTIDO ÚNICO</span>
          <span style="color: var(--text-dim);">•</span>
          <span style="color: #a855f7;">SEMIFINALES</span>
          <span style="color: var(--text-dim);">•</span>
          <span style="color: #f5c518;">FINALÍSIMA</span>
        </div>
      </div>

      <div style="overflow-x: auto; padding-bottom: 1rem;">
        <div style="display: flex; gap: 1.5rem; min-width: 950px; justify-content: space-between;">
          
          <!-- COLUMNA 1: CUARTOS DE FINAL -->
          <div style="flex: 1; display: flex; flex-direction: column; gap: 1rem;">
            <div style="background: #081622; border-left: 3px solid #00d2ff; padding: 0.6rem 0.8rem; border-radius: 6px; font-weight: 900; font-size: 0.82rem; text-transform: uppercase; color: #00d2ff; display: flex; justify-content: space-between; align-items: center;">
              <span>CUARTOS DE FINAL</span>
              <span style="font-size: 0.68rem; color: var(--text-muted);">4 LLAVES</span>
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.85rem;">
              ${p.quarters.map(m => renderKnockoutMatchTVCard(m)).join('')}
            </div>
          </div>

          <!-- COLUMNA 2: SEMIFINALES -->
          <div style="flex: 1; display: flex; flex-direction: column; gap: 1rem; justify-content: space-around;">
            <div style="background: #140d24; border-left: 3px solid #a855f7; padding: 0.6rem 0.8rem; border-radius: 6px; font-weight: 900; font-size: 0.82rem; text-transform: uppercase; color: #c084fc; display: flex; justify-content: space-between; align-items: center;">
              <span>SEMIFINALES</span>
              <span style="font-size: 0.68rem; color: var(--text-muted);">2 LLAVES</span>
            </div>
            <div style="display: flex; flex-direction: column; gap: 1.5rem;">
              ${p.semifinals.map(m => renderKnockoutMatchTVCard(m)).join('')}
            </div>
          </div>

          <!-- COLUMNA 3: GRAN FINAL & 3ER PUESTO -->
          <div style="flex: 1.15; display: flex; flex-direction: column; gap: 1.5rem; justify-content: center;">
            
            <!-- GRAN FINAL -->
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              <div style="background: #1e1808; border-left: 3px solid #f5c518; padding: 0.6rem 0.8rem; border-radius: 6px; font-weight: 900; font-size: 0.85rem; text-transform: uppercase; color: #f5c518; display: flex; justify-content: space-between; align-items: center;">
                <span>🏆 GRAN FINALÍSIMA 2025</span>
                <span style="font-size: 0.68rem; color: #f5c518;">POR EL TÍTULO</span>
              </div>
              ${renderKnockoutMatchTVCard(p.final, 'gold')}
            </div>

            <!-- TERCER PUESTO -->
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              <div style="background: #1c130a; border-left: 3px solid #cd7f32; padding: 0.6rem 0.8rem; border-radius: 6px; font-weight: 900; font-size: 0.82rem; text-transform: uppercase; color: #e59866; display: flex; justify-content: space-between; align-items: center;">
                <span>🥉 PARTIDO 3° Y 4° PUESTO</span>
                <span style="font-size: 0.68rem; color: #e59866;">MEDALLA DE BRONCE</span>
              </div>
              ${renderKnockoutMatchTVCard(p.thirdPlace, 'bronze')}
            </div>

          </div>

        </div>
      </div>

    </div>
  `;
}

/**
 * Tarjeta de Partido con Escudos, Nombres, Marcadores y Ganador Destacado
 */
function renderKnockoutMatchTVCard(m, theme = null) {
  if (!m) return '';

  const homeShield = m.homeShield || getTeamShield2025(m.homeTeam || m.homePlayer);
  const awayShield = m.awayShield || getTeamShield2025(m.awayTeam || m.awayPlayer);

  const homeWin = m.homeScore > m.awayScore;
  const awayWin = m.awayScore > m.homeScore;

  let borderColor = '#151d2e';
  let boxGlow = 'none';
  let badgeColor = 'var(--text-muted)';

  if (theme === 'gold') {
    borderColor = '#f5c518';
    boxGlow = '0 0 25px rgba(245, 197, 24, 0.2)';
    badgeColor = '#f5c518';
  } else if (theme === 'bronze') {
    borderColor = '#cd7f32';
    boxGlow = '0 0 15px rgba(205, 127, 50, 0.15)';
    badgeColor = '#e59866';
  }

  return `
    <div style="background: #090e1a; border: 1px solid ${borderColor}; border-radius: 8px; padding: 0.75rem; display: flex; flex-direction: column; gap: 0.45rem; box-shadow: ${boxGlow};">
      
      <!-- Match Header -->
      <div style="font-size: 0.7rem; font-weight: 800; color: ${badgeColor}; text-transform: uppercase; letter-spacing: 0.5px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #141c2e; padding-bottom: 0.35rem;">
        <span>${escapeHtml(m.label)}</span>
        <span style="color: #00e676; font-size: 0.65rem; background: rgba(0, 230, 118, 0.1); border: 1px solid rgba(0, 230, 118, 0.3); padding: 1px 5px; border-radius: 4px;">FINAL</span>
      </div>

      <!-- Home Team Row -->
      <div style="display: flex; align-items: center; justify-content: space-between; background: ${homeWin ? 'rgba(0, 230, 118, 0.12)' : '#070b14'}; padding: 0.45rem 0.65rem; border-radius: 6px; border-left: 3px solid ${homeWin ? '#00e676' : 'transparent'};">
        <div style="display: flex; align-items: center; gap: 0.55rem; overflow: hidden;">
          <div style="width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            ${renderShield(homeShield, m.homeTeam)}
          </div>
          <div style="display: flex; flex-direction: column; overflow: hidden;">
            <span style="font-size: 0.88rem; font-weight: 800; color: ${homeWin ? '#00e676' : '#fff'}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              ${escapeHtml(m.homePlayer)}
            </span>
            <span style="font-size: 0.72rem; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              ${escapeHtml(m.homeTeam)}
            </span>
          </div>
        </div>
        <div style="font-family: 'Teko', sans-serif; font-size: 1.6rem; font-weight: 700; color: ${homeWin ? '#00e676' : '#fff'}; line-height: 1; padding-left: 0.5rem;">
          ${m.homeScore}
        </div>
      </div>

      <!-- Away Team Row -->
      <div style="display: flex; align-items: center; justify-content: space-between; background: ${awayWin ? 'rgba(0, 230, 118, 0.12)' : '#070b14'}; padding: 0.45rem 0.65rem; border-radius: 6px; border-left: 3px solid ${awayWin ? '#00e676' : 'transparent'};">
        <div style="display: flex; align-items: center; gap: 0.55rem; overflow: hidden;">
          <div style="width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            ${renderShield(awayShield, m.awayTeam)}
          </div>
          <div style="display: flex; flex-direction: column; overflow: hidden;">
            <span style="font-size: 0.88rem; font-weight: 800; color: ${awayWin ? '#00e676' : '#fff'}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              ${escapeHtml(m.awayPlayer)}
            </span>
            <span style="font-size: 0.72rem; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              ${escapeHtml(m.awayTeam)}
            </span>
          </div>
        </div>
        <div style="font-family: 'Teko', sans-serif; font-size: 1.6rem; font-weight: 700; color: ${awayWin ? '#00e676' : '#fff'}; line-height: 1; padding-left: 0.5rem;">
          ${m.awayScore}
        </div>
      </div>

      <!-- Winner Footnote -->
      <div style="display: flex; align-items: center; gap: 0.4rem; padding-top: 0.2rem; font-size: 0.75rem; color: var(--text-muted);">
        <span>➔ ${theme === 'gold' ? '👑 Campeón:' : theme === 'bronze' ? '🥉 Ganador:' : 'Clasifica:'}</span>
        <strong style="color: ${theme === 'gold' ? '#f5c518' : theme === 'bronze' ? '#e59866' : '#00e676'}; font-weight: 900;">
          ${escapeHtml(m.winner)}
        </strong>
      </div>

    </div>
  `;
}

/**
 * Fase de Grupos con Escudos en Tablas y Enfrentamientos
 */
function renderGroupsView(container, data) {
  const groups = ['A', 'B', 'C', 'D'];

  let html = `<div class="groups-grid-layout">`;

  groups.forEach(grp => {
    const standings = data.groupStandings[grp];
    const matches = data.groupMatches.filter(m => m.group === grp);

    html += `
      <div class="group-card">
        <div class="group-card-header">
          <span class="group-letter">GRUPO ${grp}</span>
          <span class="group-tag">4 PARTICIPANTES</span>
        </div>

        <!-- Standings Table con Escudos -->
        <div class="table-responsive" style="margin-bottom: 1rem;">
          <table class="tv-table compact-table">
            <thead>
              <tr>
                <th style="width: 35px;">POS</th>
                <th>JUGADOR / EQUIPO</th>
                <th title="Puntos">PTS</th>
                <th title="Partidos Jugados">PJ</th>
                <th title="Partidos Ganados">PG</th>
                <th title="Partidos Empatados">PE</th>
                <th title="Partidos Perdidos">PP</th>
                <th title="Goles a Favor">GF</th>
                <th title="Goles en Contra">GC</th>
                <th title="Diferencia de Gol">DG</th>
              </tr>
            </thead>
            <tbody>
              ${standings.map(row => {
                const shield = row.shield || getTeamShield2025(row.team || row.player);
                return `
                  <tr class="${row.pos <= 2 ? 'qualified-row' : ''}">
                    <td class="pos-cell ${row.pos <= 2 ? 'pos-qualified' : ''}">
                      ${row.pos}°
                    </td>
                    <td>
                      <div style="display: flex; align-items: center; gap: 0.55rem;">
                        <div style="width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                          ${renderShield(shield, row.team)}
                        </div>
                        <div style="display: flex; flex-direction: column;">
                          <span style="font-weight: 800; color: #fff;">${escapeHtml(row.player)}</span>
                          <span style="font-size: 0.72rem; color: var(--text-muted);">${escapeHtml(row.team)}</span>
                        </div>
                      </div>
                    </td>
                    <td class="pts-cell"><strong>${row.pts}</strong></td>
                    <td>${row.pj}</td>
                    <td>${row.pg}</td>
                    <td>${row.pe}</td>
                    <td>${row.pp}</td>
                    <td>${row.gf}</td>
                    <td>${row.gc}</td>
                    <td style="color: ${row.dg > 0 ? '#00e676' : row.dg < 0 ? '#ff5252' : '#94a3b8'}; font-weight: 700;">
                      ${row.dg > 0 ? '+' + row.dg : row.dg}
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>

        <!-- Group Matches con Escudos -->
        <div class="group-matches-section">
          <div class="group-matches-title">PARTIDOS DEL GRUPO ${grp}</div>
          <div class="group-matches-list">
            ${matches.map(m => {
              const hShield = getTeamShield2025(m.homeTeam || m.homePlayer);
              const aShield = getTeamShield2025(m.awayTeam || m.awayPlayer);
              return `
                <div class="match-mini-row" style="padding: 0.45rem 0.65rem;">
                  <div class="mini-team home ${m.homeScore > m.awayScore ? 'winner' : ''}">
                    <div style="width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                      ${renderShield(hShield, m.homeTeam)}
                    </div>
                    <span class="player">${escapeHtml(m.homePlayer)}</span>
                    <span class="team" style="color: var(--text-muted); font-size: 0.7rem;">(${escapeHtml(m.homeTeam)})</span>
                  </div>
                  <div class="mini-score">
                    <span class="score-num">${m.homeScore}</span>
                    <span class="score-dash">-</span>
                    <span class="score-num">${m.awayScore}</span>
                  </div>
                  <div class="mini-team away ${m.awayScore > m.homeScore ? 'winner' : ''}">
                    <span class="player">${escapeHtml(m.awayPlayer)}</span>
                    <span class="team" style="color: var(--text-muted); font-size: 0.7rem;">(${escapeHtml(m.awayTeam)})</span>
                    <div style="width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                      ${renderShield(aShield, m.awayTeam)}
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

      </div>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;
}

/**
 * Cuadro de Honor / Podio Oficial con Escudos
 */
function renderPodiumView(container, data) {
  const pod = data.podium;

  container.innerHTML = `
    <div class="podium-section" style="margin-top: 1.5rem; text-align: center;">
      <h2 style="font-family: 'Teko', sans-serif; font-size: 2.8rem; text-align: center; color: #f5c518; letter-spacing: 2px; margin-bottom: 0.5rem;">
        CUADRO DE HONOR • CUFA'S CUP I (2025)
      </h2>
      <p style="text-align: center; color: var(--text-muted); margin-bottom: 2rem; font-size: 1rem;">
        Los 4 mejores jugadores de la edición inaugural del torneo
      </p>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 1.5rem; max-width: 900px; margin: 1.5rem auto 0; align-items: stretch;">
        
        <!-- 2do Puesto (Plata) -->
        <div style="background: #0d1322; border: 1px solid #94a3b8; border-radius: 14px; padding: 1.75rem 1.25rem; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 8px 25px rgba(0,0,0,0.5);">
          <div style="font-size: 2.8rem; margin-bottom: 0.35rem;">🥈</div>
          <div style="font-size: 0.8rem; font-weight: 900; letter-spacing: 1.5px; text-transform: uppercase; color: #cbd5e1; margin-bottom: 0.5rem;">2° PUESTO</div>
          <div style="width: 48px; height: 48px; margin-bottom: 0.6rem; display: flex; align-items: center; justify-content: center;">
            ${renderShield(pod.runnerUp.shield || getTeamShield2025(pod.runnerUp.team), pod.runnerUp.team)}
          </div>
          <div style="font-size: 1.6rem; font-weight: 900; color: #fff; text-transform: uppercase; margin-bottom: 0.25rem;">${escapeHtml(pod.runnerUp.player)}</div>
          <div style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 0.5rem;">${escapeHtml(pod.runnerUp.team)}</div>
          <div style="font-size: 0.75rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 1px;">Subcampeón 2025</div>
        </div>

        <!-- 1er Puesto (Oro) -->
        <div style="background: linear-gradient(180deg, #181408 0%, #090e1a 100%); border: 2px solid #f5c518; border-radius: 16px; padding: 2.25rem 1.25rem; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; transform: scale(1.04); box-shadow: 0 0 35px rgba(245, 197, 24, 0.25);">
          <div style="font-size: 2rem; margin-bottom: -0.2rem; filter: drop-shadow(0 0 10px rgba(245, 197, 24, 0.8));">👑</div>
          <div style="font-size: 3rem; margin-bottom: 0.35rem;">🥇</div>
          <div style="font-size: 0.85rem; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; color: #f5c518; margin-bottom: 0.5rem;">¡CAMPEÓN 2025!</div>
          <div style="width: 54px; height: 54px; margin-bottom: 0.6rem; display: flex; align-items: center; justify-content: center;">
            ${renderShield(pod.champion.shield || getTeamShield2025(pod.champion.team), pod.champion.team)}
          </div>
          <div style="font-size: 1.8rem; font-weight: 900; color: #fff; text-transform: uppercase; margin-bottom: 0.25rem;">${escapeHtml(pod.champion.player)}</div>
          <div style="font-size: 0.95rem; color: #f5c518; font-weight: 700; margin-bottom: 0.5rem;">${escapeHtml(pod.champion.team)}</div>
          <div style="font-size: 0.75rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 1px;">Consagrado Cufa's Cup I</div>
        </div>

        <!-- 3er Puesto (Bronce) -->
        <div style="background: #18110a; border: 1px solid #cd7f32; border-radius: 14px; padding: 1.75rem 1.25rem; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 8px 25px rgba(0,0,0,0.5);">
          <div style="font-size: 2.8rem; margin-bottom: 0.35rem;">🥉</div>
          <div style="font-size: 0.8rem; font-weight: 900; letter-spacing: 1.5px; text-transform: uppercase; color: #e59866; margin-bottom: 0.5rem;">3° PUESTO</div>
          <div style="width: 48px; height: 48px; margin-bottom: 0.6rem; display: flex; align-items: center; justify-content: center;">
            ${renderShield(pod.thirdPlace.shield || getTeamShield2025(pod.thirdPlace.team), pod.thirdPlace.team)}
          </div>
          <div style="font-size: 1.6rem; font-weight: 900; color: #fff; text-transform: uppercase; margin-bottom: 0.25rem;">${escapeHtml(pod.thirdPlace.player)}</div>
          <div style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 0.5rem;">${escapeHtml(pod.thirdPlace.team)}</div>
          <div style="font-size: 0.75rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 1px;">Ganador 3er Puesto</div>
        </div>

      </div>

      <!-- 4to Puesto Honorífico -->
      <div style="max-width: 520px; margin: 2.5rem auto 0; background: #0c1220; border: 1px solid #1e2a42; border-radius: 12px; padding: 1rem 1.5rem; display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center; gap: 0.8rem;">
          <div style="width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;">
            ${renderShield(pod.fourthPlace.shield || getTeamShield2025(pod.fourthPlace.team), pod.fourthPlace.team)}
          </div>
          <div style="text-align: left;">
            <div style="font-weight: 800; color: #fff; font-size: 1.1rem;">${escapeHtml(pod.fourthPlace.player)}</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">${escapeHtml(pod.fourthPlace.team)}</div>
          </div>
        </div>
        <div style="font-size: 0.85rem; font-weight: 800; color: #94a3b8; text-transform: uppercase;">
          Semifinalista (4° Puesto)
        </div>
      </div>

    </div>
  `;
}


  // ===================================================
  // MODULE: js/ui/ranking.js
  // ===================================================

/**
 * UI: RANKING FIFA HISTÓRICO / SALÓN DE LA FAMA
 * Tabla consolidada de todos los tiempos con podio de líderes históricos
 */


let filterQuery = '';

function renderHistoricalRanking(container, edition2State, onBackToHub) {
  if (!container) return;

  const ranking = computeHistoricalRanking(edition2State);
  const filtered = filterQuery
    ? ranking.filter(p => p.name.toLowerCase().includes(filterQuery.toLowerCase()))
    : ranking;

  const top3 = ranking.slice(0, 3);

  container.innerHTML = `
    <!-- Top Bar -->
    <div class="edition-header-bar">
      <div class="edition-meta">
        <button class="btn-tv btn-tv-secondary btn-back-hub" id="btn-back-to-hub-rk">
          ⬅ VOLVER AL MENÚ
        </button>
        <div class="edition-title-wrap">
          <h2 class="edition-title gold-text">🌟 RANKING FIFA • SALÓN HISTÓRICO</h2>
          <span class="edition-subtitle">
            TABLA ACUMULADA DE TODAS LAS EDICIONES (2025 - 2026) • ${ranking.length} JUGADORES REGISTRADOS
          </span>
        </div>
      </div>

      <div class="ranking-search-wrap">
        <input 
          type="text" 
          id="ranking-search-input" 
          class="form-control" 
          placeholder="🔍 Buscar jugador en el ranking..." 
          value="${escapeHtml(filterQuery)}"
        />
      </div>
    </div>

    <!-- TOP 3 HISTÓRICO CARDS -->
    <div class="alltime-podium-wrap">
      
      <!-- #2 HISTÓRICO -->
      ${top3[1] ? `
        <div class="alltime-card alltime-silver">
          <div class="alltime-card-badge">🥈 #2 ALL-TIME</div>
          <div class="alltime-player-name">${escapeHtml(top3[1].name)}</div>
          <div style="display: flex; justify-content: center; align-items: center; gap: 0.45rem; margin-bottom: 0.5rem;">
            ${top3[1].teamsHistory.map(th => `
              <div style="width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center;" title="${th.edition}: ${escapeHtml(th.team)}">
                ${renderShield(th.shield, th.team)}
              </div>
            `).join('')}
          </div>
          <div class="alltime-pts">${top3[1].pts} <small>PTS</small></div>
          <div class="alltime-palmares">
            ${top3[1].titles ? `<span>🏆 ${top3[1].titles}</span>` : ''}
            ${top3[1].runnerUps ? `<span>🥈 ${top3[1].runnerUps}</span>` : ''}
            ${top3[1].thirdPlaces ? `<span>🥉 ${top3[1].thirdPlaces}</span>` : ''}
          </div>
          <div class="alltime-stat-line">
            <span>PJ: <strong>${top3[1].pj}</strong> (G:${top3[1].pg} E:${top3[1].pe} P:${top3[1].pp})</span>
            <span>Efic: <strong>${top3[1].effectiveness}%</strong></span>
          </div>
        </div>
      ` : ''}

      <!-- #1 HISTÓRICO (LÍDER) -->
      ${top3[0] ? `
        <div class="alltime-card alltime-gold leader-card">
          <div class="alltime-crown">👑</div>
          <div class="alltime-card-badge">🥇 #1 LÍDER HISTÓRICO</div>
          <div class="alltime-player-name gold-text">${escapeHtml(top3[0].name)}</div>
          <div style="display: flex; justify-content: center; align-items: center; gap: 0.55rem; margin-bottom: 0.5rem;">
            ${top3[0].teamsHistory.map(th => `
              <div style="width: 26px; height: 26px; display: inline-flex; align-items: center; justify-content: center; filter: drop-shadow(0 0 6px rgba(245, 197, 24, 0.4));" title="${th.edition}: ${escapeHtml(th.team)}">
                ${renderShield(th.shield, th.team)}
              </div>
            `).join('')}
          </div>
          <div class="alltime-pts gold-text">${top3[0].pts} <small>PTS</small></div>
          <div class="alltime-palmares">
            ${top3[0].titles ? `<span class="gold-badge">🏆 ${top3[0].titles} Título${top3[0].titles > 1 ? 's' : ''}</span>` : ''}
            ${top3[0].runnerUps ? `<span>🥈 ${top3[0].runnerUps}</span>` : ''}
            ${top3[0].thirdPlaces ? `<span>🥉 ${top3[0].thirdPlaces}</span>` : ''}
          </div>
          <div class="alltime-stat-line">
            <span>PJ: <strong>${top3[0].pj}</strong> (G:${top3[0].pg} E:${top3[0].pe} P:${top3[0].pp})</span>
            <span>Efic: <strong>${top3[0].effectiveness}%</strong></span>
          </div>
        </div>
      ` : ''}

      <!-- #3 HISTÓRICO -->
      ${top3[2] ? `
        <div class="alltime-card alltime-bronze">
          <div class="alltime-card-badge">🥉 #3 ALL-TIME</div>
          <div class="alltime-player-name">${escapeHtml(top3[2].name)}</div>
          <div style="display: flex; justify-content: center; align-items: center; gap: 0.45rem; margin-bottom: 0.5rem;">
            ${top3[2].teamsHistory.map(th => `
              <div style="width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center;" title="${th.edition}: ${escapeHtml(th.team)}">
                ${renderShield(th.shield, th.team)}
              </div>
            `).join('')}
          </div>
          <div class="alltime-pts">${top3[2].pts} <small>PTS</small></div>
          <div class="alltime-palmares">
            ${top3[2].titles ? `<span>🏆 ${top3[2].titles}</span>` : ''}
            ${top3[2].runnerUps ? `<span>🥈 ${top3[2].runnerUps}</span>` : ''}
            ${top3[2].thirdPlaces ? `<span>🥉 ${top3[2].thirdPlaces}</span>` : ''}
          </div>
          <div class="alltime-stat-line">
            <span>PJ: <strong>${top3[2].pj}</strong> (G:${top3[2].pg} E:${top3[2].pe} P:${top3[2].pp})</span>
            <span>Efic: <strong>${top3[2].effectiveness}%</strong></span>
          </div>
        </div>
      ` : ''}

    </div>

    <!-- MAIN RANKING TABLE -->
    <div class="table-container" style="margin-top: 1.5rem;">
      <div class="table-responsive">
        <table class="tv-table">
          <thead>
            <tr>
              <th style="width: 50px;">RANK</th>
              <th>JUGADOR</th>
              <th title="Ediciones Disputadas">EDICIONES</th>
              <th title="Palmarés y Títulos">TÍTULOS / PODIOS</th>
              <th title="Puntos Históricos" style="background: rgba(245, 197, 24, 0.1);">PTS</th>
              <th title="Partidos Jugados">PJ</th>
              <th title="Partidos Ganados">PG</th>
              <th title="Partidos Empatados">PE</th>
              <th title="Partidos Perdidos">PP</th>
              <th title="Goles a Favor">GF</th>
              <th title="Goles en Contra">GC</th>
              <th title="Diferencia de Gol">DG</th>
              <th title="Porcentaje de Efectividad">EFIC %</th>
            </tr>
          </thead>
          <tbody>
            ${filtered.length === 0 ? `
              <tr>
                <td colspan="13" style="text-align: center; padding: 2rem; color: var(--text-muted);">
                  No se encontraron jugadores que coincidan con la búsqueda.
                </td>
              </tr>
            ` : filtered.map(p => {
              const rankClass = p.rank === 1 ? 'rank-1' : p.rank === 2 ? 'rank-2' : p.rank === 3 ? 'rank-3' : '';
              return `
                <tr class="ranking-row ${rankClass}">
                  <td class="pos-cell ${rankClass}">
                    ${p.rank === 1 ? '🥇 1' : p.rank === 2 ? '🥈 2' : p.rank === 3 ? '🥉 3' : p.rank + '°'}
                  </td>
                  <td>
                    <div style="display: flex; align-items: center; gap: 0.6rem;">
                      <span class="ranking-player-name">${escapeHtml(p.name)}</span>
                      ${p.titles > 0 ? `<span class="badge-champion" title="Campeón de torneo">🏆 x${p.titles}</span>` : ''}
                    </div>
                    <div class="player-history-tags">
                      ${p.teamsHistory.map(th => `
                        <span class="history-pill" title="Edición ${th.edition}" style="display: inline-flex; align-items: center; gap: 0.35rem;">
                          <span style="width: 15px; height: 15px; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0;">
                            ${renderShield(th.shield, th.team)}
                          </span>
                          <span>${th.edition}: ${escapeHtml(th.team)}</span>
                        </span>
                      `).join('')}
                    </div>
                  </td>
                  <td>
                    <span class="badge-edition-count">
                      ${p.editionsCount} ${p.editionsCount === 1 ? 'Edición' : 'Ediciones'}
                    </span>
                  </td>
                  <td>
                    <div class="medals-pill-group">
                      ${p.titles > 0 ? `<span class="medal-pill gold" title="Campeón">🏆 ${p.titles}</span>` : ''}
                      ${p.runnerUps > 0 ? `<span class="medal-pill silver" title="Subcampeón">🥈 ${p.runnerUps}</span>` : ''}
                      ${p.thirdPlaces > 0 ? `<span class="medal-pill bronze" title="3° Puesto">🥉 ${p.thirdPlaces}</span>` : ''}
                      ${p.titles === 0 && p.runnerUps === 0 && p.thirdPlaces === 0 ? `<span style="color: var(--text-muted); font-size: 0.8rem;">-</span>` : ''}
                    </div>
                  </td>
                  <td class="pts-cell highlight-cell">
                    <strong>${p.pts}</strong>
                  </td>
                  <td>${p.pj}</td>
                  <td>${p.pg}</td>
                  <td>${p.pe}</td>
                  <td>${p.pp}</td>
                  <td>${p.gf}</td>
                  <td>${p.gc}</td>
                  <td style="font-weight: 700; color: ${p.dg > 0 ? '#00e676' : p.dg < 0 ? '#ff5252' : '#94a3b8'};">
                    ${p.dg > 0 ? '+' + p.dg : p.dg}
                  </td>
                  <td>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                      <div class="ef-bar-track">
                        <div class="ef-bar-fill" style="width: ${p.effectiveness}%;"></div>
                      </div>
                      <span style="font-weight: 700; font-size: 0.85rem; color: #fff;">${p.effectiveness}%</span>
                    </div>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  // Listeners
  container.querySelector('#btn-back-to-hub-rk')?.addEventListener('click', onBackToHub);

  const searchInput = container.querySelector('#ranking-search-input');
  if (searchInput) {
    searchInput.focus();
    searchInput.setSelectionRange(searchInput.value.length, searchInput.value.length);
    searchInput.addEventListener('input', (e) => {
      filterQuery = e.target.value;
      renderHistoricalRanking(container, edition2State, onBackToHub);
    });
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/[&<>"']/g, function (m) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
  });
}


  // ===================================================
  // MODULE: js/ui/standings.js
  // ===================================================

/**
 * Official Standings & Team Presentation UI Component (Exact TV Broadcast Replica)
 */


function renderStandings(container) {
  if (!container) return;

  const standings = store.getStandings();
  const { teams, filterPlayer } = store.state;

  let html = `
    <!-- 1. TABLA OFICIAL DE POSICIONES (FASE LIGA) - AHORA ARRIBA -->
    <div class="broadcast-card" style="margin-bottom: 2rem;">
      <div class="broadcast-top-info">
        <div class="broadcast-title">
          <span>🏆</span> TABLA OFICIAL DE POSICIONES - FASE LIGA
        </div>
        <div class="table-legend" style="padding: 0;">
          <div class="legend-item">
            <span class="legend-color" style="background: #f5c518;"></span>
            <span>1° al 4°: Cuartos Directo</span>
          </div>
          <div class="legend-item">
            <span class="legend-color" style="background: #00d2ff;"></span>
            <span>5° al 12°: Playoffs Clasificatorios</span>
          </div>
          <div class="legend-item">
            <span class="legend-color" style="background: #1e293b;"></span>
            <span>13° al 20°: Eliminados</span>
          </div>
        </div>
      </div>

      <div class="table-container-tv">
        <table class="standings-table-tv">
          <thead>
            <tr>
              <th style="width: 45px;">POS</th>
              <th class="th-team">EQUIPO / PARTICIPANTE</th>
              <th>PJ</th>
              <th>PG</th>
              <th>PE</th>
              <th>PP</th>
              <th>GF</th>
              <th>GC</th>
              <th>DG</th>
              <th>PTS</th>
              <th>RACHA</th>
            </tr>
          </thead>
          <tbody>
  `;

  standings.forEach((entry, index) => {
    const pos = index + 1;
    let zoneClass = 'zone-eliminated';
    if (pos <= 4) zoneClass = 'zone-top4';
    else if (pos <= 12) zoneClass = 'zone-playoffs';

    const isMatch = filterPlayer && (
      entry.team.name.toLowerCase().includes(filterPlayer) ||
      (entry.team.player && entry.team.player.toLowerCase().includes(filterPlayer))
    );

    const dgClass = entry.dg > 0 ? 'diff-positive' : entry.dg < 0 ? 'diff-negative' : '';
    const dgSign = entry.dg > 0 ? `+${entry.dg}` : `${entry.dg}`;

    const formHtml = entry.form.length > 0
      ? entry.form.map(f => `<span class="streak-dot streak-${f.toLowerCase()}">${f}</span>`).join('')
      : `<span style="color: var(--text-dim); font-size: 0.75rem;">-</span>`;

    html += `
      <tr class="${zoneClass} ${isMatch ? 'highlighted' : ''} clickable-team-row" 
          data-team-id="${entry.team.id}"
          title="Click para ver enfrentamientos directos de ${escapeHtml(entry.team.player || '')}">
        <td>
          <span class="pos-pill">${pos}</span>
        </td>
        <td style="text-align: left; padding-left: 1rem;">
          <div style="display: flex; align-items: center; gap: 0.65rem;">
            <div style="width: 26px; height: 26px; min-width: 26px; max-width: 26px; display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0;">
              ${renderShield(entry.team.shield, entry.team.name)}
            </div>
            <div>
              <span style="font-weight: 800; color: #fff; text-transform: uppercase;">${escapeHtml(entry.team.player || '')}</span>
              <span style="color: var(--text-muted); font-size: 0.75rem; margin-left: 0.35rem;">(${escapeHtml(entry.team.name)})</span>
            </div>
          </div>
        </td>
        <td>${entry.pj}</td>
        <td>${entry.pg}</td>
        <td>${entry.pe}</td>
        <td>${entry.pp}</td>
        <td>${entry.gf}</td>
        <td>${entry.gc}</td>
        <td class="${dgClass}">${dgSign}</td>
        <td class="pts-bold">${entry.pts}</td>
        <td>
          <div class="form-streak">${formHtml}</div>
        </td>
      </tr>
    `;
  });

  html += `
          </tbody>
        </table>
      </div>
    </div>

    <!-- 2. PRESENTACIÓN OFICIAL DE EQUIPOS (AHORA DEBAJO DE LA TABLA) -->
    <div class="broadcast-card" style="margin-bottom: 2rem;">
      <div class="broadcast-top-info">
        <div class="broadcast-title">
          <span>👥</span> PRESENTACIÓN OFICIAL DE EQUIPOS
        </div>
        <div class="broadcast-meta-right">
          <span style="color: var(--text-muted);">20 EQUIPOS SELECCIONADOS</span>
          <span style="color: var(--text-dim);">•</span>
          <span style="color: var(--accent-green);">20/20 ASIGNADOS</span>
          <span style="color: var(--text-dim);">•</span>
          <span style="color: var(--accent-green); display: flex; align-items: center; gap: 4px;">
            <span class="live-dot"></span> EN VIVO
          </span>
        </div>
      </div>

      <div class="presentation-grid">
        ${teams.map(t => {
          const isClub = t.type === 'Club';
          const isHighlight = filterPlayer && (
            t.name.toLowerCase().includes(filterPlayer) ||
            (t.player && t.player.toLowerCase().includes(filterPlayer))
          );

          return `
            <div class="team-card-presentation clickable-team-card ${isHighlight ? 'highlighted-border' : ''}" 
                 data-team-id="${t.id}" 
                 title="Click para ver enfrentamientos directos de ${escapeHtml(t.player || t.name)}"
                 style="${isHighlight ? 'border-color: #38bdf8; box-shadow: 0 0 15px rgba(56, 189, 248, 0.4);' : ''}">
              <span class="badge-corner ${isClub ? 'club' : 'seleccion'}">
                ${isClub ? '★ CLUB' : '★ SELECCIÓN'}
              </span>
              <div class="presentation-shield-box">
                ${renderShield(t.shield, t.name)}
              </div>
              <div>
                <div class="presentation-team-name">${escapeHtml(t.name)}</div>
                <div class="presentation-player-name">🎮 ${escapeHtml(t.player || 'Sin Asignar')}</div>
              </div>
              <div class="team-card-action-hint">VER ENFRENTAMIENTOS ➔</div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  container.innerHTML = html;

  // Wire participant click events
  container.querySelectorAll('.clickable-team-card, .clickable-team-row').forEach(el => {
    el.addEventListener('click', () => {
      const teamId = el.getAttribute('data-team-id');
      if (teamId) {
        store.selectParticipant(teamId);
      }
    });
  });
}


  // ===================================================
  // MODULE: js/ui/fixtures.js
  // ===================================================

/**
 * Official Fixture Broadcast UI Component (Exact replica of TV Graphics)
 */


function renderFixtures(container) {
  if (!container) return;

  const { matches, teams, selectedMatchday, filterPlayer } = store.state;
  const teamsMap = new Map(teams.map(t => [t.id, t]));

  // 4 Fechas
  const matchdays = [1, 2, 3, 4];

  // Filter matches
  let filteredMatches = matches;
  if (filterPlayer) {
    filteredMatches = matches.filter(m => {
      const home = teamsMap.get(m.homeTeamId);
      const away = teamsMap.get(m.awayTeamId);
      const q = filterPlayer.toLowerCase();
      const matchHome = home && (home.name.toLowerCase().includes(q) || home.player.toLowerCase().includes(q));
      const matchAway = away && (away.name.toLowerCase().includes(q) || away.player.toLowerCase().includes(q));
      return matchHome || matchAway;
    });
  } else {
    filteredMatches = matches.filter(m => m.matchday === selectedMatchday);
  }

  // Split Consola 1 and Consola 2
  const c1Matches = filteredMatches.filter(m => m.console === 'Consola 1');
  const c2Matches = filteredMatches.filter(m => m.console === 'Consola 2');

  let html = `
    <div class="broadcast-card">
      <div class="broadcast-top-info">
        <div class="broadcast-title">
          <span>📅</span> FIXTURE OFICIAL COMPLETO
        </div>
        
        <!-- Fecha Tabs in Center -->
        ${!filterPlayer ? `
          <div class="fixture-fechas-nav">
            ${matchdays.map(day => `
              <button class="fecha-tab-btn ${day === selectedMatchday ? 'active' : ''}" data-day="${day}">
                FECHA ${day}
              </button>
            `).join('')}
          </div>
        ` : ''}

        <div class="broadcast-meta-right">
          <span style="color: var(--text-muted);">FECHA ${selectedMatchday} DE 4</span>
          <span style="color: var(--text-dim);">•</span>
          <span style="color: var(--accent-green); display: flex; align-items: center; gap: 4px;">
            <span class="live-dot"></span> EN VIVO
          </span>
        </div>
      </div>

      <!-- Consoles Dual Column Layout -->
      <div class="consoles-dual-grid">
        
        <!-- CONSOLA 1 -->
        <div class="console-column">
          <div class="console-tv-header consola-1">
            <span>🎮 CONSOLA 1</span>
            <span class="console-matches-count">${c1Matches.length} PARTIDOS</span>
          </div>

          ${c1Matches.length === 0 ? `
            <div style="text-align: center; padding: 2rem; color: var(--text-dim); background: #0b101d; border-radius: 4px;">No hay partidos programados</div>
          ` : c1Matches.map(m => renderMatchBarTV(m, teamsMap)).join('')}
        </div>

        <!-- CONSOLA 2 -->
        <div class="console-column">
          <div class="console-tv-header consola-2">
            <span>🎮 CONSOLA 2</span>
            <span class="console-matches-count">${c2Matches.length} PARTIDOS</span>
          </div>

          ${c2Matches.length === 0 ? `
            <div style="text-align: center; padding: 2rem; color: var(--text-dim); background: #0b101d; border-radius: 4px;">No hay partidos programados</div>
          ` : c2Matches.map(m => renderMatchBarTV(m, teamsMap)).join('')}
        </div>

      </div>
    </div>
  `;

  container.innerHTML = html;

  // Bind fecha tab clicks
  container.querySelectorAll('.fecha-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const day = btn.getAttribute('data-day');
      store.setMatchday(day);
    });
  });
}

function renderMatchBarTV(m, teamsMap) {
  const home = teamsMap.get(m.homeTeamId) || { name: 'Por definir', player: '', shield: '' };
  const away = teamsMap.get(m.awayTeamId) || { name: 'Por definir', player: '', shield: '' };

  const isFinished = m.status === 'finished';
  const isLive = m.status === 'live';
  const isInaugural = m.turn && m.turn.includes('Inaugural');

  return `
    <div class="match-bar-tv">
      <div class="match-bar-top-tag">
        <span class="${isInaugural ? 'tag-inaugural' : 'tag-turn'}">
          ${isInaugural ? '★ PARTIDO DEBUT - INAUGURAL' : (m.turn || 'PARTIDO')}
        </span>
        ${isLive ? `<span style="color: #ff3b30; font-weight: 800;">● EN VIVO</span>` : ''}
      </div>

      <div class="match-bar-body">
        
        <!-- Team Local -->
        <div class="match-bar-team home">
          <div class="bar-shield-box">${renderShield(home.shield, home.name)}</div>
          <div class="bar-team-info">
            <span class="bar-player-name">${escapeHtml(home.player || home.name)}</span>
            <span class="bar-team-sub">${escapeHtml(home.name)}</span>
          </div>
        </div>

        <!-- Center VS or Score -->
        <div class="vs-graphic-center">
          ${isFinished || isLive ? `
            <div class="vs-score-digits">${m.homeScore ?? 0} - ${m.awayScore ?? 0}</div>
          ` : `
            <span class="vs-text-tv">VS</span>
          `}
        </div>

        <!-- Team Away -->
        <div class="match-bar-team away">
          <div class="bar-team-info">
            <span class="bar-player-name">${escapeHtml(away.player || away.name)}</span>
            <span class="bar-team-sub">${escapeHtml(away.name)}</span>
          </div>
          <div class="bar-shield-box">${renderShield(away.shield, away.name)}</div>
        </div>

      </div>
    </div>
  `;
}


  // ===================================================
  // MODULE: js/ui/bracket.js
  // ===================================================

/**
 * Champions League Knockout Bracket UI Component (TV Broadcast Style)
 */


function renderBracket(container) {
  if (!container) return;

  const bracket = store.state.bracket;
  if (!bracket) {
    container.innerHTML = `<div class="broadcast-card"><p>No hay cuadro de eliminatorias generado.</p></div>`;
    return;
  }

  let html = `
    <div class="broadcast-card">
      <div class="broadcast-top-info">
        <div class="broadcast-title">
          <span>⚔️</span> CUADRO OFICIAL DE ELIMINATORIAS
        </div>
        <div class="broadcast-meta-right">
          <span style="color: var(--accent-gold);">TOP 4 DIRECTO A 4TOS</span>
          <span style="color: var(--text-dim);">•</span>
          <span style="color: var(--accent-blue);">PLAYOFFS 5° AL 12°</span>
          <span style="color: var(--text-dim);">•</span>
          <span style="color: #c084fc;">PLAYOFFS CLASIFICATORIOS</span>
        </div>
      </div>

      <div class="bracket-wrapper" style="overflow-x: auto; padding: 1rem 0;">
        <div style="display: flex; gap: 1.5rem; min-width: 1050px; justify-content: space-between;">

          <!-- 1. PLAYOFFS (5° al 12°) -->
          <div style="flex: 1; display: flex; flex-direction: column; gap: 1rem;">
            <div style="background: #08141e; border-left: 3px solid #00d2ff; padding: 0.5rem; border-radius: 4px; font-weight: 900; font-size: 0.8rem; text-transform: uppercase; color: #00d2ff; display: flex; justify-content: space-between; align-items: center;">
              <span>PLAYOFFS (5° AL 12°)</span>
              <span style="font-size: 0.65rem; color: var(--text-dim);">LLAVES DIRECTAS</span>
            </div>
            ${(bracket.playoffs || []).map((m, idx) => renderBracketMatchTV(m, `Playoff ${idx + 1}`)).join('')}
          </div>

          <!-- 2. CUARTOS DE FINAL -->
          <div style="flex: 1; display: flex; flex-direction: column; gap: 1rem;">
            <div style="background: #081610; border-left: 3px solid #00e676; padding: 0.5rem; border-radius: 4px; font-weight: 900; font-size: 0.8rem; text-transform: uppercase; color: #00e676; display: flex; justify-content: space-between; align-items: center;">
              <span>CUARTOS DE FINAL</span>
              <span style="font-size: 0.65rem; color: var(--text-dim);">TOP 4 + GANADORES</span>
            </div>
            ${(bracket.quarterfinals || []).map((m, idx) => renderBracketMatchTV(m, `Cuartos ${idx + 1}`)).join('')}
          </div>

          <!-- 3. SEMIFINALES -->
          <div style="flex: 1; display: flex; flex-direction: column; gap: 1rem;">
            <div style="background: #141026; border-left: 3px solid #a855f7; padding: 0.5rem; border-radius: 4px; font-weight: 900; font-size: 0.8rem; text-transform: uppercase; color: #c084fc;">
              SEMIFINALES
            </div>
            ${(bracket.semifinals || []).map((m, idx) => renderBracketMatchTV(m, `Semifinal ${idx + 1}`)).join('')}
          </div>

          <!-- 4. FASE FINAL (GRAN FINAL & 3° PUESTO) -->
          <div style="flex: 1.1; display: flex; flex-direction: column; gap: 1.25rem; justify-content: center;">
            
            <!-- GRAN FINAL -->
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              <div style="background: #1e1808; border-left: 3px solid #f5c518; padding: 0.5rem; border-radius: 4px; font-weight: 900; font-size: 0.85rem; text-transform: uppercase; color: #f5c518;">
                🏆 GRAN FINAL
              </div>
              ${renderBracketMatchTV(bracket.final, 'Gran Final', 'gold')}
            </div>

            <!-- PARTIDO 3° PUESTO -->
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              <div style="background: #1c140a; border-left: 3px solid #cd7f32; padding: 0.5rem; border-radius: 4px; font-weight: 900; font-size: 0.8rem; text-transform: uppercase; color: #e59866;">
                🥉 PARTIDO 3° Y 4° PUESTO
              </div>
              ${renderBracketMatchTV(bracket.thirdPlace || { label: 'Tercer Puesto 🥉', team1: null, team2: null, score1: null, score2: null, winner: null }, '3° Puesto', 'bronze')}
            </div>

          </div>

        </div>
      </div>

      <!-- Official Podium Section -->
      ${renderPodiumSection(bracket)}
    </div>
  `;

  container.innerHTML = html;
}

function renderBracketMatchTV(match, defaultLabel, highlightTheme = null) {
  if (!match) return '';

  const team1 = match.team1 || { name: 'Por definir', player: '?', shield: '' };
  const team2 = match.team2 || { name: 'Por definir', player: '?', shield: '' };

  const isT1Winner = match.winner && match.team1 && match.winner.id === match.team1.id;
  const isT2Winner = match.winner && match.team2 && match.winner.id === match.team2.id;

  const score1 = match.score1 !== null && match.score1 !== undefined ? match.score1 : '-';
  const score2 = match.score2 !== null && match.score2 !== undefined ? match.score2 : '-';

  let borderColor = '#151c2e';
  if (highlightTheme === 'gold') borderColor = '#f5c518';
  else if (highlightTheme === 'bronze') borderColor = '#cd7f32';

  return `
    <div style="background: #0b101d; border: 1px solid ${borderColor}; border-radius: 4px; padding: 0.6rem; display: flex; flex-direction: column; gap: 0.3rem; box-shadow: ${highlightTheme === 'gold' ? '0 0 15px rgba(245, 197, 24, 0.15)' : 'none'};">
      <div style="font-size: 0.65rem; color: ${highlightTheme === 'gold' ? '#f5c518' : highlightTheme === 'bronze' ? '#e59866' : 'var(--text-dim)'}; text-transform: uppercase; font-weight: 800; display: flex; justify-content: space-between;">
        <span>${escapeHtml(match.label || defaultLabel)}</span>
        ${match.status === 'finished' ? '<span style="color: #00e676;">FINALIZADO</span>' : ''}
      </div>

      <!-- Team 1 -->
      <div style="display: flex; align-items: center; justify-content: space-between; background: ${isT1Winner ? 'rgba(0, 230, 118, 0.15)' : '#070b14'}; padding: 0.35rem 0.5rem; border-radius: 3px; border-left: 2px solid ${isT1Winner ? '#00e676' : 'transparent'};">
        <div style="display: flex; align-items: center; gap: 0.45rem; overflow: hidden;">
          <div style="width: 22px; height: 22px; display: flex; align-items: center;">${renderShield(team1.shield, team1.name)}</div>
          <span style="font-size: 0.82rem; font-weight: 800; color: ${isT1Winner ? '#00e676' : '#fff'}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 120px;">
            ${escapeHtml(team1.player || team1.name)}
          </span>
        </div>
        <div style="font-family: var(--font-numbers); font-size: 1.2rem; font-weight: 700; color: #fff;">${score1}</div>
      </div>

      <!-- Team 2 -->
      <div style="display: flex; align-items: center; justify-content: space-between; background: ${isT2Winner ? 'rgba(0, 230, 118, 0.15)' : '#070b14'}; padding: 0.35rem 0.5rem; border-radius: 3px; border-left: 2px solid ${isT2Winner ? '#00e676' : 'transparent'};">
        <div style="display: flex; align-items: center; gap: 0.45rem; overflow: hidden;">
          <div style="width: 22px; height: 22px; display: flex; align-items: center;">${renderShield(team2.shield, team2.name)}</div>
          <span style="font-size: 0.82rem; font-weight: 800; color: ${isT2Winner ? '#00e676' : '#fff'}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 120px;">
            ${escapeHtml(team2.player || team2.name)}
          </span>
        </div>
        <div style="font-family: var(--font-numbers); font-size: 1.2rem; font-weight: 700; color: #fff;">${score2}</div>
      </div>
    </div>
  `;
}

function renderPodiumSection(bracket) {
  if (!bracket || (!bracket.champion && !bracket.thirdPlaceWinner)) return '';

  return `
    <div style="margin-top: 2rem; background: #0a0e1a; border: 1px solid #1e293b; border-radius: 8px; padding: 1.5rem;">
      <div style="text-align: center; font-size: 1rem; font-weight: 900; color: #fff; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 1.25rem;">
        🎖️ PODIO OFICIAL CUFA'S CUP II
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; align-items: stretch;">
        
        <!-- 2nd Place -->
        ${bracket.runnerUp ? `
          <div style="background: #0d1322; border: 1px solid #94a3b8; border-radius: 6px; padding: 1.2rem; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <div style="font-size: 2rem;">🥈</div>
            <div style="font-size: 0.75rem; color: #94a3b8; font-weight: 900; letter-spacing: 1.5px; text-transform: uppercase;">SUBCAMPEÓN</div>
            <div style="width: 44px; height: 44px; margin: 0.5rem 0;">${renderShield(bracket.runnerUp.shield, bracket.runnerUp.name)}</div>
            <div style="font-size: 1.2rem; font-weight: 900; color: #fff; text-transform: uppercase;">${escapeHtml(bracket.runnerUp.player || bracket.runnerUp.name)}</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">${escapeHtml(bracket.runnerUp.name)}</div>
          </div>
        ` : ''}

        <!-- 1st Place (Champion) -->
        ${bracket.champion ? `
          <div style="background: #141208; border: 2px solid #f5c518; border-radius: 6px; padding: 1.4rem; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; transform: scale(1.03); box-shadow: 0 0 25px rgba(245, 197, 24, 0.2);">
            <div style="font-size: 2.8rem; filter: drop-shadow(0 0 10px rgba(245, 197, 24, 0.6));">🏆</div>
            <div style="font-size: 0.85rem; color: #f5c518; font-weight: 900; letter-spacing: 2px; text-transform: uppercase;">¡CAMPEÓN!</div>
            <div style="width: 52px; height: 52px; margin: 0.5rem 0;">${renderShield(bracket.champion.shield, bracket.champion.name)}</div>
            <div style="font-size: 1.6rem; font-weight: 900; color: #fff; text-transform: uppercase;">${escapeHtml(bracket.champion.player || bracket.champion.name)}</div>
            <div style="font-size: 0.85rem; color: var(--text-muted);">${escapeHtml(bracket.champion.name)}</div>
          </div>
        ` : ''}

        <!-- 3rd Place -->
        ${bracket.thirdPlaceWinner ? `
          <div style="background: #140e08; border: 1px solid #cd7f32; border-radius: 6px; padding: 1.2rem; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <div style="font-size: 2rem;">🥉</div>
            <div style="font-size: 0.75rem; color: #e59866; font-weight: 900; letter-spacing: 1.5px; text-transform: uppercase;">3° PUESTO</div>
            <div style="width: 44px; height: 44px; margin: 0.5rem 0;">${renderShield(bracket.thirdPlaceWinner.shield, bracket.thirdPlaceWinner.name)}</div>
            <div style="font-size: 1.2rem; font-weight: 900; color: #fff; text-transform: uppercase;">${escapeHtml(bracket.thirdPlaceWinner.player || bracket.thirdPlaceWinner.name)}</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">${escapeHtml(bracket.thirdPlaceWinner.name)}</div>
          </div>
        ` : ''}

      </div>
    </div>
  `;
}



  // ===================================================
  // MODULE: js/ui/admin.js
  // ===================================================

/**
 * Admin Panel UI Component (TV Broadcast Clean Style)
 */



function renderAdmin(container) {
  if (!container) return;

  const { isAdminAuthenticated, matches, teams, bracket, selectedMatchday } = store.state;

  // 1. PIN Login
  if (!isAdminAuthenticated) {
    container.innerHTML = `
      <div class="broadcast-card" style="max-width: 420px; margin: 2rem auto; text-align: center;">
        <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">🔒</div>
        <div class="broadcast-title" style="justify-content: center; margin-bottom: 0.5rem;">
          ACCESO DE ADMINISTRADOR
        </div>
        <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 1.25rem;">
          Ingresá la contraseña para cargar resultados y administrar el torneo.
        </p>

        <form id="admin-login-form">
          <div class="form-group">
            <input 
              type="password" 
              id="admin-pin-input" 
              class="form-control" 
              placeholder="Contraseña de Administrador" 
              style="text-align: center; font-size: 1.15rem; letter-spacing: 2px;"
              required
              autofocus
            />
          </div>
          <div id="login-error" style="color: #ff3b30; font-size: 0.8rem; margin-bottom: 1rem; display: none;">
            Contraseña incorrecta. Intentá nuevamente.
          </div>
          <button type="submit" class="btn-tv btn-tv-primary" style="width: 100%; justify-content: center;">
            INGRESAR AL PANEL
          </button>
        </form>
      </div>
    `;

    const form = container.querySelector('#admin-login-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const pin = container.querySelector('#admin-pin-input').value;
      const success = store.authenticateAdmin(pin);
      if (!success) {
        container.querySelector('#login-error').style.display = 'block';
      }
    });

    return;
  }

  // 2. Full Admin Dashboard
  const teamsMap = new Map(teams.map(t => [t.id, t]));
  const matchdays = [1, 2, 3, 4];
  const currentMatches = matches.filter(m => m.matchday === selectedMatchday);

  const c1Matches = currentMatches.filter(m => m.console === 'Consola 1');
  const c2Matches = currentMatches.filter(m => m.console === 'Consola 2');

  let html = `
    <!-- Top Admin Header Toolbar -->
    <div class="admin-toolbar-tv">
      <div style="font-size: 0.9rem; font-weight: 900; color: #00e676; letter-spacing: 1px;">
        ● PANEL DE CONTROL ACTIVO
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
        <button class="btn-tv btn-tv-primary" id="btn-seed-f1" title="Carga resultados en todos los 10 partidos de la Fecha 1">
          ⚡ Cargar Fecha 1
        </button>
        <button class="btn-tv btn-tv-secondary" id="btn-seed-all" title="Simula resultados para las 4 fechas completas (40 partidos)">
          ⚡ Simular Torneo Completo
        </button>
        <button class="btn-tv btn-tv-danger" id="btn-reset-all" title="Borra todos los goles y deja los partidos por jugar">
          🧹 Limpiar Resultados
        </button>
        <button class="btn-tv btn-tv-primary" id="btn-sync-bracket">
          🔄 Sincronizar por Tabla
        </button>
        <button class="btn-tv btn-tv-secondary" id="btn-firebase-modal">
          🔥 Conectar Firebase
        </button>
        <button class="btn-tv btn-tv-secondary" id="btn-export-json">
          💾 Exportar JSON
        </button>
        <label class="btn-tv btn-tv-secondary" style="margin: 0; cursor: pointer;">
          📂 Importar JSON
          <input type="file" id="input-import-json" accept=".json" style="display: none;" />
        </label>
        <button class="btn-tv btn-tv-danger" id="btn-admin-logout">
          Salir
        </button>
      </div>
    </div>

    <!-- Carga de Resultados (Fecha 1 a 4) -->
    <div class="broadcast-card">
      <div class="broadcast-top-info">
        <div class="broadcast-title">
          <span>⚽</span> CARGA DE RESULTADOS - FECHA ${selectedMatchday}
        </div>

        <div class="fixture-fechas-nav" style="margin-bottom: 0;">
          ${matchdays.map(day => `
            <button class="fecha-tab-btn ${day === selectedMatchday ? 'active' : ''}" data-admin-day="${day}">
              FECHA ${day}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Consoles Dual Column Layout -->
      <div class="consoles-dual-grid">
        
        <!-- Consola 1 -->
        <div class="console-column">
          <div class="console-tv-header consola-1">
            <span>🎮 CONSOLA 1</span>
            <span class="console-matches-count">${c1Matches.length} PARTIDOS</span>
          </div>
          ${c1Matches.map(m => renderAdminMatchBar(m, teamsMap)).join('')}
        </div>

        <!-- Consola 2 -->
        <div class="console-column">
          <div class="console-tv-header consola-2">
            <span>🎮 CONSOLA 2</span>
            <span class="console-matches-count">${c2Matches.length} PARTIDOS</span>
          </div>
          ${c2Matches.map(m => renderAdminMatchBar(m, teamsMap)).join('')}
        </div>

      </div>
    </div>

    <!-- Gestión de Playoffs & Selección Manual de Cruces (Sorteo IRL) -->
    <div class="broadcast-card" style="margin-top: 1.5rem;">
      <div class="broadcast-top-info">
        <div class="broadcast-title">
          <span>⚔️</span> GESTIÓN DE ELIMINATORIAS (CRUCES POR SORTEO IRL)
        </div>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <button class="btn-tv btn-tv-primary" id="btn-sync-bracket-2" title="Asigna por defecto los cruces según la tabla (5° vs 12°, 6° vs 11°...)">
            🔄 Cargar Cruces Estándar por Tabla (5° vs 12°)
          </button>
        </div>
      </div>

      <!-- Bombos Guide for IRL Draw -->
      ${renderBombosGuide(store.getStandings())}

      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 1rem; margin-top: 1rem;" id="bracket-admin-grid">
        ${renderBracketAdminCards(bracket, teams)}
      </div>
    </div>

    <!-- Equipos y Participantes -->
    <div class="broadcast-card" style="margin-top: 1.5rem;">
      <div class="broadcast-top-info">
        <div class="broadcast-title">
          <span>👥</span> GESTIÓN DE LOS 20 EQUIPOS
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 0.75rem;">
        ${teams.map(t => `
          <div style="background: #090d18; border: 1px solid #141c2e; border-radius: 4px; padding: 0.65rem; display: flex; align-items: center; gap: 0.6rem;">
            <div style="width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;">
              ${renderShield(t.shield, t.name)}
            </div>
            <div style="flex: 1; display: flex; flex-direction: column; gap: 0.25rem;">
              <input type="text" class="form-control team-edit-name" data-team-id="${t.id}" value="${escapeHtml(t.name)}" style="padding: 0.25rem 0.5rem; font-size: 0.82rem; font-weight: 800;" />
              <input type="text" class="form-control team-edit-player" data-team-id="${t.id}" value="${escapeHtml(t.player || '')}" placeholder="Jugador" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;" />
            </div>
            <button class="btn-tv btn-tv-secondary btn-save-team" data-team-id="${t.id}" style="padding: 0.4rem 0.6rem; font-size: 0.75rem;">💾</button>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  container.innerHTML = html;
  bindAdminEvents(container);
}

function renderBombosGuide(standings) {
  if (!standings || standings.length < 12) return '';

  const top4 = standings.slice(0, 4);
  const bombo1 = standings.slice(4, 8);
  const bombo2 = standings.slice(8, 12);

  return `
    <div style="background: #080c16; border: 1px solid #192338; border-radius: 6px; padding: 1rem; margin-bottom: 1rem;">
      <div style="font-size: 0.8rem; font-weight: 900; color: #f5c518; text-transform: uppercase; margin-bottom: 0.6rem; display: flex; align-items: center; gap: 0.4rem;">
        <span>🗳️</span> BOMBOS SEGÚN TABLA DE POSICIONES (PARA TU SORTEO IRL)
      </div>
      <p style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.75rem;">
        Hacé el sorteo en vivo con bolilleros o cartas como en la Libertadores. Podés usar los selectores de abajo para colocar a cada equipo en la llave sorteada.
      </p>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.75rem; font-size: 0.75rem;">
        <!-- Top 4 Directos a Cuartos -->
        <div style="background: #0d1610; border-left: 3px solid #00e676; padding: 0.6rem; border-radius: 4px;">
          <div style="font-weight: 900; color: #00e676; margin-bottom: 0.35rem;">TOP 4 (DIRECTO A CUARTOS)</div>
          ${top4.map((s, idx) => `<div>${idx + 1}°. <strong>${escapeHtml(s.team.player || s.team.name)}</strong> (${escapeHtml(s.team.name)})</div>`).join('')}
        </div>

        <!-- Bombo 1 Playoffs (5° al 8°) -->
        <div style="background: #0a1420; border-left: 3px solid #00d2ff; padding: 0.6rem; border-radius: 4px;">
          <div style="font-weight: 900; color: #00d2ff; margin-bottom: 0.35rem;">BOMBO 1 PLAYOFFS (5° AL 8°)</div>
          ${bombo1.map((s, idx) => `<div>${idx + 5}°. <strong>${escapeHtml(s.team.player || s.team.name)}</strong> (${escapeHtml(s.team.name)})</div>`).join('')}
        </div>

        <!-- Bombo 2 Playoffs (9° al 12°) -->
        <div style="background: #141026; border-left: 3px solid #c084fc; padding: 0.6rem; border-radius: 4px;">
          <div style="font-weight: 900; color: #c084fc; margin-bottom: 0.35rem;">BOMBO 2 PLAYOFFS (9° AL 12°)</div>
          ${bombo2.map((s, idx) => `<div>${idx + 9}°. <strong>${escapeHtml(s.team.player || s.team.name)}</strong> (${escapeHtml(s.team.name)})</div>`).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderAdminMatchBar(m, teamsMap) {
  const home = teamsMap.get(m.homeTeamId) || { name: 'Local', player: '', shield: '' };
  const away = teamsMap.get(m.awayTeamId) || { name: 'Visitante', player: '', shield: '' };
  const homeScore = m.homeScore !== null && m.homeScore !== undefined ? m.homeScore : 0;
  const awayScore = m.awayScore !== null && m.awayScore !== undefined ? m.awayScore : 0;

  return `
    <div class="admin-match-box-tv" data-match-id="${m.id}">
      <div style="font-size: 0.72rem; color: var(--text-dim); font-weight: 800; display: flex; justify-content: space-between;">
        <span>${m.turn || 'PARTIDO'}</span>
        <span style="color: #fff;">${escapeHtml(home.player || home.name)} vs ${escapeHtml(away.player || away.name)}</span>
      </div>

      <!-- Local -->
      <div class="admin-team-row-tv">
        <div class="admin-team-details">
          <div style="width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;">
            ${renderShield(home.shield, home.name)}
          </div>
          <div>
            <div class="admin-player-heading">${escapeHtml(home.player || home.name)}</div>
            <div class="admin-team-heading">${escapeHtml(home.name)}</div>
          </div>
        </div>

        <div class="admin-stepper-tv">
          <button class="step-btn-tv btn-score-dec" data-target="home">-</button>
          <input type="number" class="step-input-tv input-score-home" value="${homeScore}" min="0" max="99" />
          <button class="step-btn-tv btn-score-inc" data-target="home">+</button>
        </div>
      </div>

      <!-- Away -->
      <div class="admin-team-row-tv">
        <div class="admin-team-details">
          <div style="width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;">
            ${renderShield(away.shield, away.name)}
          </div>
          <div>
            <div class="admin-player-heading">${escapeHtml(away.player || away.name)}</div>
            <div class="admin-team-heading">${escapeHtml(away.name)}</div>
          </div>
        </div>

        <div class="admin-stepper-tv">
          <button class="step-btn-tv btn-score-dec" data-target="away">-</button>
          <input type="number" class="step-input-tv input-score-away" value="${awayScore}" min="0" max="99" />
          <button class="step-btn-tv btn-score-inc" data-target="away">+</button>
        </div>
      </div>

      <!-- Footer Actions -->
      <div class="admin-card-actions-tv">
        <div style="display: flex; align-items: center; gap: 0.4rem;">
          <label style="font-size: 0.72rem; color: var(--text-muted); font-weight: 800;">ESTADO:</label>
          <select class="select-tv select-match-status">
            <option value="upcoming" ${m.status === 'upcoming' ? 'selected' : ''}>Por Jugar</option>
            <option value="live" ${m.status === 'live' ? 'selected' : ''}>En Vivo</option>
            <option value="finished" ${m.status === 'finished' ? 'selected' : ''}>Finalizado</option>
          </select>
        </div>

        <button class="btn-tv btn-tv-primary btn-save-match" style="padding: 0.35rem 0.85rem; font-size: 0.75rem;">
          💾 GUARDAR
        </button>
      </div>

    </div>
  `;
}

function renderBracketAdminCards(bracket, allTeams) {
  if (!bracket) return '';
  let html = '';

  const stages = [
    { key: 'playoffs', title: 'Playoffs (5°-12°)' },
    { key: 'quarterfinals', title: 'Cuartos de Final' },
    { key: 'semifinals', title: 'Semifinal' }
  ];

  const buildTeamOptions = (selectedId) => {
    let opts = `<option value="">-- Seleccionar Equipo (Sorteo) --</option>`;
    (allTeams || []).forEach(t => {
      const isSel = selectedId === t.id ? 'selected' : '';
      opts += `<option value="${t.id}" ${isSel}>${escapeHtml(t.player || t.name)} (${escapeHtml(t.name)})</option>`;
    });
    return opts;
  };

  // 1. Standard stages (Playoffs, Quarterfinals, Semifinals)
  stages.forEach(stage => {
    (bracket[stage.key] || []).forEach(m => {
      const t1 = m.team1 || { name: 'Por definir', player: '', shield: '' };
      const t2 = m.team2 || { name: 'Por definir', player: '', shield: '' };
      html += `
        <div class="admin-match-box-tv" data-stage="${stage.key}" data-bracket-id="${m.id}">
          <div style="font-size: 0.75rem; color: #00d2ff; font-weight: 800; text-transform: uppercase;">
            ${escapeHtml(m.label || stage.title)}
          </div>

          <!-- Team 1 Select & Score -->
          <div style="display: flex; flex-direction: column; gap: 0.25rem;">
            <label style="font-size: 0.68rem; color: var(--text-dim); font-weight: 800;">EQUIPO 1 (SORTEO IRL):</label>
            <div style="display: flex; gap: 0.4rem; align-items: center;">
              <select class="select-tv b-team1-select" style="flex: 1;">
                ${buildTeamOptions(m.team1?.id)}
              </select>
              <input type="number" class="step-input-tv b-score1" value="${m.score1 ?? ''}" placeholder="0" />
            </div>
          </div>

          <!-- Team 2 Select & Score -->
          <div style="display: flex; flex-direction: column; gap: 0.25rem;">
            <label style="font-size: 0.68rem; color: var(--text-dim); font-weight: 800;">EQUIPO 2 (SORTEO IRL):</label>
            <div style="display: flex; gap: 0.4rem; align-items: center;">
              <select class="select-tv b-team2-select" style="flex: 1;">
                ${buildTeamOptions(m.team2?.id)}
              </select>
              <input type="number" class="step-input-tv b-score2" value="${m.score2 ?? ''}" placeholder="0" />
            </div>
          </div>

          <!-- Winner Selector & Save -->
          <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 0.4rem; border-top: 1px solid #141c2e;">
            <select class="select-tv b-winner-select">
              <option value="">Ganador del Cruce...</option>
              ${m.team1 ? `<option value="1" ${m.winner?.id === m.team1.id ? 'selected' : ''}>${escapeHtml(m.team1.player || m.team1.name)}</option>` : ''}
              ${m.team2 ? `<option value="2" ${m.winner?.id === m.team2.id ? 'selected' : ''}>${escapeHtml(m.team2.player || m.team2.name)}</option>` : ''}
            </select>
            <button class="btn-tv btn-tv-primary btn-save-bracket-match" style="padding: 0.35rem 0.8rem; font-size: 0.75rem;">💾 Guardar</button>
          </div>
        </div>
      `;
    });
  });

  // 2. Tercer Puesto (3° y 4° Puesto)
  if (bracket.thirdPlace) {
    const tp = bracket.thirdPlace;
    html += `
      <div class="admin-match-box-tv" data-stage="thirdPlace" data-bracket-id="${tp.id}" style="border: 1px solid #cd7f32; background: #130f0a;">
        <div style="font-size: 0.8rem; color: #e59866; font-weight: 900; text-transform: uppercase;">
          🥉 PARTIDO 3° Y 4° PUESTO
        </div>
        <p style="font-size: 0.68rem; color: var(--text-muted); margin: 0;">Se define entre los 2 perdedores de semifinales.</p>

        <!-- Team 1 -->
        <div style="display: flex; flex-direction: column; gap: 0.25rem;">
          <div style="display: flex; gap: 0.4rem; align-items: center;">
            <select class="select-tv b-team1-select" style="flex: 1;">
              ${buildTeamOptions(tp.team1?.id)}
            </select>
            <input type="number" class="step-input-tv b-score1" value="${tp.score1 ?? ''}" placeholder="0" />
          </div>
        </div>

        <!-- Team 2 -->
        <div style="display: flex; flex-direction: column; gap: 0.25rem;">
          <div style="display: flex; gap: 0.4rem; align-items: center;">
            <select class="select-tv b-team2-select" style="flex: 1;">
              ${buildTeamOptions(tp.team2?.id)}
            </select>
            <input type="number" class="step-input-tv b-score2" value="${tp.score2 ?? ''}" placeholder="0" />
          </div>
        </div>

        <!-- Winner -->
        <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 0.4rem; border-top: 1px solid #281d12;">
          <select class="select-tv b-winner-select">
            <option value="">Ganador 3° Puesto 🥉...</option>
            ${tp.team1 ? `<option value="1" ${tp.winner?.id === tp.team1.id ? 'selected' : ''}>${escapeHtml(tp.team1.player || tp.team1.name)}</option>` : ''}
            ${tp.team2 ? `<option value="2" ${tp.winner?.id === tp.team2.id ? 'selected' : ''}>${escapeHtml(tp.team2.player || tp.team2.name)}</option>` : ''}
          </select>
          <button class="btn-tv btn-tv-accent btn-save-bracket-match" style="padding: 0.35rem 0.8rem; font-size: 0.75rem;">💾 Guardar 3° Puesto</button>
        </div>
      </div>
    `;
  }

  // 3. Gran Final (1° y 2° Puesto)
  if (bracket.final) {
    const f = bracket.final;
    html += `
      <div class="admin-match-box-tv" data-stage="final" data-bracket-id="${f.id}" style="border: 1px solid #f5c518; background: #161208;">
        <div style="font-size: 0.85rem; color: #f5c518; font-weight: 900; text-transform: uppercase;">
          🏆 GRAN FINAL (CAMPEÓN & SUBCAMPEÓN)
        </div>
        <p style="font-size: 0.68rem; color: var(--text-muted); margin: 0;">Se define entre los 2 ganadores de semifinales.</p>

        <!-- Team 1 -->
        <div style="display: flex; flex-direction: column; gap: 0.25rem;">
          <div style="display: flex; gap: 0.4rem; align-items: center;">
            <select class="select-tv b-team1-select" style="flex: 1;">
              ${buildTeamOptions(f.team1?.id)}
            </select>
            <input type="number" class="step-input-tv b-score1" value="${f.score1 ?? ''}" placeholder="0" />
          </div>
        </div>

        <!-- Team 2 -->
        <div style="display: flex; flex-direction: column; gap: 0.25rem;">
          <div style="display: flex; gap: 0.4rem; align-items: center;">
            <select class="select-tv b-team2-select" style="flex: 1;">
              ${buildTeamOptions(f.team2?.id)}
            </select>
            <input type="number" class="step-input-tv b-score2" value="${f.score2 ?? ''}" placeholder="0" />
          </div>
        </div>

        <!-- Winner -->
        <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 0.4rem; border-top: 1px solid #28200d;">
          <select class="select-tv b-winner-select">
            <option value="">Campeón 🏆...</option>
            ${f.team1 ? `<option value="1" ${f.winner?.id === f.team1.id ? 'selected' : ''}>${escapeHtml(f.team1.player || f.team1.name)}</option>` : ''}
            ${f.team2 ? `<option value="2" ${f.winner?.id === f.team2.id ? 'selected' : ''}>${escapeHtml(f.team2.player || f.team2.name)}</option>` : ''}
          </select>
          <button class="btn-tv btn-tv-accent btn-save-bracket-match" style="padding: 0.35rem 0.8rem; font-size: 0.75rem;">💾 Guardar Final</button>
        </div>
      </div>
    `;
  }

  return html;
}

function bindAdminEvents(container) {
  // Fecha Switcher
  container.querySelectorAll('.fecha-tab-btn[data-admin-day]').forEach(btn => {
    btn.addEventListener('click', () => {
      const day = btn.getAttribute('data-admin-day');
      store.setMatchday(day);
      renderAdmin(container);
    });
  });

  // Score Step Increment/Decrement
  container.querySelectorAll('.btn-score-inc, .btn-score-dec').forEach(btn => {
    btn.addEventListener('click', () => {
      const isInc = btn.classList.contains('btn-score-inc');
      const target = btn.getAttribute('data-target');
      const card = btn.closest('.admin-match-box-tv');
      const input = card.querySelector(target === 'home' ? '.input-score-home' : '.input-score-away');
      let val = parseInt(input.value, 10) || 0;
      if (isInc) val++;
      else if (val > 0) val--;
      input.value = val;
    });
  });

  // Save Match Score
  container.querySelectorAll('.btn-save-match').forEach(btn => {
    btn.addEventListener('click', async () => {
      const card = btn.closest('.admin-match-box-tv');
      const matchId = card.getAttribute('data-match-id');
      const homeScore = parseInt(card.querySelector('.input-score-home').value, 10);
      const awayScore = parseInt(card.querySelector('.input-score-away').value, 10);
      const status = card.querySelector('.select-match-status').value;

      await store.updateMatch(matchId, {
        homeScore: isNaN(homeScore) ? null : homeScore,
        awayScore: isNaN(awayScore) ? null : awayScore,
        status: status
      });

      showToast('Partido guardado', 'success');
    });
  });

  // Save Bracket Match (with custom teams & scores)
  container.querySelectorAll('.btn-save-bracket-match').forEach(btn => {
    btn.addEventListener('click', async () => {
      const card = btn.closest('.admin-match-box-tv');
      const stage = card.getAttribute('data-stage');
      const matchId = card.getAttribute('data-bracket-id');
      const t1Id = card.querySelector('.b-team1-select')?.value || null;
      const t2Id = card.querySelector('.b-team2-select')?.value || null;
      const s1 = parseInt(card.querySelector('.b-score1').value, 10);
      const s2 = parseInt(card.querySelector('.b-score2').value, 10);
      const winnerVal = card.querySelector('.b-winner-select').value;

      // Update teams if specified
      await store.setBracketMatchTeams(stage, matchId, t1Id, t2Id);

      let matchObj = null;
      if (stage === 'final') matchObj = store.state.bracket.final;
      else if (stage === 'thirdPlace') matchObj = store.state.bracket.thirdPlace;
      else matchObj = (store.state.bracket[stage] || []).find(m => m.id === matchId);

      let winner = null;
      if (winnerVal === '1' && matchObj?.team1) winner = matchObj.team1;
      if (winnerVal === '2' && matchObj?.team2) winner = matchObj.team2;

      await store.updateBracketMatch(stage, matchId, {
        score1: isNaN(s1) ? null : s1,
        score2: isNaN(s2) ? null : s2,
        winner: winner,
        status: winner ? 'finished' : 'upcoming'
      });

      renderAdmin(container);
      showToast('Cruce y resultado actualizados correctamente', 'success');
    });
  });

  // Quick Seed Fecha 1
  const seedF1Btn = container.querySelector('#btn-seed-f1');
  if (seedF1Btn) {
    seedF1Btn.addEventListener('click', async () => {
      await store.seedFecha1Results();
      renderAdmin(container);
      showToast('Resultados de Fecha 1 cargados para los 20 equipos', 'success');
    });
  }

  // Quick Seed All Tournament
  const seedAllBtn = container.querySelector('#btn-seed-all');
  if (seedAllBtn) {
    seedAllBtn.addEventListener('click', async () => {
      await store.seedAllTournamentResults();
      renderAdmin(container);
      showToast('Torneo completo simulado (40 partidos)', 'success');
    });
  }

  // Quick Reset All
  const resetAllBtn = container.querySelector('#btn-reset-all');
  if (resetAllBtn) {
    resetAllBtn.addEventListener('click', async () => {
      if (confirm('¿Estás seguro de que querés reiniciar todos los resultados a cero?')) {
        await store.resetAllResults();
        renderAdmin(container);
        showToast('Todos los resultados fueron reiniciados', 'info');
      }
    });
  }

  // Sync Bracket
  const syncBtn = container.querySelector('#btn-sync-bracket');
  const syncBtn2 = container.querySelector('#btn-sync-bracket-2');
  const handleSync = async () => {
    await store.syncBracketFromStandings();
    renderAdmin(container);
    showToast('Playoffs sincronizados', 'info');
  };
  if (syncBtn) syncBtn.addEventListener('click', handleSync);
  if (syncBtn2) syncBtn2.addEventListener('click', handleSync);

  // Save Team Info
  container.querySelectorAll('.btn-save-team').forEach(btn => {
    btn.addEventListener('click', async () => {
      const teamId = btn.getAttribute('data-team-id');
      const parent = btn.parentElement;
      const name = parent.querySelector('.team-edit-name').value;
      const player = parent.querySelector('.team-edit-player').value;

      await store.updateTeam(teamId, { name, player });
      showToast('Equipo guardado', 'success');
    });
  });

  // Export JSON
  const expBtn = container.querySelector('#btn-export-json');
  if (expBtn) {
    expBtn.addEventListener('click', () => {
      dbService.exportJSON(store.state);
      showToast('Archivo de respaldo descargado', 'info');
    });
  }

  // Import JSON
  const impInput = container.querySelector('#input-import-json');
  if (impInput) {
    impInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (file) {
        try {
          await dbService.importJSON(file);
          await store.init();
          renderAdmin(container);
          showToast('Datos importados con éxito', 'success');
        } catch (err) {
          showToast(err.message, 'error');
        }
      }
    });
  }

  // Firebase Config Modal Trigger
  const fbBtn = container.querySelector('#btn-firebase-modal');
  if (fbBtn) {
    fbBtn.addEventListener('click', () => {
      const modal = document.getElementById('firebase-modal');
      if (modal) modal.classList.add('active');
    });
  }

  // Logout
  const logoutBtn = container.querySelector('#btn-admin-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      store.logoutAdmin();
      showToast('Sesión cerrada', 'info');
    });
  }
}

function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
    <span>${escapeHtml(message)}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}



  // ===================================================
  // MODULE: js/ui/participantDetail.js
  // ===================================================

/**
 * Participant Detail & Head-to-Head Match Center UI Component
 * Muestra el perfil completo del jugador/equipo en la edición actual:
 * Puntos en juego, goles a favor/en contra, enfrentamientos directos y antecedentes.
 */



let activeMatchFilter = 'all'; // 'all' | 'finished' | 'pending'

function renderParticipantDetail(container, teamId, onBack) {
  if (!container) return;

  const { teams, matches } = store.state;
  const currentTeamId = teamId || store.state.selectedParticipantId || (teams[0] ? teams[0].id : null);
  const team = teams.find(t => t.id === currentTeamId) || teams[0];

  if (!team) {
    container.innerHTML = `<div class="broadcast-card"><p>No se encontró el participante.</p></div>`;
    return;
  }

  // 1. Obtener posición y estadísticas desde la tabla oficial
  const standings = store.getStandings();
  const rankIndex = standings.findIndex(e => e.team.id === team.id);
  const rank = rankIndex !== -1 ? rankIndex + 1 : '-';
  const entry = standings[rankIndex] || { pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, dg: 0, pts: 0, form: [] };

  // 2. Partidos y enfrentamientos del equipo en Cufa's Cup II
  const teamMatches = matches.filter(m => m.homeTeamId === team.id || m.awayTeamId === team.id);
  const finishedMatches = teamMatches.filter(m => m.status === 'finished' && m.homeScore !== null && m.awayScore !== null);
  const pendingMatches = teamMatches.filter(m => m.status !== 'finished' || m.homeScore === null);

  // 3. Cálculos de Puntos en Juego
  const ptsObtained = entry.pts;
  const ptsInPlayRemaining = pendingMatches.length * 3;
  const maxPossiblePts = ptsObtained + ptsInPlayRemaining;
  const effectiveness = entry.pj > 0 ? Math.round((entry.pts / (entry.pj * 3)) * 100) : 0;
  const avgGf = entry.pj > 0 ? (entry.gf / entry.pj).toFixed(1) : '0.0';
  const avgGc = entry.pj > 0 ? (entry.gc / entry.pj).toFixed(1) : '0.0';

  // 4. Zona clasificatoria
  let zoneLabel = 'ZONA DE ELIMINACIÓN (13° AL 20°)';
  let zoneColor = '#ef4444';
  let zoneDesc = 'Fuera de zona de clasificación a playoffs al término de la fase de liga.';
  if (rank <= 4) {
    zoneLabel = 'ZONA CUARTOS DIRECTO (1° AL 4°)';
    zoneColor = '#f5c518';
    zoneDesc = 'Clasifica directamente a Cuartos de Final.';
  } else if (rank <= 12) {
    zoneLabel = 'ZONA DE PLAYOFFS (5° AL 12°)';
    zoneColor = '#00d2ff';
    zoneDesc = 'Disputa ronda previa de Playoffs clasificatorios.';
  }

  // Helper para buscar antecedente en la Edición 2025
  const find2025Antecedent = (player1, player2) => {
    if (!player1 || !player2) return null;
    const p1 = player1.toLowerCase().trim();
    const p2 = player2.toLowerCase().trim();

    // Buscar en partidos de fase de grupos 2025
    const gm = EDITION_2025_DATA.groupMatches.find(m => {
      const hp = (m.homePlayer || '').toLowerCase().trim();
      const ap = (m.awayPlayer || '').toLowerCase().trim();
      return (hp === p1 && ap === p2) || (hp === p2 && ap === p1);
    });

    if (gm) {
      return `Edición 2025 (Fase de Grupos): ${gm.homePlayer} (${gm.homeScore}) vs ${gm.awayPlayer} (${gm.awayScore})`;
    }

    // Buscar en playoffs 2025
    const po = EDITION_2025_DATA.playoffs;
    if (po) {
      const allPoMatches = [
        ...(po.quarterfinals || []),
        ...(po.semifinals || []),
        po.final,
        po.thirdPlace
      ].filter(Boolean);

      const pom = allPoMatches.find(m => {
        const hp = (m.homePlayer || '').toLowerCase().trim();
        const ap = (m.awayPlayer || '').toLowerCase().trim();
        return (hp === p1 && ap === p2) || (hp === p2 && ap === p1);
      });

      if (pom) {
        return `Edición 2025 (${pom.phase || 'Playoffs'}): ${pom.homePlayer} (${pom.homeScore}) vs ${pom.awayPlayer} (${pom.awayScore})`;
      }
    }

    return null;
  };

  // Filtrar partidos a mostrar
  let displayedMatches = teamMatches;
  if (activeMatchFilter === 'finished') {
    displayedMatches = finishedMatches;
  } else if (activeMatchFilter === 'pending') {
    displayedMatches = pendingMatches;
  }

  // Ordenar partidos por fecha
  displayedMatches.sort((a, b) => Number(a.matchday) - Number(b.matchday));

  // Índice para navegación anterior/siguiente
  const currentTeamIndex = teams.findIndex(t => t.id === team.id);
  const prevTeam = teams[(currentTeamIndex - 1 + teams.length) % teams.length];
  const nextTeam = teams[(currentTeamIndex + 1) % teams.length];

  container.innerHTML = `
    <!-- Top Action Bar -->
    <div class="participant-top-bar">
      <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
        <button class="btn-tv btn-tv-secondary" id="btn-back-to-table" title="Volver a Equipos & Tabla">
          ⬅ VOLVER A EQUIPOS Y TABLA
        </button>
        <div style="display: flex; align-items: center; gap: 0.4rem;">
          <button class="btn-tv btn-tv-secondary" id="btn-prev-p" title="Ver participante anterior: ${prevTeam.player} (${prevTeam.name})">
            ◀ ${prevTeam.player}
          </button>
          <button class="btn-tv btn-tv-secondary" id="btn-next-p" title="Ver siguiente participante: ${nextTeam.player} (${nextTeam.name})">
            ${nextTeam.player} ▶
          </button>
        </div>
      </div>

      <!-- Quick Switcher Dropdown -->
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <span style="font-size: 0.78rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Cambiar Ficha:</span>
        <select class="select-tv" id="participant-select-switcher" style="padding: 0.4rem 0.8rem; font-weight: 700;">
          ${teams.map(t => `
            <option value="${t.id}" ${t.id === team.id ? 'selected' : ''}>
              ${t.player} (${t.name})
            </option>
          `).join('')}
        </select>
      </div>
    </div>

    <!-- Hero Card of the Participant -->
    <div class="participant-hero-card">
      <div class="participant-hero-left">
        <div class="participant-hero-shield-wrap">
          ${renderShield(team.shield, team.name)}
        </div>
        <div class="participant-hero-titles">
          <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
            <span class="badge-corner ${team.type === 'Club' ? 'club' : 'seleccion'}" style="position: static;">
              ${team.type === 'Club' ? '★ CLUB' : '★ SELECCIÓN'}
            </span>
            <span class="participant-zone-pill" style="border-color: ${zoneColor}; color: ${zoneColor}; background: rgba(0,0,0,0.4);">
              ● ${zoneLabel}
            </span>
          </div>
          <h2 class="participant-hero-player">🎮 ${escapeHtml(team.player || 'Sin Asignar')}</h2>
          <div class="participant-hero-team">${escapeHtml(team.name)}</div>
          <p class="participant-zone-desc" style="color: var(--text-muted); font-size: 0.82rem; margin-top: 0.4rem;">
            ${zoneDesc}
          </p>
        </div>
      </div>

      <div class="participant-hero-rank-box">
        <div class="participant-rank-label">POSICIÓN ACTUAL</div>
        <div class="participant-rank-number" style="color: ${zoneColor};">#${rank}</div>
        <div class="participant-rank-sub">de 20 Equipos</div>
      </div>
    </div>

    <!-- KPI Metric Cards Grid -->
    <div class="participant-kpi-grid">
      <!-- 1. PUNTOS EN JUEGO & TECHO -->
      <div class="participant-kpi-card" style="border-top: 3px solid #f5c518;">
        <div class="kpi-header">
          <span class="kpi-icon">🎯</span>
          <span class="kpi-title">PUNTOS EN JUEGO</span>
        </div>
        <div class="kpi-main-val" style="color: #f5c518;">
          ${ptsObtained} <span style="font-size: 1.1rem; color: #fff;">PTS</span>
        </div>
        <div class="kpi-sub-info">
          <div class="kpi-row">
            <span>En juego restantes:</span>
            <strong style="color: #00e5ff;">+${ptsInPlayRemaining} PTS</strong>
          </div>
          <div class="kpi-row">
            <span>Partidos pendientes:</span>
            <strong>${pendingMatches.length} de ${teamMatches.length}</strong>
          </div>
          <div class="kpi-row" style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 0.35rem; margin-top: 0.35rem;">
            <span>Techo Máximo Posible:</span>
            <strong style="color: #00e676;">${maxPossiblePts} PTS</strong>
          </div>
        </div>
      </div>

      <!-- 2. BALANCE DE GOLES -->
      <div class="participant-kpi-card" style="border-top: 3px solid #00e5ff;">
        <div class="kpi-header">
          <span class="kpi-icon">⚽</span>
          <span class="kpi-title">GOLES Y DIFERENCIA</span>
        </div>
        <div class="kpi-main-val" style="color: #00e5ff;">
          ${entry.dg > 0 ? '+' : ''}${entry.dg} <span style="font-size: 1.1rem; color: #fff;">DG</span>
        </div>
        <div class="kpi-sub-info">
          <div class="kpi-row">
            <span>Goles a Favor (GF):</span>
            <strong style="color: #00e676;">${entry.gf}</strong>
          </div>
          <div class="kpi-row">
            <span>Goles en Contra (GC):</span>
            <strong style="color: #ef4444;">${entry.gc}</strong>
          </div>
          <div class="kpi-row" style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 0.35rem; margin-top: 0.35rem;">
            <span>Promedio GF / PJ:</span>
            <strong style="color: #fff;">${avgGf}</strong>
          </div>
        </div>
      </div>

      <!-- 3. EFICACIA & PARTIDOS -->
      <div class="participant-kpi-card" style="border-top: 3px solid #a855f7;">
        <div class="kpi-header">
          <span class="kpi-icon">📊</span>
          <span class="kpi-title">BALANCE DE PARTIDOS</span>
        </div>
        <div class="kpi-main-val" style="color: #a855f7;">
          ${entry.pj} <span style="font-size: 1.1rem; color: #fff;">PJ</span>
        </div>
        <div class="kpi-sub-info">
          <div class="kpi-row">
            <span>Victorias (PG):</span>
            <strong style="color: #00e676;">${entry.pg}</strong>
          </div>
          <div class="kpi-row">
            <span>Empates (PE):</span>
            <strong style="color: #f5c518;">${entry.pe}</strong>
          </div>
          <div class="kpi-row">
            <span>Derrotas (PP):</span>
            <strong style="color: #ef4444;">${entry.pp}</strong>
          </div>
          <div class="kpi-row" style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 0.35rem; margin-top: 0.35rem;">
            <span>Eficacia de Puntos:</span>
            <strong style="color: #38bdf8;">${effectiveness}%</strong>
          </div>
        </div>
      </div>

      <!-- 4. FORMA Y RACHA -->
      <div class="participant-kpi-card" style="border-top: 3px solid #00e676;">
        <div class="kpi-header">
          <span class="kpi-icon">🔥</span>
          <span class="kpi-title">ESTADO Y FORMA</span>
        </div>
        <div class="kpi-main-val" style="font-size: 1.5rem; display: flex; gap: 6px; align-items: center;">
          ${entry.form && entry.form.length > 0 
            ? entry.form.map(f => `<span class="streak-dot streak-${f.toLowerCase()}" style="width: 32px; height: 32px; font-size: 0.95rem;">${f}</span>`).join('')
            : '<span style="color: var(--text-muted); font-size: 1.1rem;">Sin partidos jugados</span>'
          }
        </div>
        <div class="kpi-sub-info" style="margin-top: 0.8rem;">
          <div class="kpi-row">
            <span>Racha Actual:</span>
            <strong style="color: #fff;">
              ${entry.pp === 0 && entry.pj > 0 ? '🟢 Invicto en el torneo' : entry.pg > 0 ? 'En competencia' : 'Buscando sumar'}
            </strong>
          </div>
          <div class="kpi-row">
            <span>Fase:</span>
            <strong style="color: var(--accent-gold);">Fase Liga (19 Equipos)</strong>
          </div>
        </div>
      </div>
    </div>

    <!-- Match Center / Enfrentamientos Directos Section -->
    <div class="broadcast-card" style="margin-top: 1.5rem; padding: 1.5rem 1rem;">
      <div class="broadcast-top-info" style="margin-bottom: 1.25rem;">
        <div class="broadcast-title">
          <span>⚔️</span> ENFRENTAMIENTOS DIRECTOS DE ${escapeHtml((team.player || team.name).toUpperCase())}
        </div>
        
        <!-- Filter Tabs -->
        <div class="nav-tabs" style="margin: 0;">
          <button class="nav-btn ${activeMatchFilter === 'all' ? 'active' : ''}" data-mfilter="all">
            TODOS (${teamMatches.length})
          </button>
          <button class="nav-btn ${activeMatchFilter === 'finished' ? 'active' : ''}" data-mfilter="finished">
            JUGADOS (${finishedMatches.length})
          </button>
          <button class="nav-btn ${activeMatchFilter === 'pending' ? 'active' : ''}" data-mfilter="pending">
            PENDIENTES (${pendingMatches.length})
          </button>
        </div>
      </div>

      <!-- Match Cards Grid -->
      <div class="participant-matches-list">
        ${displayedMatches.length === 0 ? `
          <div style="text-align: center; padding: 2.5rem; color: var(--text-muted);">
            No hay enfrentamientos en esta categoría.
          </div>
        ` : displayedMatches.map(m => {
          const isHome = m.homeTeamId === team.id;
          const rivalId = isHome ? m.awayTeamId : m.homeTeamId;
          const rival = teams.find(t => t.id === rivalId) || { name: 'Rival', player: 'Desconocido', shield: '⚽' };

          const myScore = isHome ? m.homeScore : m.awayScore;
          const rivalScore = isHome ? m.awayScore : m.homeScore;
          const isFinished = m.status === 'finished' && myScore !== null && rivalScore !== null;

          let resultPillHtml = '';
          if (isFinished) {
            if (myScore > rivalScore) {
              resultPillHtml = `<span class="match-res-badge badge-win">VICTORIA (+3 PTS)</span>`;
            } else if (myScore < rivalScore) {
              resultPillHtml = `<span class="match-res-badge badge-loss">DERROTA (0 PTS)</span>`;
            } else {
              resultPillHtml = `<span class="match-res-badge badge-draw">EMPATE (+1 PTO)</span>`;
            }
          } else {
            resultPillHtml = `<span class="match-res-badge badge-pending">⏳ 3 PUNTOS EN JUEGO</span>`;
          }

          // Buscar antecedente histórico 2025 entre los dos jugadores
          const antecedent = find2025Antecedent(team.player, rival.player);

          return `
            <div class="participant-match-card ${isFinished ? 'match-finished' : 'match-scheduled'}">
              <div class="pm-top-bar">
                <div class="pm-date-badge">
                  <span>FECHA ${m.matchday}</span>
                  <span style="opacity: 0.5;">•</span>
                  <span>${m.console || 'Consola Oficial'}</span>
                  ${m.turn ? `<span style="opacity: 0.5;">•</span> <span>${m.turn}</span>` : ''}
                </div>
                <div>${resultPillHtml}</div>
              </div>

              <div class="pm-main-grid">
                <!-- Local -->
                <div class="pm-team-side ${isHome ? 'is-me' : ''}">
                  <div class="pm-shield-box">${renderShield(isHome ? team.shield : rival.shield, isHome ? team.name : rival.name)}</div>
                  <div class="pm-team-info">
                    <div class="pm-player-name">${escapeHtml(isHome ? team.player : rival.player)}</div>
                    <div class="pm-team-name">${escapeHtml(isHome ? team.name : rival.name)} ${isHome ? '<span class="badge-role">(LOCAL)</span>' : ''}</div>
                  </div>
                </div>

                <!-- Score Box -->
                <div class="pm-score-box">
                  ${isFinished ? `
                    <div class="pm-scores">
                      <span class="${isHome && myScore > rivalScore ? 'score-winner' : ''}">${m.homeScore}</span>
                      <span class="pm-score-div">-</span>
                      <span class="${!isHome && myScore > rivalScore ? 'score-winner' : ''}">${m.awayScore}</span>
                    </div>
                    <span class="pm-finished-label">FINAL</span>
                  ` : `
                    <div class="pm-vs-label">VS</div>
                    <span class="pm-pending-label">PENDIENTE</span>
                  `}
                </div>

                <!-- Visitante -->
                <div class="pm-team-side ${!isHome ? 'is-me' : ''}">
                  <div class="pm-shield-box">${renderShield(!isHome ? team.shield : rival.shield, !isHome ? team.name : rival.name)}</div>
                  <div class="pm-team-info">
                    <div class="pm-player-name">${escapeHtml(!isHome ? team.player : rival.player)}</div>
                    <div class="pm-team-name">${escapeHtml(!isHome ? team.name : rival.name)} ${!isHome ? '<span class="badge-role">(VISITANTE)</span>' : ''}</div>
                  </div>
                </div>
              </div>

              <!-- Footer with Head to Head & Rival Navigation -->
              <div class="pm-bottom-bar">
                <div class="pm-antecedent-text">
                  ${antecedent 
                    ? `<span style="color: #f5c518;">📜 Historial 2025:</span> ${antecedent}`
                    : `<span style="color: var(--text-dim);">★ Primer cruce en la historia del torneo</span>`
                  }
                </div>
                <button class="btn-switch-rival btn-tv btn-tv-secondary" data-rival-id="${rival.id}" title="Ver ficha de ${rival.player}">
                  Ver Ficha de ${escapeHtml(rival.player)} ➔
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  // Wire Event Listeners
  container.querySelector('#btn-back-to-table')?.addEventListener('click', onBack);

  // Switcher dropdown
  container.querySelector('#participant-select-switcher')?.addEventListener('change', (e) => {
    store.selectParticipant(e.target.value);
  });

  // Prev / Next buttons
  container.querySelector('#btn-prev-p')?.addEventListener('click', () => {
    store.selectParticipant(prevTeam.id);
  });

  container.querySelector('#btn-next-p')?.addEventListener('click', () => {
    store.selectParticipant(nextTeam.id);
  });

  // Filter tabs
  container.querySelectorAll('[data-mfilter]').forEach(btn => {
    btn.addEventListener('click', () => {
      activeMatchFilter = btn.getAttribute('data-mfilter');
      renderParticipantDetail(container, team.id, onBack);
    });
  });

  // Rival quick jump buttons
  container.querySelectorAll('.btn-switch-rival').forEach(btn => {
    btn.addEventListener('click', () => {
      const rivalId = btn.getAttribute('data-rival-id');
      if (rivalId) {
        store.selectParticipant(rivalId);
      }
    });
  });
}


  // ===================================================
  // MODULE: js/app.js
  // ===================================================

/**
 * Application Entry Point & Controller (Multi-edition Portal)
 */










document.addEventListener('DOMContentLoaded', async () => {
  // Elements - Portals
  const hubContainer = document.getElementById('view-hub');
  const edition2025Container = document.getElementById('view-edition-2025');
  const edition2026Container = document.getElementById('view-edition-2026');
  const rankingContainer = document.getElementById('view-ranking');

  // Elements - 2026 Subviews
  const standingsContainer = document.getElementById('view-standings');
  const fixturesContainer = document.getElementById('view-fixtures');
  const bracketContainer = document.getElementById('view-bracket');
  const adminContainer = document.getElementById('view-admin');
  const participantContainer = document.getElementById('view-participant');

  const searchInput = document.getElementById('global-search-player');
  const syncStatusBox = document.getElementById('sync-status-box');
  const syncStatusText = document.getElementById('sync-text');

  // Elements - Header Contextual Subnavs
  const headerTabs2026 = document.getElementById('header-tabs-2026');
  const headerTabs2025 = document.getElementById('header-tabs-2025');
  const headerTitleRanking = document.getElementById('header-title-ranking');
  const headerTitleHub = document.getElementById('header-title-hub');
  const headerPortalLabel = document.getElementById('header-portal-label');

  // Elements - Left Drawer Navigation
  const drawer = document.getElementById('portal-drawer');
  const drawerBackdrop = document.getElementById('portal-drawer-backdrop');
  const btnDrawerToggle = document.getElementById('btn-portal-drawer-toggle');
  const btnDrawerClose = document.getElementById('btn-close-drawer');
  const drawerDbStatus = document.getElementById('drawer-db-status');

  const openDrawer = () => {
    if (drawer) {
      drawer.classList.add('active');
      drawer.setAttribute('aria-hidden', 'false');
    }
    if (drawerBackdrop) drawerBackdrop.classList.add('active');
  };

  const closeDrawer = () => {
    if (drawer) {
      drawer.classList.remove('active');
      drawer.setAttribute('aria-hidden', 'true');
    }
    if (drawerBackdrop) drawerBackdrop.classList.remove('active');
  };

  btnDrawerToggle?.addEventListener('click', openDrawer);
  btnDrawerClose?.addEventListener('click', closeDrawer);
  drawerBackdrop?.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });

  // Drawer Portal Navigation items
  document.querySelectorAll('#drawer-portal-nav .drawer-nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const portal = btn.getAttribute('data-portal');
      if (portal === 'edition-2027') {
        showToast("⏳ ¡Próxima edición en preparación! Próximamente se revelará el formato y los clasificados.", "info");
        closeDrawer();
        return;
      }
      if (portal) {
        store.setPortal(portal);
        closeDrawer();
      }
    });
  });

  // Monitor DB status changes
  dbService.onStatusChange((status) => {
    if (status === 'synced') {
      if (syncStatusBox) syncStatusBox.style.borderColor = 'rgba(0, 230, 118, 0.5)';
      if (syncStatusText) {
        syncStatusText.innerHTML = '<span style="color: #00e676; font-weight: 800;">● Cloud (Firebase)</span>';
      }
      if (drawerDbStatus) {
        drawerDbStatus.innerHTML = '<span style="color: #00e676; font-weight: 800;">● Conectado (Cloud)</span>';
      }
    } else {
      if (syncStatusBox) syncStatusBox.style.borderColor = '#141c2e';
      if (syncStatusText) {
        syncStatusText.textContent = 'Local (Offline)';
      }
      if (drawerDbStatus) {
        drawerDbStatus.textContent = 'Local (Offline)';
      }
    }
  });

  // Auto-connect official Firebase
  const savedFirebaseConfig = dbService.getSavedFirebaseConfig() || DEFAULT_FIREBASE_CONFIG;
  if (savedFirebaseConfig) {
    await dbService.initFirebase(savedFirebaseConfig);
  }

  // Initialize Store
  await store.init();

  // Subscribe to state updates & Render active views
  store.subscribe((state) => {
    const activePortal = state.activePortal || 'hub';

    // 1. Update Drawer Active Item
    document.querySelectorAll('#drawer-portal-nav .drawer-nav-item').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-portal') === activePortal);
    });

    // 2. Update Header Sub-Navigation (El menú de cada coso arriba que se ve siempre)
    if (headerTabs2026) headerTabs2026.style.display = (activePortal === 'edition-2026') ? 'flex' : 'none';
    if (headerTabs2025) headerTabs2025.style.display = (activePortal === 'edition-2025') ? 'flex' : 'none';
    if (headerTitleRanking) headerTitleRanking.style.display = (activePortal === 'ranking') ? 'flex' : 'none';
    if (headerTitleHub) headerTitleHub.style.display = (activePortal === 'hub') ? 'flex' : 'none';

    if (headerPortalLabel) {
      if (activePortal === 'hub') headerPortalLabel.textContent = 'PORTAL MULTIEDICIÓN';
      if (activePortal === 'edition-2025') headerPortalLabel.textContent = 'EDICIÓN 2025';
      if (activePortal === 'edition-2026') headerPortalLabel.textContent = 'EDICIÓN ACTUAL 2026';
      if (activePortal === 'ranking') headerPortalLabel.textContent = 'RANKING FIFA';
    }

    // Update active subtabs for 2026 in top header
    if (activePortal === 'edition-2026' && headerTabs2026) {
      headerTabs2026.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-tab') === state.activeTab);
      });
    }

    // Update active subtabs for 2025 in top header
    if (activePortal === 'edition-2025' && headerTabs2025) {
      headerTabs2025.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-subtab-25') === (state.active2025Tab || 'playoffs'));
      });
    }

    // 3. Toggle Portal View Sections
    if (hubContainer) hubContainer.classList.toggle('active', activePortal === 'hub');
    if (edition2025Container) edition2025Container.classList.toggle('active', activePortal === 'edition-2025');
    if (edition2026Container) edition2026Container.classList.toggle('active', activePortal === 'edition-2026');
    if (rankingContainer) rankingContainer.classList.toggle('active', activePortal === 'ranking');

    // 4. Render contents depending on active portal
    if (activePortal === 'hub') {
      renderHub(hubContainer, (targetPortal) => store.setPortal(targetPortal));
    } else if (activePortal === 'edition-2025') {
      renderEdition2025(edition2025Container, () => store.setPortal('hub'));
    } else if (activePortal === 'ranking') {
      renderHistoricalRanking(rankingContainer, state, () => store.setPortal('hub'));
    } else if (activePortal === 'edition-2026') {
      // Update top header button active state for 2026
      if (headerTabs2026) {
        headerTabs2026.querySelectorAll('.nav-btn').forEach(btn => {
          const btnTab = btn.getAttribute('data-tab');
          const isActive = (state.activeTab === btnTab) || (state.activeTab === 'participant' && btnTab === 'standings');
          btn.classList.toggle('active', isActive);
        });
      }

      // Toggle 2026 subviews
      const subviews = [
        { el: standingsContainer, tab: 'standings' },
        { el: fixturesContainer, tab: 'fixtures' },
        { el: bracketContainer, tab: 'bracket' },
        { el: adminContainer, tab: 'admin' },
        { el: participantContainer, tab: 'participant' }
      ];

      subviews.forEach(({ el, tab }) => {
        if (el) {
          el.style.display = (state.activeTab === tab) ? 'block' : 'none';
        }
      });

      if (state.activeTab === 'standings') renderStandings(standingsContainer);
      if (state.activeTab === 'fixtures') renderFixtures(fixturesContainer);
      if (state.activeTab === 'bracket') renderBracket(bracketContainer);
      if (state.activeTab === 'admin') renderAdmin(adminContainer);
      if (state.activeTab === 'participant') {
        renderParticipantDetail(participantContainer, state.selectedParticipantId, () => store.setTab('standings'));
      }
    }
  });

  // Top Sticky Contextual Sub-Nav Listeners (2026)
  document.querySelectorAll('#header-tabs-2026 .nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      if (tab) store.setTab(tab);
    });
  });

  // Top Sticky Contextual Sub-Nav Listeners (2025)
  document.querySelectorAll('#header-tabs-2025 .nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const subtab = btn.getAttribute('data-subtab-25');
      if (subtab) store.set2025Tab(subtab);
    });
  });

  // Brand Logo returns to Hub
  document.getElementById('brand-home-link')?.addEventListener('click', () => {
    store.setPortal('hub');
  });

  // Quick Player Search Listener (For Edition 2026)
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      store.setPlayerFilter(e.target.value);
    });
  }

  // Firebase Config Modal Events
  const firebaseModal = document.getElementById('firebase-modal');
  const closeFbModalBtn = document.getElementById('btn-close-firebase-modal');
  const saveFbModalBtn = document.getElementById('btn-save-firebase-config');
  const rawConfigTextarea = document.getElementById('fb-raw-config');

  const parseAndFillConfig = (text) => {
    if (!text) return;
    const extract = (key) => {
      const regex = new RegExp(`${key}["']?\\s*:\\s*["']([^"']+)["']`, 'i');
      const match = text.match(regex);
      return match ? match[1] : '';
    };

    const apiKey = extract('apiKey');
    const authDomain = extract('authDomain');
    const projectId = extract('projectId');
    const storageBucket = extract('storageBucket');
    const appId = extract('appId');
    const databaseURL = extract('databaseURL');

    if (apiKey) document.getElementById('fb-api-key').value = apiKey;
    if (authDomain) document.getElementById('fb-auth-domain').value = authDomain;
    if (projectId) document.getElementById('fb-project-id').value = projectId;
    if (storageBucket) document.getElementById('fb-storage-bucket').value = storageBucket;
    if (appId) document.getElementById('fb-app-id').value = appId;
    if (databaseURL) window.__fb_database_url = databaseURL;
  };

  if (rawConfigTextarea) {
    rawConfigTextarea.addEventListener('input', (e) => {
      parseAndFillConfig(e.target.value);
    });
  }

  const openModalBtns = document.querySelectorAll('#btn-firebase-modal');
  openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cfg = dbService.getSavedFirebaseConfig() || DEFAULT_FIREBASE_CONFIG;
      if (cfg) {
        document.getElementById('fb-api-key').value = cfg.apiKey || '';
        document.getElementById('fb-auth-domain').value = cfg.authDomain || '';
        document.getElementById('fb-project-id').value = cfg.projectId || '';
        document.getElementById('fb-storage-bucket').value = cfg.storageBucket || '';
        document.getElementById('fb-app-id').value = cfg.appId || '';
        if (cfg.databaseURL) window.__fb_database_url = cfg.databaseURL;
      }
    });
  });

  if (closeFbModalBtn) {
    closeFbModalBtn.addEventListener('click', () => {
      firebaseModal.classList.remove('active');
    });
  }

  if (saveFbModalBtn) {
    saveFbModalBtn.addEventListener('click', async () => {
      const rawText = rawConfigTextarea?.value.trim();
      if (rawText) {
        parseAndFillConfig(rawText);
      }

      const config = {
        apiKey: document.getElementById('fb-api-key').value.trim(),
        authDomain: document.getElementById('fb-auth-domain').value.trim(),
        projectId: document.getElementById('fb-project-id').value.trim(),
        storageBucket: document.getElementById('fb-storage-bucket').value.trim(),
        appId: document.getElementById('fb-app-id').value.trim(),
        databaseURL: window.__fb_database_url || `https://${document.getElementById('fb-project-id').value.trim()}-default-rtdb.firebaseio.com`
      };

      if (!config.apiKey || !config.projectId) {
        showToast('Por favor completá al menos API Key y Project ID', 'error');
        return;
      }

      const ok = await dbService.initFirebase(config);
      if (ok) {
        showToast('¡Firebase conectado con éxito!', 'success');
        firebaseModal.classList.remove('active');
        await store.persist();
      } else {
        showToast('No se pudo conectar a Firebase. Verificá las reglas o credenciales.', 'error');
      }
    });
  }
});


})();
