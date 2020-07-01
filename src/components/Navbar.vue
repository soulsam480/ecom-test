<template>
  <div class="Navbar">
    <a @click="changeNav()" class="hamburger menu-btn" id="nav-tog"
      ><span></span
    ></a>
    <div class="main-menu-wrap" id="mnav-wrap">
      <div class="main-menu">
        <a href="">ypyo</a>
        <a href="">ypyo</a>
        <a href="">ypyo</a>
        <a href="">ypyo</a>
      </div>
    </div>
    <div>
      <ul class="nav-desktop" style="padding-inline-start:0 !important;">
        <li><a href="">yoyo</a></li>
        <li><a href="">yoyo</a></li>
        <li><a href="">yoyo</a></li>
        <li><a href="">yoyo</a></li>
      </ul>
    </div>
          <img src="../assets/logo.png" alt="" class="n-brand">
 <div>
      <ul class="nav-desktop">
        <li><a href="">yoyo</a></li>
        <li><a href="">yoyo</a></li>
     <li><a href="">yoyo</a></li>
        <li><a href="">yoyo</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data: function() {
    return {};
  },
  methods: {
    changeNav() {
      document.getElementById("nav-tog").classList.toggle("active");
      document.getElementById("mnav-wrap").classList.toggle("full");
    },
  },
};
</script>

<style scoped>

.n-brand{
    width: 30px;
    display: block;
}
.Navbar {
  z-index: 2;
  width: 100%;
  background-color: white;
  color: black;
/*   box-shadow: 0 0 5px .2px rgba(0, 0, 0, 0.466);
 */  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  
}
@media only screen and (max-width: 600px) {
  .nav-desktop {
    display: none !important;
  }
}
.nav-desktop li {
  display: inline-block;
  padding: 0px 10px 0px 10px;
}

.nav-desktop  {
margin: 0 !important;
}
.nav-desktop a{
    color: black !important;
}
.nav-desktop a:hover{
    text-decoration: none;
}
.nav-desktop a{
    text-decoration: none;
}


.nav-desktop li:hover {

}
.full {
  width: 100% !important;
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
@media only screen and (min-width: 600px) {
  .hamburger {
    display: none;
  }
}

.hamburger span {
  margin: -2px 0 0;
  position: absolute;
  top: 50%;
  width: 25px;
  height: 3px;
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
  height: 3px;
  background-color: #353e4a;
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
  background: white;
  width: 0;
  z-index: 1;
  height: 100%;
  overflow: auto;
  margin-top:46px;
  transition: width 0.6s cubic-bezier(0.5, 1, 0.22, 1);
  -webkit-transition: width 0.6s cubic-bezier(0.5, 1, 0.22, 1);
}

.main-menu {
/*   padding-top: 50px;
 */  transition: opacity 0.5s ease-in-out;
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
  font-size: 1.5em;
  margin-bottom: 10px;
  padding: 10px;
  text-decoration: none;
}

.main-menu a:hover,
.main-menu a:active {
  color: #004d67;
}
</style>
