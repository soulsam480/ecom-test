<template>
  <div class="container">
    <CartSteps />
    <br />
    <h5 class="d-inline">
      <span v-if="user.data !== null">{{ user.data.displayName }}'s </span>
      <h2 class="d-inline"> Cart</h2>
    </h5>
    <hr />
    <section v-if="cartUIStatus === 'idle'">
      <section v-if="cartCount > 0">
        <table class="table table-borderless">
          <thead class="w-100">
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody class="w-100">
            <tr v-for="item in cart" :key="item.id">
              <td>
                <div class="row">
                  <div class="col-xs-5">
                    <img
                      v-lazy="item.imgUrls[0]"
                      :alt="item.name"
                      class="product-img"
                    />
                  </div>
                  <div class="col-xs-7">
                    <h5 class="product-name">{{ item.name }}</h5>
                    <h6 v-if="item.size" class="product-size">
                      Size: {{ item.size }}
                    </h6>
                  </div>
                </div>
              </td>
              <td>
                <h5 class="price">{{ item.price }}</h5>
              </td>
              <td>
                <div>
                  <button
                    @click="removeOneFromCart(item)"
                    style="padding:2px 5px"
                    class="update-num"
                  >
                    &darr;
                  </button>
                  <strong> {{ item.quantity }}</strong>

                  <button
                    @click="addToCart(item)"
                    style="padding:2px 5px"
                    class="update-num"
                  >
                    &uarr;
                  </button>
                </div>
              </td>
              <td>
                <h5>{{ item.quantity * item.price }}</h5>
              </td>
              <td>
                <button @click="removeAllFromCart(item)" class="delete-product">
                  X
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="payment text-right ">
          <h6 class="d-inline">Subtotal:</h6>
          <h5 class="d-inline">₹ {{ cartTotal }}</h5>
          <br />
          <button class="prod-btn" @click="proceed('payment')">Proceed to Payments</button>
        </div>
      </section>

      <section v-else class="center">
        <p>Your cart is empty, fill it up!</p>

        <router-link to="/" class="prod-btn">Home</router-link>
      </section>
    </section>
    <section v-else-if="cartUIStatus === 'payment'">
      <button class="prod-btn" @click="proceed('idle')" >Back</button>
      <h4>Shipping Address</h4>
      <div v-if="user.address.length > 0">
        Select an Address to Proceed
        <div class="row">
          <div class="col-sm-4" v-for="address in addresses" :key="address.id">
            <div class="card">
              <p class="card-header">{{ address.adName }}</p>
              <div class="card-body p-1">
                <div class="btn-group">
                  <button class="btn btn-info btn-sm" @click="userPay(address)">
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

    <section v-else-if="cartUIStatus === 'success'" class="success">
      <h2>Success!</h2>
      <p>
        Thank you for your purchase. You'll be receiving your items in 4
        business days.
      </p>
      <p>Forgot something?</p>

      <router-link to="/" class="prod-btn">Home</router-link>
    </section>

    <section v-else-if="cartUIStatus === 'failure'">
      <p>
        Oops, something went wrong. Redirecting you to your cart to try again.
      </p>
    </section>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import CartSteps from "@/components/CartSteps.vue";
/* const axios = require('axios').default;
 */export default {
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
    async userPay(address) {
      this.cAddress = address;
      this.orderId =
        Math.random()
          .toString(36)
          .slice(2)
          .toLowerCase() +
        Math.random()
          .toString(36)
          .slice(2)
          .toLowerCase();

     /*  await axios
        .post("https://us-central1-ecom-test-53555.cloudfunctions.net/payment", {
          amount: 10,
          name: this.cName,
          email: this.cEmail,
          mobile: this.cPhone,
          orderid: this.orderId,
          custid: this.user.data.userId
        })
        .then((response) =>{
          if(response === 'success'){
            window.alert('success')
          }else{
            window.alert('error')
          }
        }) */
      
    },
    guestPay() {
      this.cAddress = {
        name: this.cName,
        email: this.cEmail,
        phone: this.cPhone,
        country: this.country,
        street: this.street,
        city: this.city,
        state: this.state,
        postal: this.postalCode,
      };
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
.prod-btn {
  margin: 10px 0;
  color: black;
  background: #ce93d8;
  border-radius: 2px;
  font-size: 17px;
  border: none;
  padding: 7px 20px;
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
  float: left;
  margin-right: 15px;
  width: 100px;
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

.num {
  text-align: right;
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
  border: none;
  padding: 0px 8px;
  vertical-align: middle;
  border-radius: 50%;
  font-weight: bold;
}
</style>
