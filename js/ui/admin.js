/**
 * Admin Panel UI Component (TV Broadcast Clean Style)
 */
import { store } from '../store.js';
import { dbService } from '../db.js';
import { renderShield, escapeHtml } from './renderUtils.js';

export function renderAdmin(container) {
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

export function showToast(message, type = 'info') {
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

