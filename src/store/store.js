import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    searchResult: [],
}

const mutations = {
    setSearchResult(state,payload){
        state.searchResult = payload.value
    }
}

export default new Vuex.Store({
    state,
    mutations
})