import request from '@/utils/request'

export const userApi = {
  list: (params: any) => {
    return request.get('user.list', params)
  },
  modify: (params: any) => {
    return request.post('user.modify', params)
  },
  delete: () => {
    return request.get('user.delete')
  },
  status: (params: any) => {
    return request.get('user.status', params);
  }
}

