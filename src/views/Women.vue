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
  metaInfo() {
    return {
      title: `Buy trending Women's Fashion at Best Prices | Tiaamo.com`,
      link: [
        {
          rel: "canonical",
          href: "https://store.sambitsahoo.com/#/category/women",
        },
      ],
      meta: [
        {
          name: "description",
          content:
            "Buy trending Women's fashion online at best prices from Tiaamo.com . 100% Cotton, Bio washed fabric. Free delivery.",
        },
        {
          property: "og:type",
          content: "page",
        },
        {
          property: "og:title",
          content: "Buy trending Women's Fashion at Best Prices | Tiaamo.com",
        },
        {
          property: "og:description",
          content:
            "Buy trending Women's fashion online at best prices from Tiaamo.com . 100% Cotton, Bio washed fabric. Free delivery.",
        },
        {
          property: "og:url",
          content: "https://store.sambitsahoo.com/#/category/women",
        },
        {
          property: "og:site_name",
          content: "Tiaamo.com",
        },
        {
          property: "og:image",
          content: "https://store.sambitsahoo.com/img/womencat.3dc44f21.webp",
        },
        {
          property: "og:image:secure_url",
          content: "https://store.sambitsahoo.com/img/womencat.3dc44f21.webp",
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
          content: "https://store.sambitsahoo.com/img/womencat.3dc44f21.webp",
        },
        {
          property: "twitter:description",
          content:
            "Buy trending Women's fashion online at best prices from Tiaamo.com . 100% Cotton, Bio washed fabric. Free delivery.",
        },
        {
          property: "twitter:title",
          content: "Buy trending Women's Fashion at Best Prices | Tiaamo.com",
        },
        {
          property: "twitter:image",
          content: "https://store.sambitsahoo.com/img/womencat.3dc44f21.webp",
        },
      ],
    };
  },
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
