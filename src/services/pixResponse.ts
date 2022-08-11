import axios from 'axios';

let baseURL = '';
let token = null;

if (process.env.NODE_ENV === 'development') {
  baseURL = 'https://api.mercadopago.com/v1/payments';
  token =
    'TEST-3500449633442271-042403-e0acf802af7cef2a1dcabe34e31c5d25-62745465';
} else {
  baseURL = 'https://api.mercadopago.com/v1/payments';
  token =
    'APP_USR-3500449633442271-042403-b728f5fb653dfce5f437251de01a6964-62745465';
}

export const pixResponse = axios.create({
  baseURL: baseURL,
  // prettier-ignore
  headers: { 'Authorization': `Bearer ${token}` },
});
