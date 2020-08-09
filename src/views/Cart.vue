<template>
  <div class="container">
    <CartSteps />
    <br />
    <h5 class="d-inline">
      <span v-if="user.data !== null"
        >{{ user.data.displayName.split(" ")[0] }}'s
      </span>
      <h2 class="d-inline">Cart</h2>
    </h5>
    <hr />
    <section v-if="cartUIStatus === 'idle'">
      <section v-if="cartCount > 0">
        <div>
          <div class="row">
            <div class="col-sm-9">
              <div v-for="item in cart" :key="item.id">
                <div class="row p-1">
                  <div class="col-sm-4 lp-cart">
                    <img
                      v-lazy="item.imgUrls[0]"
                      :alt="item.name"
                      class="product-img"
                    />
                  </div>
                  <div class="col-sm-8  rp-cart">
                    <button
                      @click="removeAllFromCart(item)"
                      class="delete-product"
                    >
                      x
                    </button>
                    <h5 class="product-name">{{ item.name }}</h5>
                    <h6 class="d-inline" v-if="item.size">
                      Size: {{ item.size }} /
                    </h6>
                    <h6 class="d-inline" v-if="item.color">
                      Color: {{ item.color }}
                    </h6>
                    <h5 class="product-name">₹ {{ item.price }}</h5>
                    <div class="quantity">
                      <!-- this is quantity -->
                      <button
                        @click="removeOneFromCart(item)"
                        style="padding:2px 12px"
                        class="update-num"
                      >
                        -
                      </button>
                      <strong> {{ item.quantity }}</strong>

                      <button
                        @click="addToCart(item)"
                        style="padding:2px 9px"
                        class="update-num"
                      >
                        +
                      </button>
                    </div>
                    <!-- this is quantity -->
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-3 side-check">
              <h5>Price Details</h5>
              <hr />
              <h6 class="d-inline float-left">Total Price:</h6>
              <h6 class="d-inline float-right">₹ {{ cartTotal }}</h6>
              <br />
              <hr />

              <h6 class="d-inline float-left">Delivery:</h6>
              <h6 class="d-inline float-right">NA</h6>
              <br />
              <hr />
              <h5 class="d-inline float-left">TOTAL:</h5>
              <h5 class="d-inline float-right">₹ {{ cartTotal }}</h5>
              <br />
              <br />
              <div class="payment text-right ">
                <button
                  class="prod-btn"
                  :disabled="user.loggedIn === false"
                  @click="proceed('checkout')"
                >
                  Proceed to Checkout
                </button>
                <p v-if="!user.loggedIn" class="text-muted">
                  Please Login to continue
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section v-else class="center">
        <p>Your cart is empty, fill it up!</p>

        <router-link to="/" class="prod-btn">Home</router-link>
      </section>
    </section>
    <section v-else-if="cartUIStatus === 'checkout'">
      <button class="prod-btn float-right" @click="proceed('idle')">
        Back
      </button>
      <h4>Deliver to</h4>
      <br />
      <div v-if="user.address.length > 0">
        <div class="row">
          <div class="col-sm-4 p-1" v-for="item in addresses" :key="item.id">
            <div class="card">
              <p class="card-header">{{ item.adName }}</p>
              <div class="card-body p-1">
                <div class="btn-group">
                  <button
                    class="btn btn-info btn-sm"
                    @click="createOrder(item)"
                  >
                    Select
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Please add an Address to Proceed</p>
        <router-link to="/user#pills-address" class="prod-btn"
          >Address</router-link
        >
      </div>
    </section>

    <section v-else-if="cartUIStatus === 'payment'">
      <button class="prod-btn float-right" @click="proceed('checkout')">
        Back
      </button>
      <h4>Pay With</h4>
      <br />
      <button class="prod-btn" @click="userPay">
        <img src="../assets/paytm.svg" style="width:60px" alt="" />
      </button>
    </section>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import CartSteps from "@/components/CartSteps.vue";
const axios = require("axios").default;
import post from "../plugins/post";
export default {
  name: "Cart",
  data() {
    return {
      cName: "",
      cEmail: "",
      cPhone: "",
      country: "India",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      cAddress: {},
      orderId: "",
      url: "",
    };
  },
  components: {
    CartSteps,
  },
  computed: {
    ...mapState(["cartUIStatus"]),
    ...mapState(["cart"]),
    ...mapGetters(["cartCount", "cartTotal", "user"]),
    ...mapGetters({ addresses: "getAddresses" }),
  },
  methods: {
    createOrder(ad) {
      var array = new Uint32Array(1);
      window.crypto.getRandomValues(array);
      this.orderId = "OD" + array[0];
      const date = `${Date().slice(8, 10)}th ${Date().slice(
        4,
        7
      )} ${Date().slice(11, 15)}`;
      const order = {
        address: { ...ad },
        orderId: this.orderId,
        cart: [...this.cart],
        status: "Pending",
        placedOn: date,
      };
      console.log({ ...order });
      this.$store.commit("localOrder", order);
      this.proceed("payment");
    },
    userPay() {
      axios({
        method: "post",
        url:
          "https://hopeful-mirzakhani-a59182.netlify.app/.netlify/functions/payment",
        data: {
          amount: this.cartTotal,
          name: this.user.data.displayName,
          email: this.user.data.email,
          orderid: this.orderId,
          mobile: this.user.data.pNum,
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (res) => {
          const params = res.data.params;
          params["CHECKSUMHASH"] = res.data.checksum;
          post({
            action: res.data.action,
            target: "_self",
            params: params,
          });
        })
        .catch((err) => {
          window.alert(err);
        });
    },
    proceed(data) {
      this.$store.commit("updateCartUI", data);
    },
    addToCart(item) {
      this.$store.commit("addOneToCart", item);
    },
    removeOneFromCart(item) {
      this.$store.commit("removeOneFromCart", item);
    },
    removeAllFromCart(item) {
      this.$store.commit("removeAllFromCart", item);
    },
  },
};
</script>

<style scoped>
@media only screen and (max-width: 768px) {
  .lp-cart {
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
  }
  .rp-cart {
    flex: 0 0 66.666667%;
    max-width: 66.666667%;
  }
}
.prod-btn {
  margin: 5px 0;
  color: black;
  background: #ce93d8;
  border-radius: 2px;
  font-size: 17px;
  border: none;
  padding: 5px 15px;
}
.prod-btn:hover {
  background-color: #c17bce;
}
button:focus {
  outline: none;
}
tr {
  border-bottom: 1px solid black;
  width: 100%;
}
.loader {
  display: flex;
  justify-content: center;
}

.success {
  text-align: center;
}
.product-img {
  margin: auto;
  display: block;
  max-width: 100%;
}

.product-name,
.product-size {
  text-align: left;
}

.product-name {
  padding-top: 10px;
}

.product-size {
  font-weight: 100;
}
.quantity {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px 0;
  width: 150px;
  background-color: #ffebee;
}
.quantity strong {
  width: 100%;
  text-align: center !important;
  border: none;
  font-weight: bold;
  color: black;
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

.delete-product {
  float: right;
  border: none;
  padding: 0px 8px;
  font-weight: bold;
}
</style>
