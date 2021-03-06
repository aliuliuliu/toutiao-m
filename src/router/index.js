import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/')
  },
  {
    path: '/',
    component: () => import('@/views/layout/'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home/')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa/')
      }, {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video/')
      }, {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my/')
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article/'),
    // 将动态路由参数映射到组件的props中，无论是访问维护性 都很方便
    props: true
  },
  {
    path: '/user/proflie',
    name: 'user-proflie',
    component: () => import('@/views/user-profile/')
  },
  {
    path: '/dome',
    name: 'dome',
    component: () => import('@/views/dome/父组件.vue')
  },
  {
    path: '/user/chat',
    name: 'userchat',
    component: () => import('@/views/user-chat/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
