import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firebase-database";
import "firebase/firebase-auth";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import VueAgile from "vue-agile";
import VueLazyload from "vue-lazyload";
/* const $ = require('jquery')
window.$ = $ */

Vue.use(VueLazyload);
// or with options
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: "dist/error.png",
  loading: "dist/loading.gif",
  attempt: 1,
});
Vue.use(VueAgile);
Vue.config.productionTip = false;

firebase.initializeApp({
  apiKey: "AIzaSyCS3qIer_CnkXykQbyoK7XEMeeJvCAYnGQ",
  authDomain: "ecom-test-53555.firebaseapp.com",
  databaseURL: "https://ecom-test-53555.firebaseio.com",
  projectId: "ecom-test-53555",
  storageBucket: "ecom-test-53555.appspot.com",
  messagingSenderId: "328860335019",
  appId: "1:328860335019:web:0af8f449243f35648ef0ee",
});


firebase.auth().onAuthStateChanged((user) => {
  store.dispatch("fetchUser", user);
  if(user){
    store.dispatch("syncCart",user.uid);
    store.commit('addWishes',user.uid)
    store.commit('syncAddress',user.uid)
  }
  /* if (user) {
    store.dispatch("addWishes", user.uid);
  } */
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
