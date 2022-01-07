import type { App } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import Login from "../views/Login.vue";
import SurveyStart from "../views/SurveyStart.vue";
import SurveyManage from "../views/SurveyManage.vue";

// 2. 定义一些路由
const routes = [
  { path: "/", component: Login },
  {
    path: "/survey",
    component: MainLayout,
    redirect: "/survey/start",
    children: [
      { path: "start", component: SurveyStart },
      { path: "manage", component: SurveyManage },
    ],
  },
];

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});

export function setupRouter(app: App<Element>) {
  app.use(router);
}

export default router;
