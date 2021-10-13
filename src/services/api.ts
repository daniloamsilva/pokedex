import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});
