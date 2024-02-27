import { defineStore } from "pinia"

interface Option {
  name: string,
  value: any
}

export interface keepAliveState {
  keepAliveComponentsName: string[]
}

export const useKeepAliveStore = defineStore('keepAlive-store', {
  state: (): keepAliveState => ({
    keepAliveComponentsName: [] // 需要缓存的组件名称
  }),
  actions: {
    // 重置，Push, splice keep-alive对象
    setKeepAliveComponentsName(nameArr: any[]) {
      this.keepAliveComponentsName = nameArr
    },
    addKeepAliveComponentsName(name: string) {
      this.keepAliveComponentsName.push(name)
    },
    delKeepAliveComponentsName(name: string) {
      const key = this.keepAliveComponentsName.indexOf(name)
      if (key !== -1) {
        this.keepAliveComponentsName.splice(key, 1)
        console.log(this.keepAliveComponentsName)
      }
    }
  },
})