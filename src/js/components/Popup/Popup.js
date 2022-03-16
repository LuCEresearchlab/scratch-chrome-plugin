import propTypes from 'prop-types';
import React from 'react';
// import PropTypes from 'prop-types';

const setPageBackgroundColor = () => {
  chrome.storage.sync.get('color', ({ color }) => {
    document.body.style.backgroundColor = color;
  });
};

function Popup({ message }) {
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
        { message }
      </div>
    </>
  );
}

Popup.propTypes = {
  message: propTypes.string,
};

Popup.defaultProps = {
  message: '',
};

export default Popup;
