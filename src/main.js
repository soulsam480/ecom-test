import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firebase-database";
import "firebase/firebase-auth";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

Vue.config.productionTip = false;

firebase.initializeApp({
  apiKey: "AIzaSyCS3qIer_CnkXykQbyoK7XEMeeJvCAYnGQ",
  authDomain: "ecom-test-53555.firebaseapp.com",
  databaseURL: "https://ecom-test-53555.firebaseio.com",
  projectId: "ecom-test-53555",
  storageBucket: "ecom-test-53555.appspot.com",
  messagingSenderId: "328860335019",
  appId: "1:328860335019:web:0af8f449243f35648ef0ee"
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
