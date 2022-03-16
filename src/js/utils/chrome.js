export function onInstalled(callback) {
  chrome.runtime.onInstalled.addListener(callback);
}

export function onSuspend(callback) {
  chrome.runtime.onSuspend.addListener(callback);
}

export function setBadge(text, color = '#AA0000') {
  chrome.action.setBadgeBackgroundColor({ color }, () => {
    chrome.action.setBadgeText({ text });
  });
}

export function clearBadge() {
  chrome.action.setBadgeText({ text: '' });
}

export function onChangeLocalStorage(callback) {
  chrome.storage.onChanged.addListener(callback);
}

export function setLocalStorage(data, callback) {
  chrome.storage.local.set(data, callback);
}

export function getLocalStorage(keys, callback) {
  chrome.storage.local.get(keys, callback);
}
