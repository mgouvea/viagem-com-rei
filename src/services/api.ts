import axios from 'axios';

let baseURL = '';

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3001';
} else {
  baseURL = 'https://viajecomrei.herokuapp.com';
}

export const api = axios.create({
  baseURL: baseURL,
  headers: { 'Access-Control-Allow-Origin': '*' },
});
