<template>
  <div class="home">
    <Slider/>
   <div class="container-fluid">
      <p class="display-4 text-center">New Arrivals</p>
      <FeaturedProducts/>
   </div>
  </div>
</template>

<script>
import FeaturedProducts from '@/components/FeaturedProducts.vue'
import Slider from '@/components/Slider.vue'

// @ is an alias to /src
export default {
  name: "Home",
  data: function() {
    return {
      name: "",
    };
  },
  methods: {
  
  },
  components: {
    FeaturedProducts,
    Slider
  },
};
</script>
<style scoped>
</style>

