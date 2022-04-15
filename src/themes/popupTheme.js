import { createTheme } from '@material-ui/core/styles/index.js';

import purple from '@material-ui/core/colors/purple.js';
import green from '@material-ui/core/colors/green.js';

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});

export default theme;
