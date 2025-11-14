/**
 * Imgur Unblock Extension - Popup Script
 */

// Get stats and update UI
function updateUI() {
  browser.runtime.sendMessage({ action: 'getStats' }).then((response) => {
    const statusDot = document.getElementById('statusDot');
    const statusText = document.getElementById('statusText');
    const statsProxied = document.getElementById('statsProxied');
    const toggleBtn = document.getElementById('toggleBtn');
    
    if (response.enabled) {
      statusDot.classList.remove('disabled');
      statusText.textContent = 'Active';
      toggleBtn.textContent = '✓ Enabled - Click to Disable';
    } else {
      statusDot.classList.add('disabled');
      statusText.textContent = 'Disabled';
      toggleBtn.textContent = '✗ Disabled - Click to Enable';
    }
    
    statsProxied.textContent = response.proxied.toLocaleString();
  });
}

// Toggle button
document.getElementById('toggleBtn').addEventListener('click', () => {
  browser.runtime.sendMessage({ action: 'toggle' }).then(() => {
    updateUI();
  });
});

// Reset stats button
document.getElementById('resetBtn').addEventListener('click', () => {
  if (confirm('Reset statistics?')) {
    browser.runtime.sendMessage({ action: 'resetStats' }).then(() => {
      updateUI();
    });
  }
});

// Initial load
updateUI();
