import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Button,
  Modal,
  Typography,
} from '@material-ui/core/index.js';
import { makeStyles } from '@material-ui/core/styles/index.js';

import Tree from '../Tree/Tree.js';

const useStyles = makeStyles((theme) => ({
  modal: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '5px',
  },
  modalBody: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    width: '80vw',
    height: '80vh',
    backgroundColor: 'white',
    borderRadius: '5px',
    border: `3px solid ${theme.palette.primary.dark}`,
    padding: theme.spacing(1),
  },
  modalTitle: {
    padding: theme.spacing(1),
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTree: {
    padding: theme.spacing(1),
    flexGrow: 1,
    width: '100%',
  },
  modalButtons: {
    padding: theme.spacing(1),
    width: '100%',
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
  evaluateHandler,
  checkHandler,
  listHandler,
}) {
  const classes = useStyles();
  const containerRef = useRef();

  return (
    <>
      <Modal
        className={classes.modal}
        open={isModalOpen}
        onClose={closeModal}
      >
        <Box className={classes.modalBody}>
          <Box className={classes.modalTitle}>
            <Typography variant="h4" color='primary'>
              This is the expression tree:
            </Typography>
          </Box>
          <Box className={classes.modalTree} ref={containerRef}>
            <Tree
              containerRef={containerRef}
              autolayout={autolayout}
              diagram={diagram}
              setTemporaryDiagram={setTemporaryDiagram}
            />
          </Box>
          <Box className={classes.modalButtons}>
            <Button variant="contained" color="primary" onClick={exportHandler}>
              Export
            </Button>
            <Button variant="contained" color="primary" onClick={evaluateHandler}>
              Evaluate
            </Button>
            <Button variant="contained" color="primary" onClick={checkHandler}>
              Check
            </Button>
            <Button variant="contained" color="primary" onClick={listHandler}>
              List
            </Button>
          </Box>
        </Box>
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
  evaluateHandler: PropTypes.func,
  checkHandler: PropTypes.func,
  listHandler: PropTypes.func,
};

AppModal.defaultProps = {
  diagram: {},
  isModalOpen: false,
  autolayout: false,
  closeModal: () => {},
  setTemporaryDiagram: () => {},
  exportHandler: () => {},
  evaluateHandler: () => {},
  checkHandler: () => {},
  listHandler: () => {},
};

export default AppModal;
