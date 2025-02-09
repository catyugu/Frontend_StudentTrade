import Vue from 'vue'
import Router from 'vue-router'
import ProjectHome from '@/views/projectHome.vue';
import userHome from '@/views/userHome.vue';
import HelpHome from '@/views/helpHome.vue'
import lectureHome from '@/views/lectureHome.vue';
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'projectHome',
      component: ProjectHome
    },
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
      path: '/lectureHome',
      name: 'lectureHome',
      component: lectureHome
    },
    {
      path: '/HelpHome',
      name: 'HelpHome',
      component: HelpHome
    }
  ]
})