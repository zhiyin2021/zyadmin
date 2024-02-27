import { defineStore } from "pinia"

interface Option<T> {
  name: keyof optionKey<T>
  value: optionValue<T>
}

type optionKey<T> = {
  [name in keyof T]: string
}

type optionValue<T> = {
  value: T[keyof T]
}

export interface appState {
  isCollapse: boolean,
  contentFullScreen: boolean,
  showLogo: boolean,
  fixedTop: boolean,
  showTabs: boolean,
  expandOneMenu: boolean, 
  elementSize: 'default' | 'small' | 'large',
  lang: string,
  theme: {
    style?: string,
    primaryColor: string,
    primaryTextColor?: string,
    menuType?: string
  },
  menuList: Array<unknown>,
  [key: string]: unknown
}
export const useAppStore = defineStore('app-store', {
  state: (): appState => ({
    isCollapse: false, // 侧边栏是否收缩展示
    contentFullScreen: false, // 内容是否可全屏展示
    showLogo: true, // 是否显示Logo
    fixedTop: false, // 是否固定顶部, todo，暂未使用
    showTabs: false, // 是否显示导航历史 
    expandOneMenu: true, // 一次是否只能展开一个菜单
    elementSize: 'small', // element默认尺寸，支持官网'large / default /small'小参数
    lang: '', // 默认采用的国际化方案,初次进入，采用浏览器当前设置的语言，默认采用中文
    theme: {
      primaryColor: '#409eff',
    },
    menuList: []
  }),
  actions: {
    isCollapseChange(type: boolean) {
      this.isCollapse = type
    },
    contentFullScreenChange(type: boolean) {
      this.contentFullScreen = type
    },
    menuListChange(arr: []) {
      this.menuList = arr
    },
    stateChange(option: Option<appState>) {
      this[option.name] = option.value
    }
  }
}) 