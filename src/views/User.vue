<template>
  <div class="user container">
    <div v-if="user">
      <div class="row d-flex justify-content-center">
        <div class="col-md-4">
          <div class="row">
            <div class="col-xs-5">
              <img :src="user.data.imgUrl" class="u-img" alt="" />
            </div>
            <div class="col-xs-7 ">
              <h4>{{ user.data.displayName }}</h4>
              <button class="btn btn-outline-danger btn-sm" @click="logOut()">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-sm-3 text-center">
          <ul
            class="nav nav-pills mb-3 tabs-left "
            id="pills-tab"
            role="tablist"
          >
            <li class="nav-item">
              <a
                class="nav-link active"
                id="pills-home-tab"
                data-toggle="pill"
                href="#pills-home"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
                >Profile</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                id="pills-profile-tab"
                data-toggle="pill"
                href="#pills-profile"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
                >Orders</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                id="pills-contact-tab"
                data-toggle="pill"
                href="#pills-contact"
                role="tab"
                aria-controls="pills-contact"
                aria-selected="false"
                >Addresses</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                id="pills-support-tab"
                data-toggle="pill"
                href="#pills-support"
                role="tab"
                aria-controls="pills-support"
                aria-selected="false"
                >Support</a
              >
            </li>
          </ul>
        </div>
        <div class="col-sm-9">
          <div class="tab-content" id="pills-tabContent">
            <div
              class="tab-pane fade show active"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
            >
              ...
            </div>
            <div
              class="tab-pane fade"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
            >
              ...
            </div>
            <div
              class="tab-pane fade"
              id="pills-contact"
              role="tabpanel"
              aria-labelledby="pills-contact-tab"
            >
              ...
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
import router from "@/router/index.js"

export default {
  name: "User",
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  methods: {
    logOut() {
      firebase.auth().signOut();
      router.replace({ name: "Login" });
    },
  },
};
</script>

<style scoped>
.col-xs-5, .col-xs-7{
  padding: 10px;
}
@media (min-width: 576px){
.col-sm-3 {
    max-width: 100% !important;
    flex:none;
}
.col-sm-9 {
    max-width: 100% !important;
    flex:none;
}
}
@media (min-width: 768px){
.col-sm-3 {
    max-width: 25% !important;
    flex: 0 0 25%;
}
.col-sm-9 {
    max-width: 25% !important;
    flex: 0 0 25%;
}
}
.u-img {
  width: 100px;
  border-radius: 50%;
}
.user {
  padding-top: 20px;
}
.nav-pills .nav-link.active {
  background-color: #fddde2 !important;
  border-color: #fddde2 !important;
}
a {
  font-size: 17px;
  color: black !important;
}
a:hover {
  color: black !important;
  text-decoration: none;
}
.nav-tabs {
  border: none !important;
}

.tabs-left {
  display: flex !important;
  flex-direction: row !important;
  justify-content: space-evenly;
  background-color: #ffebee;
  border-radius: 5px;
}

.tabs-left li:hover {
  background-color: #fddde2;
  opacity: 0.9 !important;
}
@media only screen and (min-width:768px) {
  .tabs-left {
    display: flex !important;
    flex-direction: column !important;
    justify-content: flex-start;
    height: 500px;
  }
}
</style>
