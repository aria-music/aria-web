import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '*',
    //   redirect: '/playlist'
    // },
    {
      path: '/',
      name: 'playlist-view',
      component: () => import('@/views/playlistView')
    },
    {
      path: '/:name',
      name: 'playlist-contents',
      component: () => import('@/views/playlistContents')
    }
  ]
})
