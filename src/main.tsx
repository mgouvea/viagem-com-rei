import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';

import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './styles/theme';
import { Jeri } from './components/Jeri';
import Pacotes from './components/Pacotes';
import { Checkout } from './components/Checkout';
import { Checkout20 } from './components/Checkout/Checkout20';
import { Checkout30 } from './components/Checkout/Checkout30';
import { PaymentApproved } from './components/PaymentApproved';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/Jeri" element={<Jeri />} />
          <Route path="/Pacotes" element={<Pacotes />} />
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="/Checkout20" element={<Checkout20 />} />
          <Route path="/Checkout30" element={<Checkout30 />} />
          <Route path="/PaymentApproved" element={<PaymentApproved />} />
          {/* <Route path='/Iphone' element={} /> */}
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
