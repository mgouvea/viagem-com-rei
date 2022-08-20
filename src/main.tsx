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
import { Admin } from './components/admin';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/jeri" element={<Jeri />} />
          <Route path="/pacotes" element={<Pacotes />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout20" element={<Checkout20 />} />
          <Route path="/checkout30" element={<Checkout30 />} />
          <Route path="/paymentApproved" element={<PaymentApproved />} />
          <Route path="/admin" element={<Admin />} />
          {/* <Route path='/Iphone' element={} /> */}
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
