import axios from 'axios';

export const BASE_URL = `${
  typeof window !== 'undefined'
    ? window.location.origin === 'http://localhost:3000'
      ? 'https://staging.dudoong.com/api/v1'
      : window.location.origin === 'http://localhost:5173'
      ? 'https://staging.dudoong.com/api/v1'
      : `${window.location.origin}/api/v1`
    : 'https://staging.dudoong.com/api/v1'
}`;

//export const BASE_URL = `https://dudoong.com/api/v1`;

export const DOMAIN = `${
  typeof window !== 'undefined' ? window.location.origin : 'https://dudoong.com'
}`;

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});
