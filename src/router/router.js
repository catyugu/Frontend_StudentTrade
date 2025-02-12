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
import TeacherInfo from '@/views/user/teacherInfo.vue';
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
      path: '/user/teacherInfo',
      name: 'teacherInfo',
      component: TeacherInfo,
      props:true,
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
      path: '/help',
      name: 'HelpHome',
      component: HelpHome
    },
  ]
})