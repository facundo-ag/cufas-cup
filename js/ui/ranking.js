/**
 * UI: RANKING FIFA HISTÓRICO / SALÓN DE LA FAMA
 * Tabla consolidada de todos los tiempos con podio de líderes históricos
 */
import { computeHistoricalRanking } from '../rankingService.js';
import { renderShield } from './renderUtils.js';

let filterQuery = '';

export function renderHistoricalRanking(container, edition2State, onBackToHub) {
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
