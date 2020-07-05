import Vue from "vue";
import Vuex from "vuex";

import firebase from "firebase/app";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth: false,
    productData: [],
    user: {
      loggedIn: false,
      data: null,
    },
    authCred: {
      id: "soulsam480@gmail.com",
      password: "i877isfu*kC9Tt",
    },
    Wishlist: [],
  },
  mutations: {
    getData(state) {
      state.productData = [];
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
    setLogIn(state, value) {
      state.user.loggedIn = value;
    },
    setUser(state, data) {
      state.user.data = data;
    },
    addWishlist(state, id) {
      var wishlist = firebase.database().ref(`/Users/${id}/wishlist`);
      wishlist.on("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          state.Wishlist.push(childSnapshot.val());
        });
      });
    },
  },
  actions: {
    addData(context) {
      context.commit("getData");
    },
    changeAuth(context) {
      context.commit("cAuth");
    },
    fetchUser({ commit }, user) {
      commit("setLogIn", user !== null);
      if (user) {
        commit("setUser", {
          displayName: user.displayName,
          email: user.email,
          imgUrl: user.photoURL,
          userId: user.uid,
          pNum: user.phoneNumber,
          emailVerified: user.emailVerified,
        });
      } else {
        commit("setUser", null);
      }
    },
    fetchWishlist({ commit }, user) {
      if (user) {
        commit("addWishlist", user.uid);
      }
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
    user(state) {
      return state.user;
    },
    authCredGet(state) {
      return state.authCred;
    },
    getWishlist: (state) => (id) => {
      return state.Wishlist.includes(id);
    },
    getWishlistLoc: (state) => (id) => {
      return state.Wishlist.indexOf(id);
    },
  },
  modules: {},
});
