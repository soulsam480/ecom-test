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
  metaInfo() {
    return {
      title: `Buy trending Men's Fashion at Best Prices | Tiaamo.com`,
      link: [
        {
          rel: "canonical",
          href: "https://store.sambitsahoo.com/#/category/men",
        },
      ],
      meta: [
        {
          name: "description",
          content:
            "Buy trending Men's fashion online at best prices from Tiaamo.com . 100% Cotton, Bio washed fabric. Free delivery.",
        },
        {
          property: "og:type",
          content: "page",
        },
        {
          property: "og:title",
          content: "Buy trending Men's Fashion at Best Prices | Tiaamo.com",
        },
        {
          property: "og:description",
          content:
            "Buy trending Men's fashion online at best prices from Tiaamo.com . 100% Cotton, Bio washed fabric. Free delivery.",
        },
        {
          property: "og:url",
          content: "https://store.sambitsahoo.com/#/category/men",
        },
        {
          property: "og:site_name",
          content: "Tiaamo.com",
        },
        {
          property: "og:image",
          content: "https://store.sambitsahoo.com/img/mencat.2a68a7bf.webp",
        },
        {
          property: "og:image:secure_url",
          content: "https://store.sambitsahoo.com/img/mencat.2a68a7bf.webp",
        },
        {
          property: "width",
          content: "1024",
        },
        {
          property: "height",
          content: "1024",
        },
        {
          property: "twitter:card",
          content: "https://store.sambitsahoo.com/img/mencat.2a68a7bf.webp",
        },
        {
          property: "twitter:description",
          content:
            "Buy trending Men's fashion online at best prices from Tiaamo.com . 100% Cotton, Bio washed fabric. Free delivery.",
        },
        {
          property: "twitter:title",
          content: "Buy trending Men's Fashion at Best Prices | Tiaamo.com",
        },
        {
          property: "twitter:image",
          content: "https://store.sambitsahoo.com/img/mencat.2a68a7bf.webp",
        },
      ],
    };
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
