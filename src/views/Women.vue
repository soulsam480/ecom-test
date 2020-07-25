<template>
  <div class="women container">
    <br />
    <h3>Women's Clothing</h3>
    <hr />
    <ProductGrid :products="women" />
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
  .prod-add {
    margin: 10px 0 10px 0;
  }
}
</style>
