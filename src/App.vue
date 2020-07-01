<template>
  <div id="app" class="container-fluid">
    <Navbar/>
    <div >
        <router-view/>
    </div>
  </div>
</template>
<script>
import Navbar from '@/components/Navbar.vue'
export default {
  components:{
    Navbar
  },
  created(){
    this.$store.dispatch('addData')
  }
}
</script>


<style>
/* #app {
} */


</style>
