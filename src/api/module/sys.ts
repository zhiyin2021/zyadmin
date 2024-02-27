import request from '@/utils/request'
 
export const sysApi = {
  login: (params: any) => {
    return request.get('sys.login', params)
  },
  info: () => {
    return request.get('sys.info')
  },
  logout: () => {
    return request.get('sys.logout')
  },
  menu: () => {
    return request.get('sys.menu')
  },
  module: () => {
    return request.get('sys.module')
  }
}

// /** 登录api */
// export function loginApi(data: object) {
//   return request({
//     url: '/user/login',
//     method: 'post',
//     baseURL: '/mock',
//     data
//   })
// }

// /** 获取用户信息Api */
// export function getInfoApi(data: object) {
//   return request({
//     url: '/user/info',
//     method: 'post',
//     baseURL: '/mock',
//     data
//   })
// }

// /** 退出登录Api */
// export function loginOutApi() {
//   return request({
//     url: '/user/out',
//     method: 'post',
//     baseURL: '/mock'
//   })
// }

// /** 获取用户信息Api */
// export function passwordChange(data: object) {
//   return request({
//     url: '/user/passwordChange',
//     method: 'post',
//     baseURL: '/mock',
//     data
//   })
// }

// /** 获取登录后需要展示的菜单 */
// export function getMenuApi() {
//   return request({
//     url: '/menu/list',
//     method: 'post',
//     baseURL: '/mock'
//   })
// }