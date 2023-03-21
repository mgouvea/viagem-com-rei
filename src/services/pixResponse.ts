import axios from 'axios';

let baseURL = '';
let token = null;

if (process.env.NODE_ENV === 'development') {
  baseURL = 'https://api.mercadopago.com/v1/payments';
  token =
    'TEST-4065599806909433-032018-951347a3379670510f5e931064acb5ec-772811004';
} else {
  baseURL = 'https://api.mercadopago.com/v1/payments';
  token =
    'APP_USR-4065599806909433-032018-7b5935b2d87139bb6f1f4be7d4aa7730-772811004';
}

export const pixResponse = axios.create({
  baseURL: baseURL,
  // prettier-ignore
  headers: { 'Authorization': `Bearer ${token}` },
});
