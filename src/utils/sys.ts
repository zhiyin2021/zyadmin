import { systemTitle } from '@/config'

const changeTitle = (name: any) => {
  document.title = `${name}-${systemTitle}`
}


export {
  changeTitle
}