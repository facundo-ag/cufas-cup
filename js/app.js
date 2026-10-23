/**
 * Application Entry Point & Controller (Multi-edition Portal)
 */
import { store } from './store.js';
import { dbService, DEFAULT_FIREBASE_CONFIG } from './db.js';
import { renderHub } from './ui/hub.js';
import { renderEdition2025 } from './ui/edition2025.js';
import { renderHistoricalRanking } from './ui/ranking.js';
import { renderStandings } from './ui/standings.js';
import { renderFixtures } from './ui/fixtures.js';
import { renderBracket } from './ui/bracket.js';
import { renderAdmin, showToast } from './ui/admin.js';
import { renderParticipantDetail } from './ui/participantDetail.js';

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
