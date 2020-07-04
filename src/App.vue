<template>
  <div id="app">
    <Navbar />
    <div>
      <router-view />
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
export default {
  components: {
    Navbar,
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
