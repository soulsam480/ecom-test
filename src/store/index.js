import Vue from "vue";
import Vuex from "vuex";

import firebase from "firebase/app";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth:false,
    productData: [],
 
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
