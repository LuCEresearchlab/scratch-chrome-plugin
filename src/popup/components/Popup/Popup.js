import React from 'react';
import PropTypes from 'prop-types';

import { ThemeProvider } from '@material-ui/core/index.js';

import theme from '../../../themes/popupTheme.js';

function Popup() {
  return (
    <>
      <ThemeProvider theme={theme}>
        Hello
      </ThemeProvider>
    </>
  );
}

Popup.propTypes = {};

Popup.defaultProps = {};

export default Popup;
