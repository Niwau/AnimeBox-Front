import axios from 'axios'

const getToken = () => {
  return localStorage.getItem('token')
}

export const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
})

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getToken()}`
  return config
})
