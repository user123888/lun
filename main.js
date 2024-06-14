import App from './App'
// import uView from 'uview-ui'


// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
import uView from './uni_modules/uview-ui'
Vue.use(uView)
// 如此配置即可
uni.$u.config.unit = 'px'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif