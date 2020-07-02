<template>
  <div id="app">
    <Navbar/>
    <div  class="container-fluid">
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
:root {
  background-color: white;
}


</style>
