import Vue from 'vue'
import Router from 'vue-router'
import ProjectHome from '@/views/project/projectHome.vue';
import userHome from '@/views/user/userHome.vue';
import HelpHome from '@/views/help/helpHome.vue'
import lectureHome from '@/views/lecture/lectureHome.vue';
import loginPage from '@/views/user/loginPage.vue';
import registerPage from '@/views/user/registerPage.vue';
import projectUpload from '@/views/project/projectUpload.vue';
import lectureUpload from '@/views/lecture/lectureUpload.vue';
import ProjectDetail from '@/views/project/projectDetail.vue';
import LectureDetail from '@/views/lecture/lectureDetail.vue';
import UserInfoDisplay from '@/views/user/userInfoDisplay.vue';
import projectLike from '@/views/project/projectLike.vue';
import LectureReserve from '@/views/lecture/lectureReserve.vue';
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
      path: '/project/upload',
      name: 'projectUpload',
      component: projectUpload
    },
    {
      path: 'project/detail',
      name: 'projectDetail',
      component: ProjectDetail,
      props:true,
    },
    {
      path: '/project/like',
      name: 'myLike',
      component: projectLike,
      props:true,
    },
    {
      path: '/user',
      name: 'userHome',
      component:userHome
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
    },
    {
      path: '/user/UserInfoDisplay',
      name: 'UserInfoDisplay',
      component: UserInfoDisplay,
      props: true,
    },
    {
      path: '/lecture',
      name: 'lectureHome',
      component: lectureHome
    },
    {
      path: '/lecture/upload',
      name: 'lectureUpload',
      component: lectureUpload
    },

    {
      path: '/lecture/detail',
      name: 'lectureDetail',
      component: LectureDetail,
      props:true,
    },
    {
      path: '/lecture/reserve',
      name: 'lectureReserve',
      component: LectureReserve,
      props:true,
    },

    {
      path: '/help',
      name: 'HelpHome',
      component: HelpHome
    },
  ]
})