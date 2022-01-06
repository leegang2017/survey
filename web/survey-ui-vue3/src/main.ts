import router, { createApp } from "vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

import App from "./App.vue";
import { setupRouter } from "./router";

const app = createApp(App);

setupRouter(app);
app.use(Antd);
// Mount when the route is ready
// router.isReady().then(() => {
//   app.mount("#app");
// });

app.mount("#app");
