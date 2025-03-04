import Vue from 'vue'
import Router from 'vue-router'
import projectRoutes from '@/views/project/projectRoutes'
import userRoutes from '@/views/user/userRoutes'
import lectureRoutes from '@/views/lecture/lectureRoutes'
import helpRoutes from '@/views/help/helpRoutes'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/App.vue'),
      redirect: '/project',
      children: [
        ...projectRoutes,
        ...userRoutes,
        ...lectureRoutes,
        ...helpRoutes
      ]
    }
  ]
})