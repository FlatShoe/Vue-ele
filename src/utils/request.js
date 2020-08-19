import axios from 'axios'

const instance = axios.create({
  // baseURL: ''
  timeout: 1000
})

export const createApi = (url, method, data) => {
  let config = {}
  if (method.toUpperCase === 'GET') {
    config.params = data
  } else {
    config.data = data
  }

  return instance({
    url,
    method,
    ...config
  })
}