<template>
  <div class="men container">
    <br />
    <h3>Men's Clothing</h3>
    <hr />

    <ProductGrid :products="men" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProductGrid from "@/components/ProductGrid.vue";

export default {
  name: "Men",
  computed: {
    ...mapGetters(["men"]),
  },
  methods: {},
  created() {},
  components: {
    ProductGrid,
  },
};
</script>

<style scoped>
@media only screen and (max-width: 768px) {
  .container {
    max-width: 100%;
  }
  .prod-add {
    margin: 10px 0 10px 0;
  }
}
</style>
