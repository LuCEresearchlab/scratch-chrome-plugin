const postMessage = (targetDirection, payload) => window.postMessage(
  { targetDirection, payload },
  '*',
);

export const postMessageToPageScript = (action, data) => {
  postMessage('from-et-plugin-content-script', {
    action,
    value: data,
  });
};

export const postMessageToContentScript = (action, data) => {
  postMessage('from-et-plugin-page-script', {
    action,
    value: data,
  });
};

const handler = (sourceDirection, callback) => window.addEventListener('message', (event) => {
  const { source, data } = event;
  if (source === window && data) {
    const { targetDirection, payload } = data;
    if (targetDirection === sourceDirection) {
      callback(payload);
    }
  }
});

export const handleMessageFromContentScript = (callback) => {
  handler('from-et-plugin-content-script', callback);
};

export const handleMessageFromPageScript = (callback) => {
  handler('from-et-plugin-page-script', callback);
};
