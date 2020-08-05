<template>
  <div id="app">
    <Navbar />
    <div>
      <router-view />
    </div>
    <br />
    <hr />
    <Footer />
  </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      loading: false,
    };
  },
  metaInfo() {
    return {
      title:
        "Online shopping site for Fashion, Lifestyle and Accessories | Tiaamo.com",
      link: [
        {
          rel: "canonical",
          href: "https://store.sambitsahoo.com/#/",
        },
      ],
      meta: [
        {
          name: "description",
          content:
            "Buy trending fashion online at best prices from Tiaamo.com . ",
        },
        {
          property: "og:type",
          content: "page",
        },
        {
          property: "og:title",
          content:
            "Online shopping site for Fashion, Lifestyle and Accessories | Tiaamo.com",
        },
        {
          property: "og:description",
          content:
            "Buy trending fashion online at best prices from Tiaamo.com . ",
        },
        {
          property: "og:url",
          content: "https://store.sambitsahoo.com/#/",
        },
        {
          property: "og:site_name",
          content: "Tiaamo.com",
        },
        {
          property: "og:image",
          content: "https://store.sambitsahoo.com/img/w-logo.376dfd58.png",
        },
        {
          property: "og:image:secure_url",
          content: "https://store.sambitsahoo.com/img/w-logo.376dfd58.png",
        },
        {
          property: "width",
          content: "120",
        },
        {
          property: "height",
          content: "50",
        },
        {
          property: "twitter:card",
          content: "https://store.sambitsahoo.com/img/w-logo.376dfd58.png",
        },
        {
          property: "twitter:description",
          content:
            "Buy trending fashion online at best prices from Tiaamo.com . ",
        },
        {
          property: "twitter:title",
          content:
            "Online shopping site for Fashion, Lifestyle and Accessories | Tiaamo.com",
        },
        {
          property: "twitter:image",
          content: "https://store.sambitsahoo.com/img/w-logo.376dfd58.png",
        },
      ],
    };
  },
  beforeCreate() {
    this.$store.dispatch("addData");
  },
};
</script>

<style>
.lazy-img [lazy="loading"] {
  width: 100% !important;
}
@font-face {
  font-family: "Function Regular";
  src: url(~@/assets/functionregular.woff2) format("woff2"),
    url(~@/assets/functionregular.woff) format("woff"),
    url(~@/assets/functionregular.ttf) format("truetype");
}
#app {
  font-family: Function Regular;
}
</style>
