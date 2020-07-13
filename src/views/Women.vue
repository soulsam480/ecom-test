<template>
  <div class="women container">
  <ProductGrid :products= "women" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProductGrid from "@/components/ProductGrid.vue"
export default {
  name: "Women",
  computed: {
    ...mapGetters(["women"]),
  },
  methods: {},
  created() {},
  components:{
    ProductGrid
  }
};
</script>

<style scoped>

</style>
