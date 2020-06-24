import Vue from 'vue'
import App from './Frame.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VeeValidate from 'vee-validate'

// const fb = require('./firebaseConfig.js');
import * as firebase from 'firebase';
const config = {
  apiKey: "AIzaSyAvyhXUYHIvtDYHJy48OJ8YjIr22UetfSo",
  authDomain: "shiteracerauth.firebaseapp.com",
  databaseURL: "https://shiteracerauth.firebaseio.com",
  projectId: "shiteracerauth",
  storageBucket: "shiteracerauth.appspot.com",
  messagingSenderId: "40495824169",
  appId: "1:40495824169:web:a5af501a02c74cecba8b38",
  measurementId: "G-BRWVWD9R34"
};
firebase.initializeApp(config);
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';

// Hosted
// const socket = io('ec2-18-204-21-92.compute-1.amazonaws.com:3000');

//Local
const socket = io('localhost:3000/');
Vue.use(VueSocketIOExt, socket);



Vue.config.productionTip = false;

Vue.use(VeeValidate);




console.log(firebase);
let app: any;
firebase.auth().onAuthStateChanged(user => {
    if (!app) {
        app = new Vue({
            el: '#app',
            router,
            store,
            vuetify,
            render: h => h(App)
        })
    }
});
