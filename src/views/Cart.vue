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
              <hr>
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
      <button class="prod-btn" @click="proceed('idle')">Back</button>
      <div v-if="user.address.length > 0">
        Select an Address to Proceed
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
        <form class="form-horizontal">
          <fieldset>
            <div class="form-group">
              <label>Full Name</label>
              <div class="controls">
                <input
                  v-model="cName"
                  id="full-name"
                  name="full-name"
                  type="text"
                  placeholder="Full Name"
                  class="form-control"
                />
                <p class="help-block"></p>
              </div>
            </div>
            <div class="form-group">
              <label>Country</label>
              <div class="controls">
                <input
                  disabled
                  v-model="country"
                  id="region"
                  name="region"
                  type="text"
                  placeholder="Country"
                  class="form-control"
                />
                <p class="help-block"></p>
              </div>
            </div>
            <!-- address-line1 input-->
            <div class="form-group">
              <label>Street Address</label>
              <input
                v-model="street"
                id="address-line1"
                name="address-line1"
                type="text"
                placeholder="Street Address"
                class="form-control"
              />
              <small id="help-block" class="form-text text-muted">
                Street address, P.O. box, company name, c/o
              </small>
            </div>
            <!-- address-line2 input-->

            <!-- city input-->
            <div class="form-group">
              <label>City / Town</label>
              <div class="controls">
                <input
                  v-model="city"
                  id="city"
                  name="city"
                  type="text"
                  placeholder="city"
                  class="form-control"
                />
                <small id="help-block" class="form-text text-muted">
                  City, Town or Local Landmark
                </small>
              </div>
            </div>
            <!-- State input-->
            <div class="form-group">
              <label>State</label>
              <div>
                <select
                  v-model="state"
                  name="state"
                  id="state"
                  class="form-control"
                >
                  <option disabled value="Please Select One"
                    >Please Select One</option
                  >
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Andaman and Nicobar Islands"
                    >Andaman and Nicobar Islands</option
                  >
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chandigarh">Chandigarh</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Dadar and Nagar Haveli"
                    >Dadar and Nagar Haveli</option
                  >
                  <option value="Daman and Diu">Daman and Diu</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Lakshadweep">Lakshadweep</option>
                  <option value="Puducherry">Puducherry</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
                </select>
              </div>
            </div>
            <!-- postal-code input-->
            <div class="form-group">
              <label>Postal Code</label>
              <div class="controls">
                <input
                  v-model="postalCode"
                  id="postal-code"
                  name="postal-code"
                  type="text"
                  placeholder="Postal code"
                  class="form-control"
                />
                <p class="help-block"></p>
              </div>
            </div>
            <div class="form-group">
              <label>Email</label>
              <div class="controls">
                <input
                  v-model="cEmail"
                  id="Email"
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  class="form-control"
                />
              </div>
            </div>
            <div class="form-group">
              <label>Phone Number</label>
              <div class="controls">
                <input
                  v-model="cPhone"
                  id="Phone-number"
                  name="Phone-number"
                  type="tel"
                  placeholder="Phone Number"
                  class="form-control"
                />
                <p class="help-block"></p>
              </div>
            </div>
            <!-- country select -->
          </fieldset>
        </form>
        <button class="prod-btn" @click="guestPay">Proceed to Payments</button>
      </div>
    </section>

    <section v-else-if="cartUIStatus === 'payment'">
      <button class="prod-btn" @click="proceed('checkout')">Back</button><br />
      <h5>Pay with</h5>
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
      const order = {
        address: { ...ad },
        orderId: this.orderId,
        cart: [...this.cart],
      };
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
