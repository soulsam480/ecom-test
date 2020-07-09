<template>
  <div class="home">
    <Slider />
    <div class="container-fluid">
      <p class="h-intro">CATEGORIES</p>
      <div class="row d-flex justify-content-center">
        <div class="col-sm-12">
          <div class="row d-flex justify-content-center">
            <div class="col-6 col-sm-4">
              <router-link to="/men"
                ><img class="cat-img" src="../assets/mencat.webp" alt=""
              /></router-link>
            </div>
            <div class="col-6 col-sm-4">
              <router-link to="/women"
                ><img class="cat-img" src="../assets/womencat.webp" alt=""
              /></router-link>
            </div>
          </div>
        </div>
      </div>
      <p class="h-intro">NEW ARRIVALS</p>
      <div class="container">
        <FeaturedProducts />
      </div>
    </div>
  </div>
</template>

<script>
import FeaturedProducts from "@/components/FeaturedProducts.vue";
import Slider from "@/components/Slider.vue";

// @ is an alias to /src
export default {
  name: "Home",
  data: function() {
    return {
      name: "",
    };
  },
  methods: {},
  components: {
    FeaturedProducts,
    Slider,
    
  }
};
</script>
<style scoped>
.cat-img {
  max-width: 100%;
}
.h-intro {
  font-size: 1.875rem;
  text-align: center;
  margin: 13px 0 13px 0;
}
</style>
