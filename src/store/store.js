import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import { webSocketPlugin } from '@/plugins/vuexPlugin'

Vue.use(Vuex)
const plugin = webSocketPlugin()

const store = new Vuex.Store({
  plugins: [ plugin ],
  state,
  mutations,
  actions
})

export default store