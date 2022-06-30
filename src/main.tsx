import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';

import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './styles/theme';
import { Jeri } from './components/Jeri';
import Pacotes from './components/Pacotes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/Jeri" element={<Jeri />} />
          <Route path="/Pacotes" element={<Pacotes />} />
          {/* <Route path='/Iphone' element={} /> */}
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
