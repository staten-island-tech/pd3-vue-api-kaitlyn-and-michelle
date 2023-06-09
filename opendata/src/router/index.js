import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Chart1 from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Squirrel Ages',
      component: HomeView
    },

    {
      path: '/chart1',
      name: 'Chart1',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Chart1.vue')
    },
    {
      path: '/chart2',
      name: 'Squirrel Height',
      // // route level code-splitting
      // // this generates a separate chunk (About.[hash].js) for this route
      // // which is lazy-loaded when the route is visited.
      component: () => import('../views/Chart2.vue')
    }
  ]
})

export default router
