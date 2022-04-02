import { clearBadge, getLocalStorage, setLocalStorage } from './utils/chromeAPI';

let enabled = true;
const toggle = document.getElementById('toggle');

function updateToggleText() {
  toggle.textContent = enabled ? 'Disable' : 'Enable';
}

getLocalStorage('enabled', (data) => {
  if (data.enabled !== undefined) {
    enabled = !!data.enabled;
  }
  updateToggleText();
});

toggle.onclick = () => {
  enabled = !enabled;
  updateToggleText();
  setLocalStorage({ enabled });
};

getLocalStorage(['diagram'], (data) => {
  const { diagram } = data;
});

clearBadge();
