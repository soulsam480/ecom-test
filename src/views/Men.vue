<template>
  <div class="men container">
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

<style scoped></style>
