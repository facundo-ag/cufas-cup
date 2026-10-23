/**
 * Shared UI Render Utilities
 */
export function renderShield(shieldPath, altName = '') {
  if (!shieldPath) return `<span style="font-size: 1.2rem;">⚽</span>`;
  if (shieldPath.includes('/') || shieldPath.includes('.')) {
    // Cache buster to ensure browser immediately loads newly replaced image files
    const separator = shieldPath.includes('?') ? '&' : '?';
    const cacheBuster = 'v=3stars_1';
    return `<img src="${encodeURI(shieldPath)}${separator}${cacheBuster}" alt="${escapeHtml(altName)}" class="shield-img" onerror="this.outerHTML='⚽'" />`;
  }
  return `<span style="font-size: 1.2rem;">${shieldPath}</span>`;
}

export function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[m]));
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
  }, 3200);
}
