import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  fonts: {
    headings: 'Roboto',
    body: 'Roboto',
  },
  colors: {
    mgreen: {
      500: '#789684',
    },
    mpBlue: {
      500: '#00bcff',
      600: '#008bc8',
      700: '#0a0080',
    },
  },
  styles: {
    global: {
      body: {
        bg: '#f6f6f6',
        // color: 'white',
      },
    },
  },
});
