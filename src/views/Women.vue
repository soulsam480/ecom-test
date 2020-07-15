<template>
  <div class="women container">
    <p>Breadcrumb</p>
    <div class="row">
      <ProductGrid :products="women" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProductGrid from "@/components/ProductGrid.vue";
export default {
  name: "Women",
  computed: {
    ...mapGetters(["women"]),
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
