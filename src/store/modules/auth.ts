import { sysApi } from '@/api'
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

export interface userState {
  token: string,
  info: userInfo
}
export interface userInfo {
  id: number,
  name: string,
  role: string,
  dep: string
}


export const useAuthStore = defineStore('user-store', {
  state: (): userState => ({
    token: '',
    info: { id: 0, name: "", role: "", dep: "" }
  }),
  actions: {
    getToken() {
      return this.token || localStorage.getItem('_zy_token_')
    },
    resetAuthStore() {
      localStorage.removeItem('tabs')
      localStorage.removeItem('vuex')
      sessionStorage.removeItem('vuex')
      location.reload()
    },
    hasPermission(module: string): boolean {
      return this.info.role === module || this.info.role === 'admin' || false
    },
    async login(params: any) {
      const res = await sysApi.login(params)

      this.token = res.data
      localStorage.setItem('_zy_token_', res.data)
      this.getInfo()
      return res
    },
    // get user info after user logined
    async getInfo() {
      const res = await sysApi.info()
      if (res.code === 200) {
        this.info = res.data
      }
    },
    async logout() {
      const res = await sysApi.logout()
      if (res.code === 200) {
        // this.token = ""
        this.info = { id: 0, name: "", role: "", dep: "" }
        localStorage.removeItem('_zy_token_')
        console.log('logout')
        const router = useRouter()
        location.href = "/"
      }
    }
  }
})

