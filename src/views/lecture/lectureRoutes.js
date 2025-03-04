const lectureRoutes = [
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
  }
];

export default lectureRoutes;