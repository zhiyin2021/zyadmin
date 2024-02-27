import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse, AxiosInstance, Method } from 'axios'

import { ElMessage } from 'element-plus'
import { useAuthStore } from '@/store'

const service: AxiosInstance = axios.create({
  baseURL: "/api/",
  timeout: 5000
})

// 请求前的统一处理
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    const auth = useAuthStore()
    // JWT鉴权处理
    if (config.headers) {
      config.headers['t'] = localStorage.getItem('_zy_token_') || ''
    }
    return Promise.resolve(config)
  },
  (error: AxiosError) => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response: AxiosResponse<any, any>): any => {
    const auth = useAuthStore()
    const res = response.data as result
    if (res.code === 200) {
      return Promise.resolve(res)
    }
    if (res.code === 403 || res.code == 401) {
      auth.logout()
    } else {
      ElMessage({
        message: res.msg || '服务异常',
        type: 'error',
        duration: 3 * 1000
      })
    }
    return Promise.reject(res)
  },
  (error: any) => {
    const auth = useAuthStore()
    const { response } = error
    console.log('err', response) // for debug
    if (response.status === 403 || response.status == 401) {
      auth.logout()
    } else {
      ElMessage({
        message: response.data || error.msg || error.message || '服务异常',
        type: 'error',
        duration: 3 * 1000
      })
    }
    return Promise.reject(error.response)
  }
)

export interface result {
  code: number;
  msg?: string;
  data?: any;
}

const request = {
  get: (url: string, params?: any): Promise<result> => {
    return service.get(url, { params }) as Promise<result>
  },
  del: (url: string, params?: any): Promise<result> => {
    return service.delete(url, { params }) as Promise<result>
  },
  post: (url: string, data?: any): Promise<result> => {
    return service.post(url, data) as Promise<result>
  },
  put: (url: string, data?: any): Promise<result> => {
    return service.put(url, data) as Promise<result>
  },
}
export default request 