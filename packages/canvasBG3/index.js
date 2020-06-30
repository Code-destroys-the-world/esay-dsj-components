/*
 * @Author: HePeng
 * @Date: 2020-03-06 17:24:17
 * @Last Modified by: HePeng
 * @Last Modified time: 2020-04-24 16:52:44
 */
// 导入组件，组件必须声明 name
import DsjCanvasBg from "./src/main.vue";
// 为组件添加 install 方法，用于按需引入
DsjCanvasBg.install = function(Vue) {
  Vue.component(DsjCanvasBg.name, DsjCanvasBg);
};

export default DsjCanvasBg;
