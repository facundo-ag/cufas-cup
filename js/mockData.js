/**
 * Official Teams and 4-Matchday Schedule for Cufa's Cup II (20 Teams)
 */
export const OFFICIAL_TEAMS = [
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
export const OFFICIAL_MATCHES = [
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

export const INITIAL_BRACKET = {
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
