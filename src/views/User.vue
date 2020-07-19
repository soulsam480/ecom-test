<template>
  <div class="user container">
    <div v-if="user">
      <div class="row d-flex justify-content-center">
        <div class="col-md-4">
          <div class="row">
            <div class="col-xs-5">
              <img v-lazy="user.data.imgUrl" class="u-img" alt="" />
            </div>
            <div class="col-xs-7 ">
              <h4>{{ user.data.displayName }}</h4>
              <h6>{{ user.data.email }}</h6>
              <button class="btn btn-outline-danger btn-sm" @click="logOut()">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-sm-3 text-center">
          <ul
            class="nav nav-pills mb-3 tabs-left "
            id="pills-tab"
            role="tablist"
          >
            <li class="nav-item">
              <a
                :class="[
                  {
                    active:
                      this.$route.hash === '#' || this.$route.hash === ' ',
                  },
                ]"
                class="nav-link"
                id="pills-home-tab"
                data-toggle="pill"
                href="#pills-home"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
                >Profile</a
              >
            </li>
            <li class="nav-item">
              <a
                :class="[
                  { active: this.$route.hash === '#pills-orders' },
                ]"
                class="nav-link"
                id="pills-orders-tab"
                data-toggle="pill"
                href="#pills-orders"
                role="tab"
                aria-controls="pills-oders"
                aria-selected="false"
                >Orders</a
              >
            </li>
            <li class="nav-item">
              <a
                :class="[
                  { active: this.$route.hash === '#pills-address' },
                ]"
                class="nav-link"
                id="pills-address-tab"
                data-toggle="pill"
                href="#pills-address"
                role="tab"
                aria-controls="pills-address"
                aria-selected="false"
              >
                Address
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                id="pills-support-tab"
                data-toggle="pill"
                href="#pills-support"
                role="tab"
                aria-controls="pills-support"
                aria-selected="false"
                >Support</a
              >
            </li>
          </ul>
        </div>
        <div class="col-sm-9">
          <div class="tab-content" id="pills-tabContent">
            <div
              class="tab-pane fade"
              :class="[
                'show',
                { active: this.$route.hash === '#' || this.$route.hash === '' },
              ]"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
            >
              <form class="text-left">
                <div>
                  <div class="form-group">
                    <label for="sign-name">Display Name </label>
                    <input
                      v-model="uName"
                      type="text"
                      class="form-control"
                      id="sign-name"
                      :placeholder="user.data.displayName"
                    />
                  </div>
                  <div class="form-group">
                    <label for="sign-img">Display Photo</label>
                    <input
                      @change="previewImage"
                      type="file"
                      class="form-control-file "
                      id="sign-img"
                    />
                  </div>
                  <button
                    type="submit"
                    @click="updateUser(user.data)"
                    class="prod-btn"
                  >
                    Save
                  </button>
                </div>
                <br />
                <div class="form-group">
                  <label for="sign-number">Phone Number</label>
                  <input
                    v-model="uPhone"
                    type="tel"
                    class="form-control"
                    id="sign-number"
                    :placeholder="user.data.pNum"
                    aria-describedby="phonehelp"
                  />
                  <small id="phonehelp" class="form-text text-muted"
                    >Phone Number followed by Country Code.</small
                  >
                </div>
                <div id="recaptcha-container"></div>
                <button
                  type="submit"
                  @click="updatePhone(user.data)"
                  class="prod-btn"
                >
                  Save
                </button>
              </form>
              <br />
              <div v-if="!user.data.emailVerified">
                <button class="prod-btn" id="emailv" @click="sendVemail">
                  Send Verification Email ?
                </button>
              </div>
            </div>
            <div
              :class="[
                'show',
                { active: this.$route.hash === '#pills-orders' },
              ]"
              class="tab-pane fade"
              id="pills-orders"
              role="tabpanel"
              aria-labelledby="pills-orders-tab"
            >
              rgtrt
              <div class="row"></div>
            </div>
            <div
              :class="[
                'show',
                { active: this.$route.hash === '#pills-address' },
              ]"
              class="tab-pane fade"
              id="pills-address"
              role="tabpanel"
              aria-labelledby="pills-address-tab"
            >
              <div v-if="!addAddress">
                <div class="d-flex justify-content-between">
                  <h5>My Addresses</h5>
                  <button class="prod-btn " @click="addAddress = true">
                    +
                  </button>
                </div>
                <div class="row">
                  <div
                    class="col-sm-4"
                    v-for="address in addresses"
                    :key="address.id"
                  >
                    <div class="card">
                      <p class="card-header">{{ address.adName }}</p>
                      <div class="card-body p-1">
                        <div class="btn-group">
                          <button
                            class="btn btn-info btn-sm"
                            @click="editAddress(address.id)"
                          >
                            Edit
                          </button>
                          <button
                            class="btn btn-danger btn-sm"
                            @click="removeAddress(address.id)"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else>
                <h5>
                  <span v-if="eAddress">Edit an</span>
                  <span v-else>Add a new</span> Address
                </h5>
                <form class="form-horizontal">
                  <fieldset>
                    <div class="form-group">
                      <label>Save Address as</label>
                      <div class="controls">
                        <input
                          v-model="adName"
                          id="adName"
                          name="adName"
                          type="text"
                          placeholder="Enter a name for this Address"
                          class="form-control"
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <label>Full Name</label>
                      <div class="controls">
                        <input
                          v-model="uName"
                          id="full-name"
                          name="full-name"
                          type="text"
                          :placeholder="user.data.displayName"
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
                          <option value="Arunachal Pradesh"
                            >Arunachal Pradesh</option
                          >
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
                          <option value="Himachal Pradesh"
                            >Himachal Pradesh</option
                          >
                          <option value="Jammu and Kashmir"
                            >Jammu and Kashmir</option
                          >
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
                          v-model="uEmail"
                          id="Email"
                          name="email"
                          type="email"
                          :placeholder="user.data.email"
                          class="form-control"
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <label>Phone Number</label>
                      <div class="controls">
                        <input
                          v-model="uPhone"
                          id="Phone-number"
                          name="Phone-number"
                          type="tel"
                          :placeholder="user.data.pNum"
                          class="form-control"
                        />
                        <p class="help-block"></p>
                      </div>
                    </div>
                    <!-- country select -->
                  </fieldset>
                </form>
                <button
                  type="submit"
                  @click="saveAddress()"
                  class="prod-btn"
                  v-if="!eAddress"
                >
                  Save Address
                </button>
                <button
                  type="submit"
                  @click="updateAddress()"
                  class="prod-btn"
                  v-if="eAddress"
                >
                  Update Address
                </button>
                <button @click="cancel" class="prod-btn" v-if="eAddress">
                  Cancel
                </button>
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="pills-support"
              role="tabpanel"
              aria-labelledby="pills-support-tab"
            >
              qaswdw
              <!-- <div class="row"></div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else></div>
  </div>
</template>

<script>
import NProgress from "f:/MY CODEBASE/ecom-test/node_modules/nprogress";

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 200,
  easing: "ease",
  speed: 500,
});

import "nprogress/nprogress.css";
import { mapGetters, mapState } from "vuex";
import firebase from "firebase";
import router from "@/router/index.js";

export default {
  name: "User",
  computed: {
    ...mapGetters({
      user: "user",
      addresses: "getAddresses",
    }),
    ...mapState(["cart", "checkedOut"]),
  },
  data() {
    return {
      uName: null,
      imageData: null,
      picture: null,
      uPhone: null,
      uEmail: null,
      emailVerified: null,
      uploadValue: 0,
      country: "India",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      adId: "",
      adName: "",
      addAddress: false,
      eAddress: false,
    };
  },
  methods: {
    sendVemail() {
      NProgress.start();
      NProgress.set(0.1);
      NProgress.inc(0.2);
      firebase
        .auth()
        .currentUser.sendEmailVerification()
        .then(() => {
          document.getElementById("emailv").style.display = "none";
          window.alert("Email Sent! Check inbox");
          setTimeout(() => NProgress.done(), 2000);
        });
    },
    removeAddress(id) {
      firebase
        .database()
        .ref(`/Users/${this.user.data.userId}/address/${id}`)
        .remove()
        .then(() => {
          this.$store.commit("syncAddress", this.user.data.userId);
          window.alert("Removed Successfully.");
        });
    },
    cancel() {
      this.addAddress = false;
      this.eAddress = false;
    },
    updateAddress() {
      NProgress.start();
      NProgress.set(0.1);
      NProgress.inc(0.2);
      const editRef = firebase
        .database()
        .ref(`/Users/${this.user.data.userId}/address/${this.adId}`);
      editRef
        .update({
          adName: this.adName,
          id: this.adId,
          name: this.uName,
          email: this.uEmail,
          phone: this.uPhone,
          country: this.country,
          street: this.street,
          city: this.city,
          state: this.state,
          postal: this.postalCode,
        })
        .then(() => {
          (this.adName = ""),
            (this.adId = ""),
            (this.country = "India"),
            (this.street = ""),
            (this.city = ""),
            (this.state = ""),
            (this.postalCode = ""),
            (this.uPhone = ""),
            (this.uEmail = ""),
            (this.uName = "");
          window.alert("Updated Successfully");
          this.eAddress = false;
          this.addAddress = false;
          setTimeout(() => NProgress.done(), 2000);
        });
    },
    editAddress(id) {
      var toEdit = this.addresses.find((el) => el.id === id);
      this.adName = toEdit.adName;
      this.adId = toEdit.id;
      this.country = toEdit.country;
      this.street = toEdit.street;
      this.city = toEdit.city;
      this.state = toEdit.state;
      this.postalCode = toEdit.postal;
      this.uPhone = toEdit.phone;
      this.uEmail = toEdit.email;
      this.uName = toEdit.name;
      this.eAddress = true;
      this.addAddress = true;
    },
    saveAddress() {
      NProgress.start();
      NProgress.set(0.1);
      NProgress.inc(0.2);
      this.uName === null
        ? (this.uName = this.user.data.displayName)
        : this.uName;
      this.uEmail === null ? (this.uEmail = this.user.data.email) : this.uEmail;
      this.uPhone === null ? (this.uPhone = this.user.data.pNum) : this.uPhone;
      this.adId =
        Math.random()
          .toString(36)
          .slice(2) +
        Math.random()
          .toString(36)
          .slice(2);
      const adRef = firebase
        .database()
        .ref(`/Users/${this.user.data.userId}/address/${this.adId}`);
      adRef
        .set({
          adName: this.adName,
          id: this.adId,
          name: this.uName,
          email: this.uEmail,
          phone: this.uPhone,
          country: this.country,
          street: this.street,
          city: this.city,
          state: this.state,
          postal: this.postalCode,
        })
        .then(() => {
          (this.adName = ""),
            (this.adId = ""),
            (this.country = "India"),
            (this.street = ""),
            (this.city = ""),
            (this.state = ""),
            (this.postalCode = ""),
            (this.uPhone = ""),
            (this.uEmail = ""),
            (this.uName = "");
          this.addAddress = false;
          setTimeout(() => NProgress.done(), 2000);
        });
    },
    logOut() {
      if (!this.checkedOut) {
        firebase
          .database()
          .ref(`/Users/${this.user.data.userId}/shop`)
          .set({
            cart: this.cart,
            wishlist: this.user.wishlist,
          })
          .then(
            firebase.auth().signOut(),
            this.$store.commit("clearCart"),
            this.$store.commit("clearWishlist"),
            this.$store.commit("clearAddress")
          );

        router.replace({ name: "Login" });
      } else {
        firebase.auth().signOut();
        router.replace({ name: "Login" });
      }
    },
    previewImage(event) {
      this.picture = null;
      this.imageData = event.target.files[0];
    },
    updatePhone(data) {
      NProgress.start();
      NProgress.set(0.1);
      NProgress.inc(0.2);
      if (this.uPhone === null) {
        this.uPhone = data.pNum;
      }

      const user = firebase.auth().currentUser;
      const applicationVerifier = new firebase.auth.RecaptchaVerifier(
        "recaptcha-container"
      );
      const provider = new firebase.auth.PhoneAuthProvider();
      provider
        .verifyPhoneNumber(this.uPhone, applicationVerifier)
        .then(function(verificationId) {
          document.getElementById("recaptcha-container").style.display = "none";
          const verificationCode = window.prompt(
            "Please enter the verification " +
              "code that was sent to your mobile device."
          );
          return firebase.auth.PhoneAuthProvider.credential(
            verificationId,
            verificationCode
          );
        })
        .then(function(phoneCredential) {
          return user.updatePhoneNumber(phoneCredential);
        })
        .then(() => {
          window.alert("Updated Successfully!");
          setTimeout(() => NProgress.done(), 2000);

          this.uPhone = null;
        });
    },

    async updateUser(data) {
      NProgress.start();
      NProgress.set(0.1);
      NProgress.inc(0.2);
      if (this.uName === null && this.picture === null) {
        this.uName = data.displayName;
        this.picture = data.imgUrl;
      }
      /*   const storageRef = await firebase
        .storage()
        .ref(`/Users/${data.userId}`)
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        snapshot => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        error => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then(url => {
            this.picture = url;
          });
        }
      ); */
      await firebase
        .storage()
        .ref(`/Users/${data.userId}`)
        .put(this.imageData);

      await firebase
        .storage()
        .ref(`/Users/${data.userId}`)
        .getDownloadURL()
        .then((url) => {
          this.picture = url;
        });

      firebase
        .auth()
        .currentUser.updateProfile({
          displayName: this.uName,
          photoURL: this.picture,
        })
        .then(() => {
          this.$store.dispatch("fetchUser");
          setTimeout(() => NProgress.done(), 2000);

          window.alert("Updated Successfully!");
        });
    },
  },
  // eslint-disable-next-line no-unused-vars
  /*   beforeRouteEnter (to, from, next) {
     
     if(to.fullPath.includes('#')){
    const hash = to.fullPath.split("#");
     console.log(to.fullPath)
     console.log(hash)
    
     next(vm => {
console.log(vm.country)
    $('#pills-tab a[href="#'+hash[1]+'"]').tab("show");    // access to component instance via `vm`
  })
     }
    // called when the route that renders this component has changed,
    // but this component is reused in the new route.
    // For example, for a route with dynamic params `/foo/:id`, when we
    // navigate between `/foo/1` and `/foo/2`, the same `Foo` component instance
    // will be reused, and this hook will be called when that happens.
    // has access to `this` component instance.
    next()
  } */
};
</script>

<style scoped>
.prod-btn:focus {
  outline: none;
}

.prod-btn {
  background: #ce93d8;
  border-radius: 2px;
  font-size: 14px;
  border: none;
  padding: 7px 20px;
  margin: 5px;
}
.prod-btn:hover {
  opacity: 0.9;
}
.form-control:focus {
  background-color: #ffebee;
  box-shadow: none;
  border-color: rgb(238, 238, 238);
}
.form-control {
  color: black;
}

.col-xs-5,
.col-xs-7 {
  padding: 10px;
}
@media (min-width: 576px) {
  .col-sm-3 {
    max-width: 100% !important;
    flex: none;
  }
  .col-sm-9 {
    max-width: 100% !important;
    flex: none;
  }
}
@media (min-width: 768px) {
  .col-sm-3 {
    max-width: 25% !important;
    flex: 0 0 25%;
  }
  .col-sm-9 {
    max-width: 75% !important;
    flex: 0 0 75%;
  }
  .form-control {
    max-width: 70%;
  }
}
@media only screen and (max-width: 768px) {
  .form-control {
    width: 100% !important;
  }
}
.u-img {
  width: 100px;
  border-radius: 5px;
}
.user {
  padding-top: 20px;
}
.nav-pills .nav-link.active {
  background-color: #fddde2 !important;
  border-color: #fddde2 !important;
}
a {
  font-size: 17px;
  color: black !important;
}
a:hover {
  color: black !important;
  text-decoration: none;
}
.nav-tabs {
  border: none !important;
}

.tabs-left {
  display: flex !important;
  flex-direction: row !important;
  justify-content: space-evenly;
  background-color: #ffebee;
}

.tabs-left li:hover {
  background-color: #fddde2;
  opacity: 0.9 !important;
}
@media only screen and (min-width: 768px) {
  .tabs-left {
    display: flex !important;
    flex-direction: column !important;
    justify-content: flex-start;
    height: auto;
    position: sticky !important;
  }
}
</style>
