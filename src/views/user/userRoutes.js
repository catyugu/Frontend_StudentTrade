const userRoutes = [
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
  }
];

export default userRoutes;