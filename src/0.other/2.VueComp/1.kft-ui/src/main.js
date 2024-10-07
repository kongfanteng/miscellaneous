import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;
import FTUI from "./packages/index";
Vue.use(FTUI);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
