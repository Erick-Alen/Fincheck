import axios from 'axios'
import { storageKeys } from '../config/storageKeys';
import { sleep } from '../utils/sleep';

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // headers: {
  //   'Content-Type': 'application/json',
  // },
})

//declaring interceptors
httpClient.interceptors.request.use(async config => {
  const accessToken = localStorage.getItem(storageKeys.ACCESS_TOKEN);
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`
  }
  return config;

})
httpClient.interceptors.response.use(async data => {
  // await sleep(1500)
  return data;
})
