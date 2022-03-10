// background.js

const color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  fetch(request.url, request.options)
    .then((response) => response.text())
    .then((text) => sendResponse(text))
    .catch(console.error);
  return true; // respond asynchronously.
});
