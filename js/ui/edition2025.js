/**
 * UI: EDICIÓN 2025 (Cufa's Cup I)
 * Muestra el archivo oficial completo: Grupos, Fixture, Playoffs TV Broadcast con Escudos y Podio
 */
import { store } from '../store.js';
import { EDITION_2025_DATA, getTeamShield2025 } from '../data2025.js';
import { renderShield, escapeHtml } from './renderUtils.js';

export function renderEdition2025(container, onBackToHub) {
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
