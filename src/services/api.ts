import axios from 'axios';

let baseURL = '';

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3001/users';
} else {
  baseURL = 'https://viajecomrei.herokuapp.com/users';
}

export const api = axios.create({
  baseURL: baseURL,
  headers: { 'Access-Control-Allow-Origin': '*' },
});
