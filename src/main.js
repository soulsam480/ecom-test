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
import config from "./creds/firebase";
/* const $ = require('jquery')
window.$ = $ */

Vue.use(VueLazyload);
// or with options
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: "./assets/Infinity-1s-200px.svg",
  attempt: 1,
});
Vue.use(VueAgile);
Vue.config.productionTip = false;

firebase.initializeApp(config);


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
