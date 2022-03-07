import React from 'react';
// import PropTypes from 'prop-types';

const setPageBackgroundColor = () => {
  chrome.storage.sync.get('color', ({ color }) => {
    document.body.style.backgroundColor = color;
  });
};

function Popup() {
  const changeColor = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: setPageBackgroundColor,
    });
  };

  return (
    <>
      <div
        style={{
          backgroundColor: 'green',
        }}
        onClick={changeColor}
      >
        Hello
      </div>
    </>
  );
}

Popup.propTypes = {};

export default Popup;
