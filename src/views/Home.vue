<template>
  <div class="home">
    <Slider/>
    <FeaturedProducts/>
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
