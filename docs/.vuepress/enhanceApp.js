// import VueHighlightJS from 'vue-highlight.js'
// import 'highlight.js/styles/atom-one-dark.css'
import Element from 'element-ui'
import PElement from '../../index'
import DemoBlock from './components/demo-block'
// import 'element-ui/lib/theme-chalk/index.css'
// import './mock'
// import Mock from './mock/base-table'
// import VueECharts from 'vue-echarts' //注册图表
export default (
    {
      Vue, // VuePress 正在使用的 Vue 构造函数
      options, // 附加到根实例的一些选项
      router, // 当前应用的路由实例
      siteData // 站点元数据
    }) => {
  // ...做一些其他的应用级别的优化
  Vue.use(Element, {
    size: 'small'
  })
  // Vue.use(VueHighlightJS)
  Vue.use(PElement)
  Vue.mixin({
    // mounted() {
    //   Mock.setup({
    //     timeout: '800-1300'
    //   })
    // }
  })
  Vue.component('demo-block', DemoBlock)
}
