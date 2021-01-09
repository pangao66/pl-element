// import
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueHighlightJS from 'vue-highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import DemoBlock from './components/demo-block'
import  HelloWord from '../../examples/components/HelloWorld.vue'
import PlElement from '../../packages/index'
export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {
  Vue.component(HelloWord.name,HelloWord)
  Vue.use(ElementUI);
  Vue.component('demo-block', DemoBlock)
  Vue.use(VueHighlightJS)
  Vue.use(PlElement, {
    tableConfig: {
      stripe: true,
      border: true,
      highlightCurrentRow: true,
      dbClickCopy: true
    },
    selectConfig: {
      filterable: true,
      clearable: true,
      'default-first-option': true
    },
    inputConfig: {
      clearable: true
    },
    pageConfig: {
      background: true,
      layout: 'total, sizes, prev, pager, next, jumper',
      'page-sizes': [10, 20, 50, 100],
      pageSize: 10
    },
    formConfig: {
      'label-position': 'right',
      'label-width': '120px',
      'label-suffix': '：'
    },
    dateConfig: {
      format: 'yyyy-MM-dd',
      clearable: true,
      'value-format': 'yyyy-MM-dd',
      'range-separator': '至',
      'start-placeholder': '开始日期',
      'end-placeholder': '结束日期',
      placeholder: '请选择日期'
    }
  })
}
