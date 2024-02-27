import Layout from "@/layout/index.vue";
import { RouteRecordRaw } from "vue-router";

const newNode = (title: string, path: string, icon: string, module: () => Promise<any>): RouteRecordRaw => {
  return {
    path: path,
    component: shallowRef(Layout),
    redirect: path,
    meta: { title: title, icon: icon },
    children: [
      {
        path: path,
        component: module,
        meta: { title: title, icon: icon },
      },
    ],
  };
};

const route: RouteRecordRaw[] = [
  newNode("首页", "/home", "sfont system-home", () => import("@/views/pc/index.vue")),
  newNode("方案", "/task", "sfont system-home", () => import("@/views/task/index.vue")),
];

export default route;
