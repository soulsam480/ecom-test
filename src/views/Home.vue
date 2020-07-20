<template>
  <div class="home">
    <Slider />
    <div class="container-fluid">
      <p class="h-intro">CATEGORIES</p>
      <div class="row d-flex justify-content-center">
        <div class="col-sm-12">
          <div class="row d-flex justify-content-center">
            <div class="col-6 col-sm-4">
              <router-link to="/category/men"
                ><img class="cat-img" src="../assets/mencat.webp" alt=""
              /></router-link>
            </div>
            <div class="col-6 col-sm-4">
              <router-link to="/category/women"
                ><img class="cat-img" src="../assets/womencat.webp" alt=""
              /></router-link>
            </div>
          </div>
        </div>
      </div>
      <p class="h-intro">NEW ARRIVALS</p>
      <div class="container">
        <FeaturedProducts :products='featured' />
      </div>
    </div>
  </div>
</template>

<script>
import FeaturedProducts from "@/components/FeaturedProducts.vue";
import Slider from "@/components/Slider.vue";
import { mapGetters } from "vuex";
// @ is an alias to /src
export default {
  name: "Home",
  data: function() {
    return {
      name: "",
    };
  },
  computed:{
       ...mapGetters({ products: "getProducts" }),
    featured() {
      return this.products.slice().sort((a,b) => b.time- a.time ).slice(0,4)
    },
  },
  methods: {},
  components: {
    FeaturedProducts,
    Slider,
  },
};
</script>
<style scoped>
@media (max-width: 768px) {
  .container {
    max-width: 100%;
  }
}
.cat-img {
  max-width: 100%;
}
.h-intro {
  font-size: 1.875rem;
  text-align: center;
  margin: 13px 0 13px 0;
}
</style>
