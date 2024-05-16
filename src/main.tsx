import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';

import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './styles/theme';

import Pacotes from './components/Pacotes';
import { Checkout } from './components/Checkout';
import { PaymentApproved } from './components/PaymentApproved';
import { Admin } from './components/admin';
import Ganhadores from './components/Ganhadores';
import { PremioViagem } from './components/PremioViagem';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/premios" element={<PremioViagem />} />
          <Route path="/ganhadores" element={<Ganhadores />} />
          <Route path="/planos" element={<Pacotes />} />
          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/paymentApproved" element={<PaymentApproved />} />
          <Route path="/painel" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
