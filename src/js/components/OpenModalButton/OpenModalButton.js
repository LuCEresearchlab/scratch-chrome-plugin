import React from 'react';
// import PropTypes from 'prop-types';

import { Fab } from '@material-ui/core';
import { School } from '@material-ui/icons';

function OpenModalButton() {
  return (
    <>
      <Fab color="secondary" size="small" aria-label="scroll back to top">
        <School />
      </Fab>
    </>
  );
}

export default OpenModalButton;
