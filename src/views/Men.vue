<template>
  <div class="men container">
    <p>Breadcrumb</p>
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
}
</style>
