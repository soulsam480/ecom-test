<template>
  <div class="container">
    <p>{{ response }}</p>
    <div v-if="orderDetail !== undefined">
      <div class="order">
        <div class="o-details">
          <h6 class="text-muted">
            Order ID: {{ orderDetail.orderId }} / Status:
            {{ orderDetail.status }}
          </h6>
          <hr />
          <div>
            <div class="row">
              <div
                class="col-sm-6 main-order"
                v-for="p in orderProducts"
                :key="p.id"
              >
                <div class="row">
                  <div class="col-sm-4 lp-cart">
                    <img
                      v-lazy="p.imgUrls[0]"
                      :alt="p.name"
                      class="product-img"
                    />
                  </div>
                  <div class="col-sm-8 rp-cart">
                    <h5 class="product-name">{{ p.name }}</h5>
                    <h6 v-if="p.size">Size: {{ p.size }}</h6>
                    <h6 v-if="p.color">Color: {{ p.color }}</h6>
                    <h6 v-if="p.quantity">Quantity: {{ p.quantity }}</h6>
                    <h6 v-if="p.price">Price: {{ p.price }}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="s-details col-sm-6">
            <h5>Shipping Details</h5>
            <hr />
            <div class="ship">
              <h5>{{ orderDetail.address.name }}</h5>
              <p>
                {{ orderDetail.address.street }},
                {{ orderDetail.address.city }} ,
                <br />
                {{ orderDetail.address.postal }},{{ orderDetail.address.state }}
              </p>
              <h5>Phone Number</h5>
              <p>{{ orderDetail.address.phone }}</p>
            </div>
          </div>
          <div class="p-details col-sm-6">
            <h5>Price Details</h5>
            <hr />
            <div class="price">
              <h6 class="float-left">Total Price:</h6>
              <h6 class="float-right">₹ {{ orderDetail.amount }}</h6>
            </div>
            <div class="price">
              <h6 class="float-left">Shipping Fee:</h6>
              <h6 class="float-right">
                <!--  ₹{{ orderDetail.amount }} -->
                NA
              </h6>
            </div>
            <div class="price">
              <h5 class="float-left">Total Amount:</h5>
              <h5 class="float-right">₹ {{ orderDetail.amount }}</h5>
            </div>
            <div class="price">
              <h6 class="float-left">Paid Through:</h6>
              <h6 class="float-right">{{ orderDetail.pay_method }}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios").default;
import firebase from "firebase";
import { mapGetters } from "vuex";
export default {
  name: "Order",
  data() {
    return {
      response: "",
    };
  },
  computed: {
    ...mapGetters({ user: "user", orders: "getOrders" }),
    orderDetail() {
      return this.orders.find(
        (el) => el.orderId === this.$route.query.order_id
      );
    },
    orderProducts() {
      return this.orderDetail.cart;
    },
    order() {
      return this.$store.getters.getLocalOrder;
    },
  },
  created() {
    if (this.$route.query.paytm_response === "TXN_SUCCESS") {
      const date = `${Date().slice(11, 15)}_${Date().slice(
        4,
        7
      )}_${Date().slice(8, 10)}`;
      firebase
        .database()
        .ref(`/Orders/${date}`)
        .once("value", async (res) => {
          const orders = Object.values(res.val());
          if (orders.find((el) => el.orderId === this.order.orderId)) {
            await firebase
              .database()
              .ref(
                `/Users/${this.user.data.userId}/orders/${this.order.orderId}`
              )
              .set({
                ...this.order,
              })
              .then(async () => {
                await axios({
                  method: "post",
                  url:
                    "https://hopeful-mirzakhani-a59182.netlify.app/.netlify/functions/syncOrder",
                  data: {
                    ...this.order,
                    user: {
                      uid: this.user.data.userId,
                      name: this.user.data.displayName,
                      email: this.user.data.email,
                      mobile: this.user.data.pNum,
                    },
                  },
                  headers: {
                    "Content-Type": "application/json",
                  },
                })
                  .then(() => {
                    this.response = "Order was placed successfully !";
                    this.$store.commit("clearLocalOrder");
                    this.$store.commit("clearCart");
                  })
                  .catch(() => {
                    this.response = "Failed";
                    this.$store.commit("clearLocalOrder");
                    this.$store.commit("clearCart");
                  });
              });
          } else {
            this.response = "Failed";
            this.$store.commit("clearLocalOrder");
            this.$store.commit("clearCart");
          }
        });
    }
  },
};
</script>

<style lang="scss" scoped>
.main-order {
  padding: 10px 15px;
}
@media only screen and (max-width: 768px) {
  .lp-cart {
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
    padding: 0 10px;
  }
  .rp-cart {
    flex: 0 0 66.666667%;
    max-width: 66.666667%;
    padding: 0 10px;
  }
}
.product-img {
  margin: auto;
  display: block;
  max-width: 100%;
}
.price {
  clear: both;
}
</style>
