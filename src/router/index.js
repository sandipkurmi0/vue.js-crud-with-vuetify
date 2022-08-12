import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'tutorials',
    component: () => import('../views/TutorialsList.vue')
  },
  {
    path: '/tutorials/:id',
    name: 'tutorial-details',
    component: () => import('../views/Tutorial.vue')
  },
  {
    path: '/add',
    name: 'add',

    component: () => import('../views/AddTutorial.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
