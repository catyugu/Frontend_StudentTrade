import Vue from 'vue'
import Router from 'vue-router'
import ProjectHome from '@/views/project/projectHome.vue';
import userHome from '@/views/user/userHome.vue';
import HelpHome from '@/views/help/helpHome.vue'
import lectureHome from '@/views/lecture/lectureHome.vue';
import loginPage from '@/views/user/loginPage.vue';
import registerPage from '@/views/user/registerPage.vue';
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'projectHome',
      component: ProjectHome
    },
    {
      path: '/project',
      name: 'projectHome',
      component: ProjectHome
    },
    {
      path: '/user',
      name: 'userHome',
      component:userHome
    },
    {
      path: '/lecture',
      name: 'lectureHome',
      component: lectureHome
    },
    {
      path: '/help',
      name: 'HelpHome',
      component: HelpHome
    },
    {
      path: '/user/login',
      name: 'login',
      component: loginPage
    },
    {
      path: '/user/register',
      name: 'register',
      component: registerPage
    }
  ]
})