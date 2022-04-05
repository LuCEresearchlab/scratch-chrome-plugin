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
export function setIconGreen(callback) {
  chrome.action.setIcon(
    {
      path: {
        16: 'logos/logo16green.png',
        32: 'logos/logo32green.png',
        48: 'logos/logo48green.png',
        128: 'logos/logo128green.png',
      },
    },
    callback,
  );
}

export function setIconRed(callback) {
  chrome.action.setIcon(
    {
      path: {
        16: 'logos/logo16red.png',
        32: 'logos/logo32red.png',
        48: 'logos/logo48red.png',
        128: 'logos/logo128red.png',
      },
    },
    callback,
  );
}

export function setIconYellow(callback) {
  chrome.action.setIcon(
    {
      path: {
        16: 'logos/logo16yellow.png',
        32: 'logos/logo32yellow.png',
        48: 'logos/logo48yellow.png',
        128: 'logos/logo128yellow.png',
      },
    },
    callback,
  );
}

export function setIconGray(callback) {
  chrome.action.setIcon(
    {
      path: {
        16: 'logos/logo16gray.png',
        32: 'logos/logo32gray.png',
        48: 'logos/logo48gray.png',
        128: 'logos/logo128gray.png',
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
