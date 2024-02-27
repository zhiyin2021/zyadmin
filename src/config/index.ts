
const systemTitle = '轻办公' // 系统名称，用于显示在左上角模块，登录模块、以及浏览器标题上使用,使用配置项
const systemSubTitle = '时间不在于你拥有多少,而在于你怎样使用。' // 系统提示信息，用于登录模块使用
interface CallbackProp {
    callback?: Function;
}

/** 使用后端路由 */
const isBackMenu = false
export {
    systemTitle,
    systemSubTitle,
    isBackMenu,
    CallbackProp
}