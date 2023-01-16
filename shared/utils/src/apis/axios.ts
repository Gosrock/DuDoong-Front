import axios from 'axios';

const BASE_URL = `${
  typeof window !== 'undefined'
    ? window.location.origin === 'http://localhost:3000'
      ? 'https://staging.dudoong.com/api/v1'
      : `${window.location.origin}/api/v1`
    : 'https://staging.dudoong.com/api/v1'
}`;

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
