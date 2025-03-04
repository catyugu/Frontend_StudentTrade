const projectRoutes = [
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
  }
];

export default projectRoutes;