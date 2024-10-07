/**
 * @file 所有组件的入口
 */
import Button from "./button.vue";
import Icon from "./icon.vue";
const install = (Vue) => {
  Vue.component(Button.name, Button);
  Vue.component(Icon.name, Icon);
};
// 设置通过 script 标签引入时自动安装
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}
export default {
  install,
};
