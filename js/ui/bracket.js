/**
 * Champions League Knockout Bracket UI Component (TV Broadcast Style)
 */
import { store } from '../store.js';
import { renderShield, escapeHtml } from './renderUtils.js';

export function renderBracket(container) {
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

