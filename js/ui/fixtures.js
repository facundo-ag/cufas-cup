/**
 * Official Fixture Broadcast UI Component (Exact replica of TV Graphics)
 */
import { store } from '../store.js';
import { renderShield, escapeHtml } from './renderUtils.js';

export function renderFixtures(container) {
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
