import axios from 'axios';
import { isServer } from '../utils/isServer';

const BASE_URL = `${
  isServer()
    ? window.location.origin === 'http://localhost:3000'
      ? 'https://staging.dudoong.com/api/v1'
      : `${window.location.origin}/api/v1`
    : 'https://staging.dudoong.com/api/v1'
}`;

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});
