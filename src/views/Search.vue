<template>
  <div class="container">
      <br>
      <h4>Search results for "{{query}}"</h4>
   <ProductGrid :products="searchResults"/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProductGrid from "@/components/ProductGrid.vue";

export default {
  name: "Search",
  data() {
    return {
      query: this.$route.params.query,
    };
  },
  computed: {
    ...mapGetters({ products: "getProducts" }),
    searchResults() {
      return this.products.filter((el) => {
        return el.tags.join().includes(this.$route.params.query);
      });
    },
  },
  created() {},
  components:{
      ProductGrid
  }
};
</script>

<style scoped></style>
