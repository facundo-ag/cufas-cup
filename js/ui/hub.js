/**
 * UI: HUB PRINCIPAL / PORTAL DE BIENVENIDA
 * Menú central cinematográfico con 4 accesos: Edición 1, Edición 2, Edición 3 (Suspenso) y Ranking FIFA
 */
import { showToast } from './renderUtils.js';

export function renderHub(container, onNavigate) {
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
