/**
 * Participant Detail & Head-to-Head Match Center UI Component
 * Muestra el perfil completo del jugador/equipo en la edición actual:
 * Puntos en juego, goles a favor/en contra, enfrentamientos directos y antecedentes.
 */
import { store } from '../store.js';
import { renderShield, escapeHtml } from './renderUtils.js';
import { EDITION_2025_DATA } from '../data2025.js';

let activeMatchFilter = 'all'; // 'all' | 'finished' | 'pending'

export function renderParticipantDetail(container, teamId, onBack) {
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
