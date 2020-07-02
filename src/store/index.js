import Vue from "vue";
import Vuex from "vuex";

import firebase from "firebase/app";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth: false,
    productData: [],
  },
  mutations: {
    getData(state) {
      var starCountRef = firebase.database().ref("/Products");
      starCountRef.on("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          state.productData.push(childSnapshot.val());
        });
      });
    },
    cAuth(state) {
      state.auth = !state.auth;
    },
  },
  actions: {
    addData(context) {
      context.commit("getData");
    },
    changeAuth(context) {
      context.commit("cAuth");
    },
  },
  getters: {
    getProducts(state) {
      return state.productData;
    },
    getAuth(state) {
      return state.auth;
    },
    product: (state) => (id) => {
      return state.productData.find((el) => el.id === id);
    },
    women: (state) => state.productData.filter((el) => el.cats === "Women"),
    men: (state) => state.productData.filter((el) => el.cats === "Men"),
  },
  modules: {},
});
