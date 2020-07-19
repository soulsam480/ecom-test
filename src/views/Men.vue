<template>
  <div class="men container">
    <h3 class="prod-add">Men's Clothing</h3>

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

.prod-add::before {
  position: absolute;
  content: "";
  padding: 0.8px 70px;
  margin-top: 30px;
  background-color: #ce93d8;
}
.prod-add {
  margin: 30px 0 30px;
}
@media only screen and (max-width: 768px) {
  .container {
    max-width: 100%;
  }
  .prod-add {
  margin: 10px 0 10px 0;

  }

}
</style>
