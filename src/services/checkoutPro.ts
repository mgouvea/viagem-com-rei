import axios from 'axios';

let baseURL = '';
let token = null;

if (process.env.NODE_ENV === 'development') {
  baseURL = 'https://api.mercadopago.com/checkout/preferences';
  token =
    'TEST-7096182759182994-081715-9fedac0f17bb483fb870302b7f53976d-1181243816';
} else {
  baseURL = 'https://api.mercadopago.com/checkout/preferences';
  token =
    'APP_USR-7096182759182994-081715-fb3baecd1e0ce6c08da6e43bc908c4fe-1181243816';
}

export const checkoutPro = axios.create({
  baseURL: `${baseURL}?access_token=${token}`,
});
