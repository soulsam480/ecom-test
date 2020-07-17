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

import image from './assets/lazy-img.svg'

Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: image,
  attempt: 2,
  observer: true,
});
Vue.use(VueAgile);
Vue.config.productionTip = false;

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged((user) => {
  store.dispatch("fetchUser", user);
  if (user) {
    store.dispatch("syncCart", user.uid);
    store.dispatch("syncWishes", user.uid);
    /*     store.dispatch("addWishes", user.uid);
     */ store.commit("syncAddress", user.uid);
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
