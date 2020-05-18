import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      },
      {
        path: '/test',
        name: 'test',
        component: () => import('../views/test.vue')
      },
      {
        path: '/rankinglist',
        name: 'RankingList',
        component: () => import('../views/RankingList.vue')
      }
    ]
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/register.vue')
  },
  {
    path: '/mymessage',
    name: 'MyMessage',
    component: () => import('../views/MyMessage.vue')
  },
  {
    path: '/ranking/:id',
    name: 'Ranking',
    component: () => import('../views/Ranking.vue')
  },
  {
    path: '/mv/:id',
    name: 'Mv',
    component: () => import('../views/Mv.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
