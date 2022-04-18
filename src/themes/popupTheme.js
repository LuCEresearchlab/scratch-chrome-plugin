import { green, purple } from '@material-ui/core/colors/index.js';
import { createTheme } from '@material-ui/core/index.js';

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
