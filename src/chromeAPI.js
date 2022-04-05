/**
 *
 *  Lifecycle
 *
 */
export function onInstalled(callback) {
  chrome.runtime.onInstalled.addListener(callback);
}

export function onSuspend(callback) {
  chrome.runtime.onSuspend.addListener(callback);
}

/**
 *
 *  Resources
 *
 */
export function getResourceURL(filename) {
  return chrome.runtime.getURL(filename);
}

/**
 *
 *  Icon
 *
 */
export function setIconColor(color, callback) {
  chrome.action.setIcon(
    {
      path: {
        16: `logos/logo16${color}.png`,
        32: `logos/logo32${color}.png`,
        48: `logos/logo48${color}.png`,
        128: `logos/logo128${color}.png`,
      },
    },
    callback,
  );
}

/**
 *
 *  Badge
 *
 */
export function setBadge(text, color = '#AA0000') {
  chrome.action.setBadgeBackgroundColor({ color }, () => {
    chrome.action.setBadgeText({ text });
  });
}

export function clearBadge() {
  chrome.action.setBadgeText({ text: '' });
}

/**
 *
 *  Storage
 *
 */
export function onChangeLocalStorage(callback) {
  chrome.storage.onChanged.addListener(callback);
}

export function setLocalStorage(data, callback) {
  chrome.storage.local.set(data, callback);
}

export function getLocalStorage(keys, callback) {
  chrome.storage.local.get(keys, callback);
}

export function observeLocalStorage(property, callback) {
  onChangeLocalStorage((changes) => {
    if (changes[property]) {
      const { newValue, oldValue } = changes[property];
      callback(newValue, oldValue);
    }

    return undefined;
  });
}
