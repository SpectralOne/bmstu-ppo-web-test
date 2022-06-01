import axios from 'axios'
import config from './config'

const API = axios.create({
  baseURL: config.api_url,
  // withCredentials: false,
  headers: {
    "Authorization": config.token || "",
    "Content-Type": "application/json"
  }
})

export default API
