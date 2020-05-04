import Vue from 'vue'
import Vuex from 'vuex'
import state from './store.js'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
   state,
   mutations,
   getters
})