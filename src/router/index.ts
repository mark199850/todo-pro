import { createRouter, createWebHistory } from 'vue-router'
import DailyToDoView from '../views/ToDoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'todos',
      component: DailyToDoView,
    },
    {
      path: '/weather',
      name: 'weather',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/WeatherView.vue'),
    },
  ],
})

export default router
