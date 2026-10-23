/**
 * Persistence layer: Supports Firebase Firestore + LocalStorage fallback
 */
import { OFFICIAL_TEAMS, OFFICIAL_MATCHES, INITIAL_BRACKET } from './mockData.js';

const STORAGE_KEY = 'cufas_cup_v2_official_data';
const FIREBASE_CONFIG_KEY = 'cufas_cup_firebase_config';

export const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyD0loQKxKXd9bs7XMUtMQAccyLriI16K0g",
  authDomain: "cufa-s-cup.firebaseapp.com",
  databaseURL: "https://cufa-s-cup-default-rtdb.firebaseio.com",
  projectId: "cufa-s-cup",
  storageBucket: "cufa-s-cup.firebasestorage.app",
  messagingSenderId: "156974604636",
  appId: "1:156974604636:web:ce37ee3f61ab34ca6ea199",
  measurementId: "G-B5564NLTEG"
};

class DatabaseService {
  constructor() {
    this.firebaseApp = null;
    this.firestore = null;
    this.firestoreDoc = null;
    this.isFirebaseActive = false;
    this.listeners = [];
  }

  /**
   * Initialize and load data from Firebase or LocalStorage
   */
  async loadData() {
    // 1. Si Firebase está activo, intentar leer datos remotos
    if (this.isFirebaseActive && this.rtdbRef) {
      try {
        const snapshot = await this.rtdbRef.once('value');
        const remote = snapshot.val();
        if (remote && remote.teams && remote.matches && remote.teams.length === 20) {
          remote.teams = remote.teams.map(t => {
            const official = OFFICIAL_TEAMS.find(ot => ot.id === t.id);
            return official ? { ...t, shield: official.shield } : t;
          });
          if (remote.bracket) {
            if (!remote.bracket.thirdPlace) remote.bracket.thirdPlace = { ...INITIAL_BRACKET.thirdPlace };
            if (remote.bracket.runnerUp === undefined) remote.bracket.runnerUp = null;
            if (remote.bracket.thirdPlaceWinner === undefined) remote.bracket.thirdPlaceWinner = null;
          }
          localStorage.setItem(STORAGE_KEY, JSON.stringify(remote));
          this.notifyStatus('synced');
          return remote;
        }
      } catch (e) {
        console.warn('Could not fetch from RTDB on loadData, falling back to local:', e);
      }
    }

    // 2. Si no, leer de localStorage
    const local = localStorage.getItem(STORAGE_KEY);
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (parsed.teams && parsed.matches && parsed.teams.length === 20) {
          parsed.teams = parsed.teams.map(t => {
            const official = OFFICIAL_TEAMS.find(ot => ot.id === t.id);
            return official ? { ...t, shield: official.shield } : t;
          });
          if (parsed.bracket) {
            if (!parsed.bracket.thirdPlace) {
              parsed.bracket.thirdPlace = { ...INITIAL_BRACKET.thirdPlace };
            }
            if (parsed.bracket.runnerUp === undefined) parsed.bracket.runnerUp = null;
            if (parsed.bracket.thirdPlaceWinner === undefined) parsed.bracket.thirdPlaceWinner = null;
          }
          if (parsed.adminPin === "1234" || !parsed.adminPin) {
            parsed.adminPin = "chadnaldo123";
            localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
          }
          // Sembrar en Firebase si estaba vacío
          if (this.isFirebaseActive && this.rtdbRef) {
            this.rtdbRef.set(parsed).then(() => {
              this.notifyStatus('synced');
            }).catch(err => console.warn('Seed sync error:', err));
          }
          return parsed;
        }
      } catch (e) {
        console.error('Error parsing local storage:', e);
      }
    }

    // Default Seed Data from Official Presentation & Fixture
    const initialData = {
      tournamentName: "Cufa's Cup II",
      season: "2025/2026",
      format: "Champions League (20 Equipos - 4 Fechas)",
      adminPin: "chadnaldo123",
      teams: OFFICIAL_TEAMS,
      matches: OFFICIAL_MATCHES,
      bracket: INITIAL_BRACKET,
      lastUpdated: new Date().toISOString()
    };

    await this.saveData(initialData);
    return initialData;
  }

  /**
   * Save data to LocalStorage and optionally Firebase
   */
  async saveData(data) {
    data.lastUpdated = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

    // Try sync with Firebase if configured
    if (this.isFirebaseActive && window.firebase) {
      if (this.rtdbRef) {
        try {
          await this.rtdbRef.set(data);
          this.notifyStatus('synced');
        } catch (err) {
          console.warn('Realtime Database sync failed, saved locally:', err);
          this.notifyStatus('local');
        }
      } else if (this.firestoreDoc) {
        try {
          await this.firestoreDoc.set(data);
          this.notifyStatus('synced');
        } catch (err) {
          console.warn('Firestore sync failed, saved locally:', err);
          this.notifyStatus('local');
        }
      }
    } else {
      this.notifyStatus('local');
    }

    return data;
  }

  /**
   * Connect to Firebase (Firestore or Realtime Database) via custom user config
   */
  async initFirebase(config) {
    if (!config || (!config.apiKey && !config.databaseURL) || (!config.projectId && !config.databaseURL)) {
      this.isFirebaseActive = false;
      this.notifyStatus('local');
      return false;
    }

    try {
      if (window.firebase && window.firebase.apps) {
        if (!window.firebase.apps.length) {
          this.firebaseApp = window.firebase.initializeApp(config);
        } else {
          this.firebaseApp = window.firebase.app();
        }

        // 1. Realtime Database setup if available
        if (window.firebase.database) {
          try {
            this.rtdb = window.firebase.database();
            this.rtdbRef = this.rtdb.ref('tournament_active');

            // Escuchar estado de conexión
            this.rtdb.ref('.info/connected').on('value', (snap) => {
              if (snap.val() === true) {
                this.isFirebaseActive = true;
                this.notifyStatus('synced');
              } else {
                if (!this.isFirebaseActive) {
                  this.notifyStatus('local');
                }
              }
            });
          } catch (e) {
            console.warn('RTDB init warning:', e);
          }
        }

        // 2. Firestore setup if available
        if (window.firebase.firestore && config.projectId) {
          try {
            this.firestore = window.firebase.firestore();
            this.firestoreDoc = this.firestore.collection('tournaments').doc('cufas_cup_active');
          } catch (e) {
            console.warn('Firestore init warning:', e);
          }
        }

        this.isFirebaseActive = true;
        localStorage.setItem(FIREBASE_CONFIG_KEY, JSON.stringify(config));
        this.notifyStatus('synced');
        return true;
      }
    } catch (e) {
      console.error('Firebase init error:', e);
      this.isFirebaseActive = false;
      this.notifyStatus('local');
      return false;
    }
  }

  getSavedFirebaseConfig() {
    try {
      const cfg = localStorage.getItem(FIREBASE_CONFIG_KEY);
      return cfg ? JSON.parse(cfg) : null;
    } catch (e) {
      return null;
    }
  }

  /**
   * Listen for remote updates via Realtime Database or Firestore
   */
  listenForRemoteUpdates(onUpdateCallback) {
    // Realtime Database listener
    if (this.isFirebaseActive && this.rtdbRef) {
      this.rtdbRef.on('value', (snapshot) => {
        const remoteData = snapshot.val();
        if (remoteData) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(remoteData));
          onUpdateCallback(remoteData);
          this.notifyStatus('synced');
        }
      }, (err) => {
        console.warn('RTDB listener error:', err);
        this.notifyStatus('local');
      });
    }

    // Firestore listener
    if (this.isFirebaseActive && this.firestoreDoc) {
      this.firestoreDoc.onSnapshot((doc) => {
        if (doc.exists) {
          const remoteData = doc.data();
          localStorage.setItem(STORAGE_KEY, JSON.stringify(remoteData));
          onUpdateCallback(remoteData);
          this.notifyStatus('synced');
        }
      }, (err) => {
        console.warn('Firestore snapshot error:', err);
      });
    }

    // Also support multi-tab synchronization via storage event
    window.addEventListener('storage', (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const updated = JSON.parse(e.newValue);
          onUpdateCallback(updated);
        } catch (err) {}
      }
    });
  }

  onStatusChange(cb) {
    this.listeners.push(cb);
    cb(this.isFirebaseActive ? 'synced' : 'local');
  }

  notifyStatus(status) {
    this.listeners.forEach(cb => cb(status));
  }

  /**
   * Export all tournament data as downloadable JSON
   */
  exportJSON(data) {
    const str = JSON.stringify(data, null, 2);
    const blob = new Blob([str], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cufas_cup_2_data_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  /**
   * Import tournament data from JSON file
   */
  async importJSON(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const json = JSON.parse(e.target.result);
          if (json.teams && json.matches) {
            await this.saveData(json);
            resolve(json);
          } else {
            reject(new Error('Formato de JSON inválido: faltan campos teams o matches.'));
          }
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = () => reject(new Error('Error al leer el archivo.'));
      reader.readAsText(file);
    });
  }
}

export const dbService = new DatabaseService();
