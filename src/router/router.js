import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/App.vue'),
      redirect: '/project',
      children: [
        {
          path: '/project',
          name: 'projectHome',
          component: () => import('@/views/project/projectHome.vue')
        },
        {
          path: '/project/upload',
          name: 'projectUpload',
          component: () => import('@/views/project/projectUpload.vue')
        },
        {
          path: 'project/detail',
          name: 'projectDetail',
          component: () => import('@/views/project/projectDetail.vue')
        },
        {
          path: '/project/like',
          name: 'projectLike',
          component: () => import('@/views/project/projectLike.vue')
        },
        {
          path: '/project/manage',
          name: 'projectManage',
          component: () => import('@/views/project/projectManage.vue')
        },
        {
          path: '/project/edit',
          name: 'ProjectEdit',
          component: () => import('@/views/project/projectEdit.vue')
        },
        {
          path: '/user',
          name: 'userHome',
          component: () => import('@/views/user/userHome.vue')
        },
        {
          path: '/user/login',
          name: 'Login',
          component: () => import('@/views/user/loginPage.vue')
        },
        {
          path: '/user/register',
          name: 'register',
          component: () => import('@/views/user/registerPage.vue')
        },
        {
          path: '/user/changePwd',
          name: 'changePwd',
          component: () => import('@/views/user/changePassword.vue')
        },
        {
          path: '/user/userInfoDisplay',
          name: 'UserInfoDisplay',
          component: () => import('@/views/user/userInfoDisplay.vue')
        },
        {
          path: '/lecture',
          name: 'LectureHome',
          component: () => import('@/views/lecture/lectureHome.vue')
        },
        {
          path: '/lecture/upload',
          name: 'LectureUpload',
          component: () => import('@/views/lecture/lectureUpload.vue')
        },
        {
          path: '/lecture/edit',
          name: 'LectureEdit',
          component: () => import('@/views/lecture/lectureEdit.vue')
        },
        {
          path: '/lecture/detail',
          name: 'lectureDetail',
          component: () => import('@/views/lecture/lectureDetail.vue')
        },
        {
          path: '/lecture/reserve',
          name: 'LectureReserve',
          component: () => import('@/views/lecture/lectureReserve.vue')
        },
        {
          path: '/lecture/manage',
          name: 'LectureManage',
          component: () => import('@/views/lecture/lectureManage.vue')
        },
        {
          path: '/help',
          name: 'HelpHome',
          component: () => import('@/views/help/helpHome.vue')
        },
      ]
    }
  ]
})