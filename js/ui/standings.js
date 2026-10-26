/**
 * Official Standings & Team Presentation UI Component (Exact TV Broadcast Replica)
 */
import { store } from '../store.js';
import { renderShield, escapeHtml } from './renderUtils.js';

export function renderStandings(container) {
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

    const liveBadge = entry.hasLiveMatch
      ? `<span class="standings-live-badge"><span class="live-dot-sm"></span>EN VIVO</span>`
      : '';

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
              <div style="display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap;">
                <span style="font-weight: 800; color: #fff; text-transform: uppercase;">${escapeHtml(entry.team.player || '')}</span>
                ${liveBadge}
              </div>
              <span style="color: var(--text-muted); font-size: 0.75rem;">(${escapeHtml(entry.team.name)})</span>
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
