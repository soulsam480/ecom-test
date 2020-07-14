<template>
  <div class="men container">
    <p>Breadcrumb</p>
    <div class="row">
      <FilterBlock />
      <ProductGrid :products="men" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProductGrid from "@/components/ProductGrid.vue";
import FilterBlock from "@/components/FilterBlock.vue";

export default {
  name: "Men",
  computed: {
    ...mapGetters(["men"]),
  },
  methods: {},
  created() {},
  components: {
    ProductGrid,
    FilterBlock,
  },
};
</script>

<style scoped>
@media only screen and (max-width: 768px) {
  .col-sm-9, .col-sm-3{
    max-width: 100%;
    flex: 0 0 100%
  }
    .container {
    max-width: 100%;
  }
}</style>
