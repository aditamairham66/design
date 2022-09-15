import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import KonvaTest from '../views/KonvaTest.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
    // component: KonvaTest
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
