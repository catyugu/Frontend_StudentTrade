import Vue from 'vue'
import Router from 'vue-router'
import ProjectHome from '@/views/projectHome.vue';
import userHome from '@/views/userHome.vue';
import editPage from '@/views/editPage.vue';
import aboutUs from '@/views/aboutUs.vue'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/projectHome',
      name: 'projectHome',
      component: ProjectHome
    },
    {
      path: '/userHome',
      name: 'userHome',
      component:userHome
    },
    {
      path: '/editPage',
      name: 'editPage',
      component: editPage
    },
    {
      path: '/aboutUs',
      name: 'aboutUs',
      component: aboutUs
    }
  ]
})