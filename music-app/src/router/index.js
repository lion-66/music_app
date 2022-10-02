import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import ItemMusic from '../views/ItemMusic.vue'
import store from '@/store'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/ItemMusic',
    name: 'ItemMusic',
    
    component: () => import('../views/ItemMusic.vue')
  },
  {
    path: '/search',
    name: 'Search',
    
    component: () => import('../views/Search.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    
    component: () => import('../views/Login.vue')
  },
  {
    path: '/infoUser',
    name: 'infoUser',
    beforeEnter: (to, from, next) => {
      // || store.state.token || localStorage.getItem('token')
      if(store.state.isUser || store.state.token){
        next()
      }else{
        next('/Login')
      }
    },
    component: () => import('../views/infoUser.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from) => {
  if(to.path == '/Login'){
    store.state.isFooterMusic = false
  }else{
    store.state.isFooterMusic = true
  }
})
export default router
