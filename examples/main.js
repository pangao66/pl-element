import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import PlElement from '@/index'
// import FileHandle from '@/index'
// Vue.use(FileHandle)
Vue.use(ElementUI)
Vue.use(PlElement)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
