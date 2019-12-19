import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'playlist-view',
      component: () => import('@/views/playlistView')
    },
    {
      path: '/playlist?:name',
      name: 'playlist-contents',
      component: () => import('@/views/playlistContents')
    },
    {
      path: '/search?:item',
      name: 'search',
      component: () => import('@/views/search')
    },
    {
      path: '/play',
      name: 'play',
      component: () => import('@/views/play')
    },
    {
      path: '/piano',
      name: 'piano',
      component: () => import('@/views/piano')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
