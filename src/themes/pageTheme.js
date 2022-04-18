import { colors } from '@material-ui/core/index.js';
import { createTheme } from '@material-ui/core/styles/index.js';

const theme = createTheme({
  palette: {
    primary: {
      main: colors.purple[500],
    },
    secondary: {
      main: colors.green[500],
    },
  },
});

export default theme;
