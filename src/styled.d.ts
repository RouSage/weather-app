import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      main: string;
      error: string;
    };
    bgImage: {
      bg: string;
      bg320: string;
      bg768: string;
      bg992: string;
      bg1199: string;
    };
  }
}
