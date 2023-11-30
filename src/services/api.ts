import axios from 'axios'

const getToken = () => {
  return localStorage.getItem('token')
}

export const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
})
