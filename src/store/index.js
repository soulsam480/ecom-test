import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state) => ({cart: state.cart , wishlist: state.user.wishlist}),

})
import firebase from "firebase/app";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth: false,
    productData: [],
    user: {
      loggedIn: false,
      data: null,
      wishlist: [],
    },
    authCred: {
      id: "soulsam480@gmail.com",
      password: "i877isfu*kC9Tt",
    },
    cart: [],
    cartUIStatus: "idle",
    checkedOut: false,
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
    },
    updateCartUI: (state, payload) => {
      state.cartUIStatus = payload;
    },
    clearCart: (state) => {
      //this clears the cart
      (state.cart = []), (state.cartUIStatus = "idle");
    },
    addToCart: (state, payload) => {
      let itemfound = state.cart.find((el) => el.id === payload.id);
      itemfound
        ? (itemfound.quantity += payload.quantity)
        : state.cart.push(payload);
    },
    setClientSecret: (state, payload) => {
      state.clientSecret = payload;
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
    fromLogin(state, id) {
      const cartref = firebase.database().ref(`/Users/${id}/cart`);
      cartref.on("value", (snap) => {
        snap.forEach((csnap) => {
          let itemfound = state.cart.find((el) => el.id === csnap.val().id);
          itemfound
            ? state.cart.splice(state.cart.indexOf(itemfound), 1, csnap.val())
            : state.cart.push(csnap.val());
        });
      });
    },
    addToWishlist(state, load) {
      let itemfound = state.user.wishlist.find((el) => el === load);
      itemfound
        ? state.user.wishlist.splice(state.user.wishlist.indexOf(itemfound), 1, load)
        : state.user.wishlist.push(load);
    },
    removeFromWishlist(state, load) {
      let itemfound = state.user.wishlist.find((el) => el === load);
      state.user.wishlist.splice(state.user.wishlist.indexOf(itemfound), 1);
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
    syncCart({ commit }, id) {
      commit("fromLogin", id);
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
    cartCount: (state) => {
      if (!state.cart.length) return 0;
      return state.cart.length;
      /*       return state.cart.reduce((ac, next) => ac + next.quantity, 0);
       */
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
    getWishlist: (state) =>{
      return state.user.wishlist
    }
  },
  plugins: [vuexLocal.plugin],

  modules: {},
});
