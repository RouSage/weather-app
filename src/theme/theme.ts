import { DefaultTheme } from 'styled-components';
import bg from '../img/bg.png';
import bg320 from '../img/bg-320w.png';
import bg768 from '../img/bg-768w.png';
import bg992 from '../img/bg-992w.png';
import bg1199 from '../img/bg-1199w.png';

const theme: DefaultTheme = {
  colors: {
    main: '#076969',
    error: '#f16051',
  },
  bgImage: {
    bg,
    bg320,
    bg768,
    bg992,
    bg1199,
  },
};

export { theme };
