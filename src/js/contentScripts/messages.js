const postMessage = (targetDirection, payload) => window.postMessage(
  { targetDirection, payload },
  '*',
);

export const postMessageToPageScript = (action, data) => {
  postMessage('from-content-script', {
    action,
    value: data,
  });
};

export const postMessageToContentScript = (action, data) => {
  postMessage('from-new-page-script', {
    action,
    value: data,
  });
};

const handler = (sourceDirection, callback) => window.addEventListener('message', (event) => {
  const { source, data } = event;
  if (source === window && data) {
    const { direction, payload } = data;
    if (direction === sourceDirection) {
      callback(payload);
    }
  }
});

export const handleMessageFromContentScript = (callback) => {
  handler('from-content-script', callback);
};

export const handleMessageFromPageScript = (callback) => {
  handler('from-new-page-script', callback);
};
