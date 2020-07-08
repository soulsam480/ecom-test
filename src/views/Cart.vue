<template>
  <div class="container">
    <br>
    <h5 class="d-inline">{{ user.data.displayName }}'s <h2 class="d-inline">Cart</h2></h5>
    <hr>
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
                  style="padding:2px 14px"
                  class="update-num"
                >
                  -
                </button>
                <strong style="margin:0 10px 0 10px"> {{ item.quantity }}</strong>
                <button
                  @click="addToCart(item)"
                  style="padding:2px 10px"
                  class="update-num"
                >
                  +
                </button>
                </div>
              </td>
              <td>{{ item.quantity * item.price }}</td>
              <td>
                <button @click="removeAllFromCart(item)" class="delete-product">
                  x
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section v-else class="center">
        <p>Your cart is empty, fill it up!</p>
        <button class="pay-with-stripe">
          <router-link to="/">Home</router-link>
        </button>
      </section>
    </section>

    <section v-else-if="cartUIStatus === 'success'" class="success">
      <h2>Success!</h2>
      <p>
        Thank you for your purchase. You'll be receiving your items in 4
        business days.
      </p>
      <p>Forgot something?</p>
      <button class="pay-with-stripe">
        <router-link to="/">Home</router-link>
      </button>
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

export default {
  name: "Cart",
  components: {},
  computed: {
    ...mapState(["cartUIStatus"]),
    ...mapState(["cart"]),
    ...mapGetters(["cartCount","cartTotal","user"]),
  },
  methods: {
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
tr{
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

.golden {
  background: #f2eee2;
  font-weight: bold;
  padding: 10px;
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

button a {
  color: white;
  transition: 0.3s all ease;
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

.delete-product{
    border: none;
    padding: 0px 8px;
    vertical-align:middle;
    border-radius: 50%;
    background-color: rgb(255, 97, 97);
}

@media screen and (min-width: 700px) {
  .payment {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 100px;
  }

  .total {
    width: 90%;
  }
}

@media screen and (max-width: 699px) {
  .payment {
    width: 94%;
    margin-left: 2%;
  }
}
</style>
