<template>
  <div id="app">
    <Navbar />
    <div>
      <router-view />
    </div>
    <Footer/>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Navbar,
    Footer
  },
  created() {
    this.$store.dispatch("addData");
  },
};
</script>

<style>
 @font-face {
  font-family: Function Regular;
  src: url(~@/assets/functionregular.ttf);
}
#app{
    font-family: Function Regular;

}
</style>
