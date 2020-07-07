import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    searchResult: [],
    newsHot: [],
}

const mutations = {
    setSearchResult(state, payload) {
        state.searchResult = payload.value
    },
    setNewsHot(state, payload) {
        var id  = payload.id;
        var flag = true;
        state.newsHot.forEach(value => {
            if (value.id == id) {
                value.hot++;
                flag = false;
            }
        })
        if (flag) {
            var clickObject = {};
            clickObject.id = id;
            clickObject.hot = 1;
            state.newsHot.push(clickObject);
        }
    },
    clearNewsHot(state,payload){
        state.newsHot = [];
    }
}

export default new Vuex.Store({
    state,
    mutations
})