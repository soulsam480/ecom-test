<template>
  <div class="women container">
    <p>Breadcrumb</p>
    <div class="row">
      <FilterBlock />
      <ProductGrid :products="women" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProductGrid from "@/components/ProductGrid.vue"
import FilterBlock from "@/components/FilterBlock.vue"
export default {
  name: "Women",
  computed: {
    ...mapGetters(["women"]),
  },
  methods: {},
  created() {},
  components:{
    ProductGrid,
    FilterBlock
    
  }
};
</script>

<style scoped>

</style>
