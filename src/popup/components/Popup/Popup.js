import React from 'react';
import PropTypes from 'prop-types';

import { ThemeProvider } from '@material-ui/core/styles';

import theme from '../../../themes/popupTheme';

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
