import Vue from 'vue'
import App from './App.vue'
import VueRouter  from 'vue-router';
import ElementUI from 'element-ui'
import './assets/main.css'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
Vue.use(VueRouter)
import Router from './utils/router'
new Vue({
  render:(h)=>h(App),
  router:Router,
}).$mount('#app')
