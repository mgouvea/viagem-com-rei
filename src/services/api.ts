import axios from 'axios';

let baseURL = '';

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3001';
} else {
  baseURL = 'https://boasorte.viajecomrei.com.br';
  // baseURL = 'http://89.116.214.181:3333';
}

export const api = axios.create({
  baseURL: baseURL,
  headers: { 'Access-Control-Allow-Origin': '*' },
});
