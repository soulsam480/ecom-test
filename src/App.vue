<template>
  <div id="app">
    <Navbar />

    <div>
      <router-view />
    </div>
    <br />
    <hr />
    <Footer />
  </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      loading: false,
    };
  },
  beforeCreate() {
    this.$store.dispatch("addData");
  },
};
</script>

<style>
@font-face {
  font-family: Function Regular;
  src: url(~@/assets/functionregular.ttf);
}
#app {
  font-family: Function Regular;
}
</style>
