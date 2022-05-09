import React from 'react';
import PropTypes from 'prop-types';

import { Button, Modal, Typography } from '@material-ui/core/index.js';
import { makeStyles } from '@material-ui/core/styles/index.js';

import Tree from '../Tree/Tree.js';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '5px',
  },
  modalBody: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',

    width: '80vw',
    height: '80vh',
    backgroundColor: 'white',
    borderRadius: '5px',
    border: `3px solid ${theme.palette.primary.dark}`,
    padding: theme.spacing(1),
  },
  modalTree: {
    width: '100%',
    padding: theme.spacing(1),
  },
  modalButtons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function AppModal({
  diagram,
  isModalOpen,
  autolayout,
  closeModal,
  setTemporaryDiagram,
  exportHandler,
}) {
  const classes = useStyles();

  return (
    <>
      <Modal
        className={classes.modal}
        open={isModalOpen}
        onClose={closeModal}
      >
        <div className={classes.modalBody}>
          <Typography variant="h4" color='primary'>
            This is the expression tree:
          </Typography>
          <div className={classes.modalTree}>
            <Tree
              autolayout={autolayout}
              diagram={diagram}
              setTemporaryDiagram={setTemporaryDiagram}
            />
          </div>
          <div className={classes.modalButtons}>
            <Button variant="contained" color="primary" onClick={exportHandler}>
              Export
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

AppModal.propTypes = {
  diagram: PropTypes.shape({}),
  isModalOpen: PropTypes.bool,
  autolayout: PropTypes.bool,
  closeModal: PropTypes.func,
  setTemporaryDiagram: PropTypes.func,
  exportHandler: PropTypes.func,
};

AppModal.defaultProps = {
  diagram: {},
  isModalOpen: false,
  autolayout: false,
  closeModal: () => {},
  setTemporaryDiagram: () => {},
  exportHandler: () => {},
};

export default AppModal;
