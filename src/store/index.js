import Vue from 'vue'
import Vuex from 'vuex'

const fb = require('firebase');
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentUser: null,
        userProfile: {},
        socketMessage: '',
        isConnected: false
    },
    mutations: {
        setCurrentUser(state, val) {
            state.currentUser = val
        },
        setUserProfile(state, val) {
            state.userProfile = val
        },
        SOCKET_CONNECT(state) {
            state.isConnected = true;
        },

        SOCKET_DISCONNECT(state) {
            state.isConnected = false;
        },

        SOCKET_MESSAGECHANNEL(state, message) {
            state.socketMessage = message
        }
    },
    getters: {
        user: state => state.currentUser
    },
    actions: {
        async signInUser({commit, state}, {email, password}) {
            console.log(email);
                const data = await fb.auth().signInWithEmailAndPassword(email, password);
                commit('setCurrentUser', email);
                return data;
        },
        async signOutUser({commit}) {
                const data = await fb.auth().signOut();
                commit('setCurrentUser', null);
                return data;
        },
        async createUser({commit}, {email, password}) {
            const data = await  fb.auth.createUserWithEmailAndPassword(email, password);
            commit('setCurrentUser', email);
            return data;
        }
    },
    modules: {
        
    }
})
