import Vue from 'vue'
import Router from 'vue-router'
import ProjectHome from '@/views/project/projectHome.vue';
import HelpHome from '@/views/help/helpHome.vue'
import ProjectDetail from '@/views/project/projectDetail.vue';
import LectureDetail from '@/views/lecture/lectureDetail.vue';
import UserInfoDisplay from '@/views/user/userInfoDisplay.vue';
import LectureReserve from '@/views/lecture/lectureReserve.vue';
import ProjectUpload from '@/views/project/projectUpload.vue';
import ProjectManage from '@/views/project/projectManage.vue';
import UserHome from '@/views/user/userHome.vue';
import LoginPage from '@/views/user/loginPage.vue';
import LectureUpload from '@/views/lecture/lectureUpload.vue';
import LectureHome from '@/views/lecture/lectureHome.vue';
import RegisterPage from '@/views/user/registerPage.vue';
import ProjectLike from '@/views/project/projectLike.vue';
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
      component: ProjectUpload
    },
    {
      path: 'project/detail',
      name: 'projectDetail',
      component: ProjectDetail,
    },
    {
      path: '/project/like',
      name: 'projectLike',
      component: ProjectLike,
    },
    {
      path: '/project/manage',
      name: 'projectManage',
      component: ProjectManage,
    },
    {
      path: '/user',
      name: 'userHome',
      component:UserHome,
    },
    {
      path: '/user/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/user/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/user/userInfoDisplay',
      name: 'UserInfoDisplay',
      component: UserInfoDisplay,
    },
    {
      path: '/lecture',
      name: 'lectureHome',
      component: LectureHome
    },
    {
      path: '/lecture/upload',
      name: 'lectureUpload',
      component: LectureUpload
    },

    {
      path: '/lecture/detail',
      name: 'lectureDetail',
      component: LectureDetail,
    },
    {
      path: '/lecture/reserve',
      name: 'lectureReserve',
      component: LectureReserve,
    },

    {
      path: '/help',
      name: 'HelpHome',
      component: HelpHome
    },
  ]
})