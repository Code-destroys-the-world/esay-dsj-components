/*
 * @Author: HePeng
 * @Date: 2020-03-04 11:02:57
 * @Last Modified by: HePeng
 * @Last Modified time: 2020-03-06 17:24:56
 */
// packages/textarea/index.js

// 导入组件，组件必须声明 name
import ChartAnnular from "./src/main.vue";

// 为组件添加 install 方法，用于按需引入
ChartAnnular.install = function(Vue) {
  Vue.component(ChartAnnular.name, ChartAnnular);
};

export default ChartAnnular;
