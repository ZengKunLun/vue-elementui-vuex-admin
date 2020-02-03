import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: () => import('../components/page/Login.vue'),
    },
    {
      path: '/home',
      component: () => import('../components/common/Home.vue'),
      children: [
        {
          path: '/dashboard',
          component: () => import('../components/page/Dashboard.vue'),
        },
        {
          path: '/baseTable',
          component: () => import('../components/page/BaseTable.vue'),
        },
        {
          path: '/message',
          component: () => import('../components/page/Message.vue'),
        },
        {
          path: '/baseForm',
          component: () => import('../components/page/BaseForm.vue'),
        },
        {
          path: '/chart',
          component: () => import('../components/page/Chart.vue'),
        },
        {
          path: '/moveTable',
          component: () => import('../components/page/MoveTable.vue'),
        },
        {
          path: '/authorityTest',
          component: () => import('../components/page/AuthorityTest.vue'),
        },
        {
          path: '/nothing',
          component: () => import('../components/page/Nothing.vue'),
        },
      ]
    },
    {
      path: '*',
      component: () => import('../components/page/Nothing.vue'),
    }
  ]
})

export default router 
