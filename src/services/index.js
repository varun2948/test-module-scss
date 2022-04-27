/* eslint-disable no-param-reassign */
import getCookie from '@Utils/cookieUtils';
import axios from 'axios';

const { BASE_URL } = process.env;
export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 50000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const authenticated = (apiInstance) => {
  const token = localStorage.getItem('token');
  if (process.env.NODE_ENV === 'development') {
    apiInstance.defaults.headers.common.Authorization = `Token ${process.env.TOKEN}`;
  } else {
    apiInstance.defaults.headers.common.Authorization = `Token ${token}`;
    // This has been done to fix the CSRF Issue on same domain.
    apiInstance.defaults.headers.post['X-CSRFToken'] = getCookie('csrftoken');
    apiInstance.defaults.headers.patch['X-CSRFToken'] = getCookie('csrftoken');
    apiInstance.defaults.headers.delete['X-CSRFToken'] = getCookie('csrftoken');
    apiInstance.defaults.withCredentials = true;
  }
  return apiInstance;
};
export const loginHeaderAPI = (apiInstance) => {
  if (process.env.NODE_ENV === 'development') {
    apiInstance.defaults.headers.common.Authorization = `Token ${process.env.TOKEN}`;
  } else {
    apiInstance.defaults.headers.post['X-CSRFToken'] = getCookie('csrftoken');
    apiInstance.defaults.withCredentials = true;
  }
  return apiInstance;
};
