import axiosOriginal from 'axios';
import {helper} from '@/utils/helper'
import {
  useAuthStore
} from '@/stores'


const axios = axiosOriginal.create({
  baseURL: 'http://127.0.0.1:8000/api/auth/',
  timeout: 5000,
  headers: {
    "Accept": 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: false
});

axios.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  if (authStore.isAuthenticated) {
    config.headers.Authorization = `Bearer ${authStore.token}`;
  }
  return config;
});

axios.interceptors.response.use(
  (response) =>{
    if(response.data && response.data.message){
      return Promise.resolve(response.data)
    }
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
);


export default axios;