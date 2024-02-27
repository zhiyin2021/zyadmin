import { RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";

const route: RouteRecordRaw[] = [
  {
    path: "/system",
    component: shallowRef(Layout),
    redirect: "/404",
    meta: { title: "系统目录", hide: true },
    children: [
      {
        path: "/404",
        component: () => import("@/views/system/404.vue"),
        meta: { title: "404", hideTabs: true },
      },
      {
        path: "/401",
        component: () => import("@/views/system/401.vue"),
        meta: { title: "401", hideTabs: true },
      },
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/system/redirect.vue"),
        meta: { title: "重定向页面", hideTabs: true },
      },
    ],
  },
  {
    path: "/",
    component: shallowRef(Layout),
    redirect: "/home",
    meta: { title: "", hide: true },
    children: [],
  },
  {
    path: "/login",
    component: () => import("@/views/system/login.vue"),
    meta: { title: "登录", hide: true },
  },
  {
    // 找不到路由重定向到404页面
    path: "/:pathMatch(.*)",
    component: shallowRef(Layout),
    redirect: "/404",
    meta: { title: "", hide: true },
    children: [],
  },
];

export default route;
