<template>
  <div class="home">
    <FeaturedProducts/>
  </div>
</template>

<script>
import FeaturedProducts from '@/components/FeaturedProducts.vue'
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
    FeaturedProducts
  },
};
</script>
