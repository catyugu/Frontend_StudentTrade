import Vue from 'vue'
import Router from 'vue-router'
import ProjectHome from '@/views/project/projectHome.vue';
import userHome from '@/views/user/userHome.vue';
import HelpHome from '@/views/help/helpHome.vue'
import lectureHome from '@/views/lecture/lectureHome.vue';
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'projectHome',
      component: ProjectHome
    },
    {
      path: '/project/projectHome',
      name: 'projectHome',
      component: ProjectHome
    },
    {
      path: '/user/userHome',
      name: 'userHome',
      component:userHome
    },
    {
      path: '/lecture/lectureHome',
      name: 'lectureHome',
      component: lectureHome
    },
    {
      path: '/help/HelpHome',
      name: 'HelpHome',
      component: HelpHome
    }
  ]
})