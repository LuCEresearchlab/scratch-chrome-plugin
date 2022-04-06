import React from 'react';
import PropTypes from 'prop-types';

import { Fab } from '@material-ui/core';
import { School } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    position: 'fixed',
    zIndex: 10000,
    bottom: theme.spacing(1),
    left: theme.spacing(1),
  },
}));

function OpenModalButton({ handleClick }) {
  const classes = useStyles();
  return (
    <>
      <Fab
        className={classes.button}
        color="secondary"
        size="small"
        aria-label="scroll back to top"
        onClick={handleClick}
      >
        <School />
      </Fab>
    </>
  );
}

OpenModalButton.propTypes = {
  handleClick: PropTypes.func,
};

OpenModalButton.defaultProps = {
  handleClick: () => {},
};

export default OpenModalButton;
