import Vue from "vue";
import Vuex from "vuex";

import firebase from "firebase/app";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth:false,
    productData: [],
    user: "soulsam480",
    githubToken: "8a34ca8ac73dc0bc631d70102b605dfd374ea494",
  },
  mutations: {
    getData(state) {
      var starCountRef = firebase.database().ref("/Products");
      starCountRef.on("value", (snapshot) => {
        console.log(snapshot.toJSON())
        state.productData = snapshot.toJSON()
      });
      
    },
    cAuth(state){
      state.auth = !state.auth
    }
  },
  actions: {
    addData(context) {
      context.commit("getData");
    },
    changeAuth(context){
      context.commit('cAuth')
    }
  },
  getters:{

    getProducts(state){
      return state.productData
    },
    getAuth(state){
      return state.auth
    }
  },
  modules: {},
});
