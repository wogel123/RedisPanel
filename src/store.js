import Vue from 'vue'
import Vuex from 'vuex'

import {
    usersCollection,
} from "@/services/database";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentUser: null,
        userProfile: {},
        translations_language: "fr"
    },
    mutations: {
        setCurrentUser(state, val) {
            state.currentUser = val
        },
        setUserProfile(state, val) {
            state.userProfile = val
        }
    },
    actions: {
        async fetchUserProfile({
                                   commit,
                                   state
                               }) {
            try {
                const res = await usersCollection.doc(state.currentUser.uid).get();
                commit('setUserProfile', res.data());
            } catch (error) {
                console.log(error)
            }
        }
    }
})