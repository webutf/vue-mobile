import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const routes = [
  { path: '*', redirect: '/login'},
  { path: '/login', component: r => System.import('../views/login/index.vue') },
  { path: '/index', component: r => System.import('../views/index/index.vue') },
]


export default new Router({
  routes
})
