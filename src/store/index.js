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
/*       wishlist: [],
 */    },
    authCred: {
      id: "soulsam480@gmail.com",
      password: "i877isfu*kC9Tt",
    },
  },
  mutations: {
    getData(state) {
      var starCountRef = firebase.database().ref("/Products");
      var main = state.productData;
      if (main.length === 0) {
        starCountRef.on("value", (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            state.productData.push(childSnapshot.val());
          });
        });
      } else {
        var pos = main.length;
        starCountRef.on("value", (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            state.productData.splice(pos, 0, childSnapshot.val());
          });
        });
      }
    },
    cAuth(state) {
      state.auth = !state.auth;
    },
    setLogIn(state, value) {
      state.user.loggedIn = value;
    },
    setUser(state, data) {
      state.user.data = data;
    }/* ,
    syncWishlist(state, id) {
      var wishRef = firebase.database().ref(`/Users/${id}/wishlist`);
      var wish = state.user.wishlist;
      if (wish.length === 0) {
        wishRef.on("value", (snap) => {
          snap.forEach((childSnapshot) => {
            wish.push(childSnapshot.val());
          });
        });
      } else {
        var wishPos = wish.length;
        wishRef.on("value", (snap) => {
          snap.forEach((childSnapshot) => {
            wish.splice(wishPos, 0, childSnapshot.val());
          });
        });
      }
    },
    changeWishes(state,data){
      state.user.wishlist = data;
    } */
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
    }/* ,
    addWishes({ commit }, id) {
      commit("syncWishlist", id);
    } */
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
    }/* ,
    getWishlist: (state) => {
      return state.user.wishlist;
    } */
  },
  modules: {},
});
