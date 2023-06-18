import axios from 'axios'

export const axiosInstance = axios.create({
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  baseURL: import.meta.env.VITE_APP_BASE_PATH,
  timeout: import.meta.env.VITE_REQUEST_TIMEOUT
})

export async function get(url, params, config) {
  return request(url, 'GET', params, config)
}

export async function post(url, data, config) {
  return request(url, 'POST', data, config)
}

export async function request(url, method, params, config) {
  switch (method) {
    case 'GET':
      return axiosInstance.get(url, {params, ...config}).then(v => v.data)
    case 'POST':
      return axiosInstance.post(url, params, config).then(v => v.data)
    default:
      return axiosInstance.request({url, method, params, ...config})
  }
}

const requestInterceptors = [{
  onFulfilled(config) {
    return config
  },
  onRejected(error, options) {
    const {message} = options
    message.error(error.message)
    return Promise.reject(error)
  }
}]

const responseInterceptors = [{
  onFulfilled(response, options) {
    const {message} = options
    if (response.status !== 200) {
      message.error(response.data.message || '服务器错误，请稍后再试')
    }
    if (response.data.code !== 200) {
      const msg = response.data.message || '服务器错误，请稍后再试'
      message.error(msg)
      return Promise.reject(response.data)
    }
    return response
  },
  onRejected(error, options) {
    const {message} = options
    const {response} = error
    if (response.status !== 200) {
      message.error(response.data.message || '服务器错误，请稍后再试')
    }
    return Promise.reject(error)
  }
}]

export const interceptors = {
  request: requestInterceptors,
  response: responseInterceptors,
}

export function loadInterceptors(interceptors, options) {
  const {request, response} = interceptors
  request.forEach(item => {
    let {onFulfilled, onRejected} = item
    if (!onFulfilled || typeof onFulfilled !== 'function') {
      onFulfilled = config => config
    }
    if (!onRejected || typeof onRejected !== 'function') {
      onRejected = error => Promise.reject(error)
    }
    axiosInstance.interceptors.request.use(
      config => onFulfilled(config, options),
      error => onRejected(error, options)
    )
  })
  response.forEach(item => {
    let {onFulfilled, onRejected} = item
    if (!onFulfilled || typeof onFulfilled !== 'function') {
      onFulfilled = response => response
    }
    if (!onRejected || typeof onRejected !== 'function') {
      onRejected = error => Promise.reject(error)
    }
    axiosInstance.interceptors.response.use(
      response => onFulfilled(response, options),
      error => onRejected(error, options)
    )
  })
}
