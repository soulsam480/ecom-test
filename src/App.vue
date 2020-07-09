<template>
  <div id="app">
    <Loader v-if="loading" />
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
import Loader from "@/components/Loader.vue";
export default {
  components: {
    Navbar,
    Footer,
    Loader,
  },
  data() {
    return {
      loading: false,
    };
  },
  created() {
    this.$store.dispatch("addData");
    setTimeout(() => (this.loading = false), 4000);
  }
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
