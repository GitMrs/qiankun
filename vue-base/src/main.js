import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(element);
Vue.config.productionTip = false;
import { registerMicroApps, start } from "qiankun";
const apps = [
  {
    name: "vueApp",
    entry: "//localhost:10000",
    container: "#vue",
    activeRule: "/vue",
  },
  {
    name: "Reactapp",
    entry: "//localhost:20000",
    container: "#react",
    activeRule: "/react",
  },
];
registerMicroApps(apps);
start();
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
