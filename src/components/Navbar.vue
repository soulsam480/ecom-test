<template>
  <div class="Navbar sticky-top">
    <a @click="changeNav()" class="hamburger menu-btn" id="nav-tog">
      <span></span>
    </a>
    <div class="main-menu-wrap" id="mnav-wrap">
      <div class="main-menu" @click="close">
        <router-link to="/">Home</router-link>
        <router-link to="/men">Men</router-link>
        <router-link to="/women">Women</router-link>
        <a href>Accessories</a>
        <hr />
        <div>
          <router-link v-if="user.loggedIn" to="/user">
            Hi, {{ user.data.displayName }} !
          </router-link>
          <router-link v-else to="/login"> Login</router-link>
        </div>
        <router-link to="/wishlist">Wishlist</router-link>
        <a v-if="user.loggedIn" @click="logOut">Sign Out</a>
      </div>
    </div>
    <div class="m-leftnav">
      <ul>
        <li>
          <div class="carttotal" v-if="cartCount > 0">{{ cartCount }}</div>

          <router-link to="/cart"
            ><img src="../assets/bag.svg" alt=""
          /></router-link>
        </li>
        <li>
          <div v-if="wishCount > 0" class="wishcount">
            {{ wishCount }}
          </div>
          <router-link to="/wishlist">
            <img src="../assets/heart.svg" alt=""
          /></router-link>
        </li>
        <li>
          <img src="../assets/search.svg" alt="" />
        </li>
      </ul>
    </div>
    <div>
      <ul class="nav-desktop" style="padding-inline-start:0 !important;">
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/men">Men</router-link>
        </li>
        <li>
          <router-link to="/women">Women</router-link>
        </li>
        <li>
          <a href>Accessories</a>
        </li>
      </ul>
    </div>
    <router-link to="/">
      <img src="../assets/w-logo.png" alt class="n-brand" />
    </router-link>
    <div>
      <ul class="nav-desktop">
        <li>
          <div v-bind:class="{ dropdown: user.loggedIn }">
            <router-link v-if="user.loggedIn" to="/user">
              Hi, {{ user.data.displayName }} !
            </router-link>
            <router-link v-else to="/login"> Login</router-link>
            <div class="d-content">
              <a href="">Orders</a>
              <a href="">Addresses</a>
              <a @click="logOut">Sign Out</a>
            </div>
          </div>
        </li>
        <li>
          <a href><img src="../assets/search.svg" alt=""/></a>
        </li>
        <li>
          <div v-if="wishCount > 0" class="wishcount">
            {{ wishCount }}
          </div>
          <router-link to="/wishlist">
            <img src="../assets/heart.svg" alt=""
          /></router-link>
        </li>
        <li>
          <div class="carttotal" v-if="cartCount > 0">{{ cartCount }}</div>
          <router-link to="/cart"
            ><img src="../assets/bag.svg" alt=""
          /></router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import firebase from "firebase";

export default {
  name: "Navbar",
  data: function() {
    return {};
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
    ...mapGetters(["cartCount", "wishCount"]),
    ...mapState(["cart", "checkedOut"]),
  },
  methods: {
    changeNav() {
      document.getElementById("nav-tog").classList.toggle("active");
      document.getElementById("mnav-wrap").classList.toggle("full");
    },
    logOut() {
      if (!this.checkedOut) {
        firebase
          .database()
          .ref(`/Users/${this.user.data.userId}`)
          .set({
            cart: this.cart,
            wishlist: this.user.wishlist,
          })
          .then(firebase.auth().signOut(), this.$store.commit("clearCart")),
          this.$store.commit("clearWishlist");
      } else {
        firebase.auth().signOut();
      }
    },
    close() {
      document.getElementById("mnav-wrap").classList.toggle("full");
      document.getElementById("nav-tog").classList.toggle("active");
    },
  },
};
</script>

<style>
a:hover{
  text-decoration: none !important;
}
.wishcount {
  position: absolute;
  border-radius: 1000px;
  background: black;
  color: white;
  font-size: 10px;
  top: 8px;
  right: 53px;
  text-align: center;
  font-size: 10px;
  font-weight: bold;
  height: 20px;
  width: 20px;
  line-height: 20px;
}
.carttotal {
  position: absolute;
  border-radius: 1000px;
  background: black;
  color: white;
  font-size: 10px;
  top: 8px;
  right: 12px;
  text-align: center;
  font-size: 10px;
  font-weight: bold;
  height: 20px;
  width: 20px;
  line-height: 20px;
}
@media only screen and (max-width: 768px) {
  .carttotal {
    top: -3px;
    left: 18px;
  }
  .wishcount {
    top: -3px;
    left: 55px;
  }
}
/* Dropdown Content (Hidden by Default) */
.d-content {
  display: none;
  position: absolute;
  background-color: #ffebee;
  min-width: 130px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 5px;
}

/* Links inside the dropdown */
.d-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  font-size: 19px;
  cursor: pointer;
}

/* Change color of dropdown links on hover */
.d-content a:hover {
  background-color: #fddde2;
}

/* Show the dropdown menu on hover */
.dropdown:hover .d-content {
  display: block;
}
.nav-desktop li a img {
  width: 18px;
}
@media only screen and (min-width: 768px) {
  .m-leftnav {
    display: none;
  }
}

.m-leftnav {
  position: absolute;
}
.m-leftnav ul {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.m-leftnav ul li {
  padding: 0 9px 0 9px;
}
.m-leftnav ul li img {
  width: 18px;
}
.n-brand {
  width: 70px;
  display: block;
}
.Navbar {
  z-index: 2;
  width: 100%;
  background-color: #ffebee;
  color: black;
  /*   box-shadow: 0 0 5px .2px rgba(0, 0, 0, 0.466);
 */
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
@media only screen and (max-width: 768px) {
  .nav-desktop {
    display: none !important;
  }
}
.nav-desktop li {
  display: inline-block;
  padding: 0px 10px 0px 10px;
}

.nav-desktop {
  margin: 0 !important;
}
.nav-desktop a {
  color: black !important;
}
.nav-desktop a:hover {
  text-decoration: none;
}
.nav-desktop a {
  text-decoration: none;
  font-size: 19px;
}

.nav-desktop li:hover {
  background-color: #fddde2;
}
.full {
  width: 80% !important;
}
.hamburger {
  display: block;
  right: 0;
  width: 25px;
  height: 27px;
  padding: 0px 5px 0 0;
  position: absolute;
  z-index: 3;
  top: 0;
  margin: 10px 10px 0 0;
}
@media only screen and (min-width: 768px) {
  .hamburger {
    display: none;
  }
}
@media only screen and (min-width: 768px) {
  .main-menu-wrap {
    display: none;
  }
}

.hamburger span {
  margin: -2px 0 0;
  position: absolute;
  top: 50%;
  width: 25px;
  height: 2px;
  border-radius: 1px;
  background-color: rgb(3, 3, 3);
  display: none;
  -webkit-transition-duration: 0s;
  -moz-transition-duration: 0s;
  transition-duration: 0s;
  -webkit-transition-delay: 0.2s;
  -moz-transition-delay: 0.2s;
  -o-transition-delay: 0.2s;
  -ms-transition-delay: 0.2s;
  transition-delay: 0.2s;
}

.hamburger span {
  display: block;
}

.hamburger span:before,
.hamburger span:after {
  position: absolute;
  content: "";
}

.hamburger span:before,
.hamburger span:after {
  width: 25px;
  height: 2px;
  border-radius: 1px;
  background-color: black;
  display: block;
}

.hamburger span:before {
  margin-top: -8px;
}

.hamburger span:after {
  margin-top: 8px;
}

.hamburger span:before {
  -webkit-transition-property: margin, -webkit-transform;
  -webkit-transition-duration: 0.2s;
  -webkit-transition-delay: 0.2s, 0s;
  -moz-transition-property: margin, -moz-transform;
  -moz-transition-duration: 0.2s;
  -moz-transition-delay: 0.2s, 0s;
  transition-property: margin, transform;
  transition-duration: 0.2s;
  transition-delay: 0.2s, 0s;
}

.hamburger span:after {
  -webkit-transition-property: margin, -webkit-transform;
  -webkit-transition-duration: 0.2s;
  -webkit-transition-delay: 0.2s, 0s;
  -moz-transition-property: margin, -moz-transform;
  -moz-transition-duration: 0.2s;
  -moz-transition-delay: 0.2s, 0s;
  transition-property: margin, transform;
  transition-duration: 0.2s;
  transition-delay: 0.2s, 0s;
}

.hamburger:hover {
  border: none;
}

.hamburger.active span {
  background-color: rgba(0, 0, 0, 0);
  -webkit-transition-delay: 0.2s;
  -moz-transition-delay: 0.2s;
  -o-transition-delay: 0.2s;
  -ms-transition-delay: 0.2s;
  transition-delay: 0.2s;
}

.hamburger.active span:before {
  margin-top: 0;
  -webkit-transform: rotate(45deg);
  -webkit-transition-delay: 0s, 0.2s;
  -moz-transform: rotate(45deg);
  -moz-transition-delay: 0s, 0.2s;
  transform: rotate(45deg);
  transition-delay: 0s, 0.2s;
}

.hamburger.active span:after {
  margin-top: 0;
  -webkit-transform: rotate(-45deg);
  -webkit-transition-delay: 0s, 0.2s;
  -moz-transform: rotate(-45deg);
  -moz-transition-delay: 0s, 0.2s;
  transform: rotate(-45deg);
  transition-delay: 0s, 0.2s;
}

.main-menu-wrap {
  float: right;
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  background: #ffebee;
  width: 0;
  z-index: 3;
  height: 100vh;
  overflow: auto;
  margin-top: 45px;
  transition: width 0.6s cubic-bezier(0.5, 1, 0.22, 1);
  -webkit-transition: width 0.6s cubic-bezier(0.5, 1, 0.22, 1);
}

.main-menu {
  /*   padding-top: 50px;
 */
  transition: opacity 0.5s ease-in-out;
  -webkit-transition: opacity 0.5s ease-in-out;
}

.menu-active .main-menu {
  opacity: 1;
  transition: opacity 0.2s 0.2s ease-in-out;
  -webkit-transition: opacity 0.2s 0.2s ease-in-out;
}

.main-menu a {
  color: #353e4a;
  display: block;
  font-size: 23px;
  padding: 15px 20px;
  text-align: right;
  text-decoration: none;
}

.main-menu a:hover,
.main-menu a:active {
  color: #004d67;
}
</style>
