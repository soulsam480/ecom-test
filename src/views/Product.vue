/* eslint-disable no-unused-vars */
<template>
  <div class="product container">
    <!--     <Loader :hidden="loading"/>
 -->
    <div class="row">
      <div class="col-sm-7">
        <div
          id="carouselExampleControls"
          class="carousel slide"
          data-ride="carousel"
        >
          <div class="carousel-inner">
            <div class="carousel-item active" data-interval="1500">
              <img :src="product.imgUrls[0]" class="d-block p-img" alt="..." />
            </div>
            <div
              class="carousel-item"
              data-interval="1500"
              v-if="product.imgUrls[1]"
            >
              <img :src="product.imgUrls[1]" class="d-block p-img" alt="..." />
            </div>
            <div
              class="carousel-item"
              data-interval="1500"
              v-if="product.imgUrls[2]"
            >
              <img :src="product.imgUrls[2]" class="d-block p-img" alt="..." />
            </div>
          </div>
          <a
            class="carousel-control-prev"
            href="#carouselExampleControls"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleControls"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
      <div class="col-sm-5">
        <div class="p-spec">
          <p class="p-spec-name">{{ product.name }}</p>
          <h6 class="text-muted">
            {{ product.shortDes }}
          </h6>
          <h3>₹ {{ product.price }}</h3>
          <br />

          <label for="sizes">Size</label>
          <div v-if="product.sizes" id="sizes" class="size">
            <div
              v-if="product.sizes.includes('S')"
              :class="{ act: size === 'S' }"
              @click="size = 'S'"
            >
              S
            </div>
            <div
              :class="{ act: size === 'M' }"
              v-if="product.sizes.includes('M')"
              @click="size = 'M'"
            >
              M
            </div>
            <div
              :class="{ act: size === 'L' }"
              v-if="product.sizes.includes('L')"
              @click="size = 'L'"
            >
              L
            </div>
            <div
              :class="{ act: size === 'XL' }"
              v-if="product.sizes.includes('XL')"
              @click="size = 'XL'"
            >
              XL
            </div>
            <div
              :class="{ act: size === 'XXL' }"
              v-if="product.sizes.includes('XXL')"
              @click="size = 'XXL'"
            >
              XXL
            </div>
          </div>
          <label for="color"
            >Color <small class="text-muted"> {{ color }} </small>
          </label>
          <div class="color-picker" id="color">
            <div
              v-if="product.colors.includes('black')"
              :class="{ border: color === 'black' }"
              class="black"
              @click="color = 'black'"
            ></div>
            <div
              :class="{ border: color === 'white' }"
              v-if="product.colors.includes('white')"
              class="white"
              @click="color = 'white'"
            ></div>
            <div
              :class="{ border: color === 'yellow' }"
              v-if="product.colors.includes('yellow')"
              class="yellow"
              @click="color = 'yellow'"
            ></div>
          </div>
        </div>
        <br />
        <br />

        <div class="row d-flex justify-content-left">
          <div class="col-10">
            <div class="row">
              <div class="col-sm-6">
                <div class="quantity">
                  <button
                    style="padding:10px 20px"
                    class="update-num"
                    @click="quantity > 1 ? quantity-- : (quantity = 1)"
                  >
                    -
                  </button>
                  <input type="number" v-model="quantity" disabled />
                  <button
                    style="padding:10px 17px"
                    class="update-num"
                    @click="quantity++"
                  >
                    +
                  </button>
                </div>
              </div>
              <div class="col-sm-6">
                <button
                  class="prod-btn"
                  :disabled="color === ''"
                  
                >
                  <span v-if="cart.find((el) => el.id === product.id)">
                    <router-link to="/cart">GO TO CART</router-link>
                  </span>
                  <span @click="cartAdd" v-else> ADD TO CART </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <br />
        <Wishlist :product="product" />
      </div>
    </div>
    <br />
    <br />
    <hr />

    <div class="row">
      <div class="col-sm-6">
        <h4 class="prod-add">Description</h4>
        <div v-html="product.desc">{{ product.desc }}</div>
      </div>
      <div class="col-sm-6">
        <h4 class="prod-add">Reviews</h4>
      </div>
    </div>
    <div>
      <h4 class="prod-add">You may also like</h4>
      <FeaturedProducts :products="featured" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import FeaturedProducts from "@/components/FeaturedProducts.vue";
import Wishlist from "@/components/Wishlist.vue";
export default {
  name: "Product",
  data() {
    return {
      size: "S",
      quantity: 1,
      color: "",
    };
  },
  metaInfo() {
    return {
      title: `${this.product.name} | Tiaamo.com`,
      link: [
        {
          rel: "canonical",
          href: `https://store.sambitsahoo.com/#/p/${this.product.name
            .toLowerCase()
            .split(" ")
            .join("-")}`,
        },
      ],
      meta: [
        {
          name: "description",
          content:
            "Buy " +
            this.product.name +
            " from Tiaamo.com at Best Prices. " +
            this.product.shortDes,
        },
        {
          property: "og:type",
          content: "product",
        },
        {
          property: "og:title",
          content: `${this.product.name} | Tiaamo.com`,
        },
        {
          property: "og:description",
          content:
            "Buy " +
            this.product.name +
            " from Tiaamo.com at Best Prices. " +
            this.product.shortDes,
        },
        {
          property: "og:url",
          content: `https://store.sambitsahoo.com/#/p/${this.product.name
            .toLowerCase()
            .split(" ")
            .join("-")}`,
        },
        {
          property: "og:site_name",
          content: "Tiaamo.com",
        },
        {
          property: "og:image",
          content: this.product.imgUrls[0],
        },
        {
          property: "og:image:secure_url",
          content: this.product.imgUrls[0],
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
          content: this.product.imgUrls[0],
        },
        {
          property: "twitter:description",
          content:
            "Buy " +
            this.product.name +
            " from Tiaamo.com at Best Prices. " +
            this.product.shortDes,
        },
        {
          property: "twitter:title",
          content: `${this.product.name} | Tiaamo.com`,
        },
        {
          property: "twitter:image",
          content: this.product.imgUrls[0],
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      user: "user",
      products: "getProducts",
    }),
    ...mapState(["cart"]),

    product() {
      return this.products.find(
        (el) =>
          el.name
            .toLowerCase()
            .split(" ")
            .join("-") === this.$route.params._slug
      );
    },
    featured() {
      return this.products
        .filter((el) => el.id !== this.product.id)
        .slice(0, 4);
    },
  },
  methods: {
    getSize: function(event) {
      var si = event.srcElement.id;
      console.log(si);
      this.size = toString(si);
    },
    cartAdd() {
      let item = this.product;
      item = {
        imgUrls: item.imgUrls,
        name: item.name,
        quantity: this.quantity,
        size: this.size,
        color: this.color,
        id: item.id,
        price: item.price,
      };
      this.$store.commit("addToCart", { ...item });
    },
  },
  components: {
    Wishlist,
    FeaturedProducts,
  },
};
</script>

<style scoped>
@media (max-width: 768px) {
  .container {
    max-width: 100%;
  }
}
.prod-add::before {
  position: absolute;
  content: "";
  padding: 0.8px 30px;
  margin-top: 30px;
  background-color: #ce93d8;
}
@media only screen and (max-width: 768px) {
  .col-10 {
    max-width: 100% !important;
    flex: 0 0 100%;
  }
  .col-sm-6 {
    width: 100% !important;
  }
  .col-sm-5,
  .col-sm-7 {
    max-width: 100%;
    flex: 0 0 100%;
  }
}
.prod-btn:focus {
  outline: none;
}
label {
  font-weight: bold;
}
.prod-btn {
  background: #ce93d8;
  border-radius: 2px;
  font-size: 14px;
  border: none;
  padding: 15px 20px;
  width: 100%;
  font-weight: bold;
}
.border::before {
  position: absolute;
  content: "";
  padding: 0.7px 8px;
  margin-left: -8px;
  margin-top: 20px;
  background-color: black;
}
.border {
  box-shadow: 0 0 5px 0.1px #ce93d8;
}
.black {
  background-color: black;
  padding: 15px;
  border: 1px solid black !important;
  margin: 5px;
  cursor: pointer;
  border-radius: 2px;
}
.white {
  background-color: white;
  padding: 15px;
  border: 1px solid black !important;
  margin: 5px;
  cursor: pointer;
  border-radius: 2px;
}
.yellow {
  background-color: yellow;
  padding: 15px;
  border: 1px solid black !important;
  margin: 5px;
  cursor: pointer;
  border-radius: 2px;
}
.color-picker {
  display: flex;
  flex-direction: row;
  align-content: space-between;
}
.update-num {
  background: #ce93d8;
  border-radius: 2px;
  font-size: 20px;
  border: none;
  font-weight: bold;
}
.update-num:hover {
  background-color: #d29eda;
}
.update-num:focus {
  outline: none;
}
.quantity {
  display: flex;
  margin-bottom: 10px;
  width: 100%;
}
.quantity input {
  width: 100%;
  text-align: center !important;
  border: none;
  background-color: #ffebee;
  font-weight: bold;
  color: black;
}
.carousel-control-next,
.carousel-control-prev {
  z-index: 1 !important;
  /* top: 39%;
  bottom: 50%; */
}
.carousel-control-next-icon,
.carousel-control-prev-icon {
  background-color: rgb(124, 124, 124);
  width: 22px;
  height: 30px;
}
@media only screen and (min-width: 768px) {
  .carousel-control-next {
    right: 50px;
  }
  .carousel-control-prev {
    left: 50px;
  }
}
.size {
  display: flex;
  flex-direction: row;
  align-content: space-between;
  margin-bottom: 10px;
}
.size div {
  background-color: #ffebee;
  border: 1px solid black !important;
  margin: 5px;
  cursor: pointer;
  border-radius: 2px;
  height: 32px;
  width: 32px;
  text-align: center;
  line-height: 32px;
  font-weight: bold;
}
.act {
  box-shadow: 0 0 5px 0.1px #ce93d8;
}
.act::before {
  text-align: center;
  display: block;
  position: absolute;
  content: "";
  padding: 0.7px 10px;
  margin-left: 5px;
  margin-top: 37px;
  background-color: black;
}
.p-spec-name {
  font-size: 32px;
  margin-bottom: 5px;
}

.product {
  padding-top: 15px;
}
.p-img {
  max-width: 100%;
  display: block;
  margin: auto;
}
@media only screen and (min-width: 768px) {
  .p-img {
    max-width: 80%;
  }
}
</style>
