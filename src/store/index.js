import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import firebase from "firebase/app";
import react from "../plugins/react";
import { vuexfireMutations, firebaseAction } from "vuexfire";

//All imports

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    auth: false,
    productData: [],
    user: {
      loggedIn: false,
      data: null,
      wishlist: [],
      address: [],
      orders: [],
    },
    cart: [],
    cartUIStatus: "idle",
    checkedOut: false,
    order: {},
  },
  mutations: {
    ...vuexfireMutations,

    setLogIn(state, value) {
      state.user.loggedIn = value;
    },
    setUser(state, data) {
      state.user.data = data;
    },
    updateCartUI: (state, payload) => {
      state.cartUIStatus = payload;
    },
    clearCart: (state) => {
      (state.cart = []), (state.cartUIStatus = "idle");
    },
    addToCart: (state, payload) => {
      let itemfound = state.cart.find((el) => el.id === payload.id);
      itemfound
        ? (itemfound.quantity += payload.quantity)
        : state.cart.push(payload);
    },
    addOneToCart: (state, payload) => {
      let itemfound = state.cart.find((el) => el.id === payload.id);
      itemfound ? itemfound.quantity++ : state.cart.push(payload);
    },
    removeOneFromCart: (state, payload) => {
      let index = state.cart.findIndex((el) => el.id === payload.id);
      state.cart[index].quantity
        ? state.cart[index].quantity--
        : state.cart.splice(index, 1);
    },
    removeAllFromCart: (state, payload) => {
      state.cart = state.cart.filter((el) => el.id !== payload.id);
    },
    cartAdd(state, id) {
      const cartref = firebase.database().ref(`/Users/${id}/shop/cart`);
      cartref.on("value", (snap) => {
        snap.forEach((csnap) => {
          let itemfound = state.cart.find((el) => el.id === csnap.val().id);
          itemfound
            ? state.cart.splice(
                state.cart.findIndex((x) => x.id === itemfound.id),
                1,
                csnap.val()
              )
            : state.cart.push(csnap.val());
        });
      });
    },
    addWishes(state, id) {
      const wishref = firebase.database().ref(`/Users/${id}/shop/wishlist`);
      wishref.on("value", (snap) => {
        state.user.wishlist = Object.values(snap.val());
        /*  snap.forEach((csnap) => {
          let wishFound = state.user.wishlist.find(
            (el) => el.id === csnap.val().id
          );
          wishFound
            ? state.user.wishlist.splice(
                state.user.wishlist.findIndex((x) => x.id === wishFound.id),
                1,
                csnap.val()
              )
            : state.user.wishlist.push(csnap.val());
        }); */
      });
    },
    clearWishlist(state) {
      state.user.wishlist = [];
    },
    addToWishlist(state, load) {
      let itemfound = state.user.wishlist.find((el) => el.id === load.id);
      itemfound
        ? window.alert("Already on Wishlist")
        : state.user.wishlist.push(load);
    },
    removeFromWishlist(state, load) {
      let itemfound = state.user.wishlist.find((el) => el.id === load.id);
      state.user.wishlist.splice(state.user.wishlist.indexOf(itemfound), 1);
    },
    syncAddress: (state, id) => {
      const adRef = firebase.database().ref(`/Users/${id}/address`);
      adRef.on("value", (snap) => {
        state.user.address = Object.values(snap.val());
      });
    },
    clearAddress(state) {
      state.user.address = [];
    },
    localOrder: (state, load) => {
      state.order = load;
    },
    clearLocalOrder: (state) => {
      state.order = {};
    },
    syncOrders: async (state, id) => {
      const odRef = await firebase.database().ref(`/Users/${id}/orders`);
      odRef.on("value", (snap) => {
        state.user.orders = Object.values(snap.val()).sort(
          (a, b) => b.stamp - a.stamp
        );
      });
    },
  },
  actions: {
    addData: firebaseAction(({ bindFirebaseRef }) => {
      return bindFirebaseRef(
        "productData",
        firebase.database().ref(`/Products`)
      );
    }),

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
    syncCart({ commit }, id) {
      commit("cartAdd", id);
    },
    syncWishes({ commit }, id) {
      commit("addWishes", id);
    },
  },
  getters: {
    getProducts(state) {
      return state.productData;
    },
    women: (state) =>
      state.productData.filter((el) => el.cats.includes("Women")),
    men: (state) => state.productData.filter((el) => el.cats.includes("Men")),
    user(state) {
      return state.user;
    },

    cartCount: (state) => {
      if (!state.cart.length) return 0;
      return state.cart.length;
    },
    cartTotal: (state) => {
      if (!state.cart.length) return 0;
      return state.cart.reduce(
        (ac, next) => ac + next.quantity * next.price,
        0
      );
    },
    cartItems: (state) => {
      if (!state.cart.length) return [];
      return state.cart.map((item) => {
        return {
          id: item.id,
          quantity: item.quantity,
        };
      });
    },
    getWishlist: (state) => {
      return state.user.wishlist;
    },
    wishCount: (state) => {
      if (!state.user.wishlist.length) return 0;
      return state.user.wishlist.length;
    },
    getAddresses: (state) => {
      return state.user.address;
    },
    getLocalOrder: (state) => {
      return state.order;
    },
    getOrders: (state) => {
      return state.user.orders;
    },
  },
  plugins: [
    createPersistedState({
      paths: ["cart", "user.wishlist", "auth", "order"],
    }),
    react,
  ],

  modules: {},
});
