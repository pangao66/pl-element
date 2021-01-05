// import VueHighlightJS from 'vue-highlight.js'
// import 'highlight.js/styles/atom-one-dark.css'
import Element from 'element-ui'
import PlElement from '../../index'
import DemoBlock from './components/demo-block'
// import 'element-ui/lib/theme-chalk/index.css'
import './mock'
import Mock from './mock/base-table'
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
  Vue.mixin({
    mounted () {
      Mock.setup({
        timeout: '800-1300'
      })
    }
  })
  Vue.component('demo-block', DemoBlock)
  /**
   * 路由切换事件处理
   */
  router.beforeEach((to, from, next) => {
    console.log("切换路由", to.fullPath, from.fullPath);

    //触发百度的pv统计
    if(process.env.NODE_ENV === 'production'){
      if (typeof _hmt != "undefined") {
        if (to.path) {
          _hmt.push(["_trackPageview", to.fullPath]);
          console.log("上报百度统计", to.fullPath);
        }
      }
    }
    // continue
    next();
  });
}
