<template>
  <div class="user container">
    <div v-if="user">
      <div class="row d-flex justify-content-center">
        <div class="col-md-4">
          <div class="row">
            <div class="col-xs-5">
              <img :src="user.data.imgUrl" class="u-img" alt="" />
            </div>
            <div class="col-xs-7 ">
              <h4>{{ user.data.displayName }}</h4>
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
                class="nav-link active"
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
                class="nav-link"
                id="pills-profile-tab"
                data-toggle="pill"
                href="#pills-profile"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
                >Orders</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                id="pills-contact-tab"
                data-toggle="pill"
                href="#pills-contact"
                role="tab"
                aria-controls="pills-contact"
                aria-selected="false"
                >Addresses</a
              >
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
              class="tab-pane fade show active"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
            >
              <form class="text-left">
                <div>
                  <div class="form-group">
                    <label for="sign-name">Display Name</label>
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
                      class="form-control-file"
                      id="sign-img"
                      :placeholder="user.data.imgUrl"
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
                <br>
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
            </div>
            <div
              class="tab-pane fade"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
            >
              ...
            </div>
            <div
              class="tab-pane fade"
              id="pills-contact"
              role="tabpanel"
              aria-labelledby="pills-contact-tab"
            >
              ...
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
import router from "@/router/index.js";

export default {
  name: "User",
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  data() {
    return {
      uName: null,
      imageData: null,
      picture: null,
      uPhone: null,
      emailVerified: null,
    };
  },
  methods: {
    logOut() {
      firebase.auth().signOut();
      router.replace({ name: "Login" });
    },
    previewImage(event) {
      this.picture = null;
      this.imageData = event.target.files[0];
    },
    updatePhone(data) {
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
          document.getElementById('recaptcha-container').style.display = 'none'
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
        }).then( ()=>{
          this.uPhone = null;
        })
    },

    async updateUser(data) {
      if (this.uName === null && this.picture === null) {
        this.uName = data.displayName;
        this.picture = data.imgUrl;
      }
      await firebase
        .storage()
        .ref(`/Users/${data.userId}`)
        .put(this.imageData)
        .then(() => {
          console.log("success");
        });

      await firebase
        .storage()
        .ref(`/Users/${data.userId}`)
        .getDownloadURL()
        .then((url) => {
          this.picture = url;
          console.log(this.picture);
        });

      firebase
        .auth()
        .currentUser.updateProfile({
          displayName: this.uName,
          photoURL: this.picture,
        })
        .then(() => {
          console.log("success");
        });
    },
  },
};
</script>

<style scoped>
.prod-btn {
  width: 100%;
  background: #ce93d8;
  border-radius: 2px;
  font-size: 14px;
  border: none;
  padding: 5px 10px;
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
    max-width: 25% !important;
    flex: 0 0 25%;
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
  border-radius: 5px;
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
    height: 500px;
  }
}
</style>
