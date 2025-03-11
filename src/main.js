import Vue from 'vue'
import App from './App.vue'
import VueRouter  from 'vue-router';
import ElementUI from 'element-ui'
import './assets/main.css'
import store from '@/store/global'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
Vue.use(VueRouter)
import Router from './router/router'
new Vue({
  store,
  render:(h)=>h(App),
  router:Router,
  async created(){
    console.log('App mounted');
    let userState = JSON.parse(localStorage.getItem('userState'));
    if (userState !== null) {
      await this.$store.dispatch('getUserStateFromLocalStorage');
      if (await this.$store.dispatch('refreshUserInfo')) {
        console.log('refreshUserInfo success')
      } else {
        await this.$store.dispatch('logoutProcess')
        await this.$router.push('/user/login');
      }
    }else {
      await this.$router.push('/user/login');
    }
    // 添加全局响应拦截器
    this.$store.state.http.interceptors.response.use(
      response => response,
      error => {
        if (error.response && error.response.status === 401) {
          this.$store.dispatch('logoutProcess')
          Router.push('/user/login'); // 假设登录页面的路由为 '/login'
        }
        return Promise.reject(error);
      }
    );
  },

}).$mount('#app')
