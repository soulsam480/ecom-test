<template>
  <div class="container">
    <br />
    <!--       <ProductGrid :products="searchResults"/>
 -->
    <div v-if="searchResults.length > 0">
      <h4>Search results for "{{ this.$route.query.q }}"</h4>
  <hr>
      <ProductGrid :products="searchResults" />
    </div>
    <div v-else>
      <h5>Nothing Found! <br> Checkout our other Produccts!</h5>
      <button class="prod-btn"><router-link to="/">Here!</router-link></button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProductGrid from "@/components/ProductGrid.vue";

export default {
  name: "Search",
  data() {
    return {
      query: this.$route.query.q,
    };
  },
  computed: {
    ...mapGetters({ products: "getProducts" }),
    searchResults() {
      return this.products.filter((el) => {
        return el.tags.join().includes(this.$route.query.q);
      });
    },
  },
  created() {},
  components: {
    ProductGrid,
  },
};
</script>

<style scoped>
button:focus {
  outline: none;
}
.prod-btn {
  background: #ce93d8;
  border-radius: 2px;
  font-size: 20px;
  border: none;
  padding: 2px 10px;
}
.prod-btn:hover {
  background-color: #d29eda;
}
</style>
