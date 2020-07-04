<template>
  <div class="login container">
    <!-- <div class="row">
      <div class="col-sm-6">
      <h3>Log In</h3>
      <form>
        <div class="form-group">
          <label for="logemail">Email address</label>
          <input
            type="email"
            class="form-control"
            id="logemail"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" class="form-text text-muted"
            >We'll never share your email with anyone else.</small
          >
        </div>
        <div class="form-group">
          <label for="log-password">Password</label>
          <input
            type="password"
            class="form-control"
            id="log-password"
            placeholder="Password"
          />
        </div>
        
        <button type="submit" class="prod-btn">Submit</button>
      </form>
    </div>

    <div class="col-sm-6">
      <h3>Sign Up</h3>
      <form>
        <div class="form-group">
          <label for="sign-email">Email address</label>
          <input
            type="email"
            class="form-control"
            id="sign-email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" class="form-text text-muted"
            >We'll never share your email with anyone else.</small
          >
        </div>
        <div class="form-group">
          <label for="sign-pass">Password</label>
          <input
            type="password"
            class="form-control"
            id="sign-pass"
            placeholder="Password"
          />
        </div>
      =
        <button type="submit" class="prod-btn">Submit</button>
      </form>
    </div>
   </div> -->
    <div class="row d-flex justify-content-center">
      <div class="nav-center col-md-4">
        <ul class="nav nav-tabs " id="myTab" role="tablist">
          <li class="nav-item ">
            <a
              class="nav-link active"
              id="home-tab"
              data-toggle="tab"
              href="#home"
              role="tab"
              aria-controls="home"
              aria-selected="true"
              >Sign in</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              id="profile-tab"
              data-toggle="tab"
              href="#profile"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
              >Create a Account</a
            >
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <div
            class="tab-pane fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <form class="text-left">
              <div class="form-group">
                <label for="logemail">Email address</label>
                <input
                  v-model="uId"
                  type="email"
                  class="form-control"
                  id="logemail"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
                <small id="emailHelp" class="form-text text-muted"
                  >We'll never share your email with anyone else.</small
                >
              </div>
              <div class="form-group">
                <label for="log-password">Password</label>
                <input
                  v-model="uPass"
                  type="password"
                  class="form-control"
                  id="log-password"
                  placeholder="Password"
                />
              </div>

              <button type="submit" class="prod-btn" @click="loginUser">
                Submit
              </button>
              <br />
              <br />
              <div class="text-center">
                <p>
                  Login with Social ID
                </p>
                <button class="btn" id="g-signin" @click="google">
                  <img src="../assets/glogo.png" style="width:30px" alt="" />
                </button>
              </div>
            </form>
          </div>

          <!--           Create an account
 -->
          <div
            class="tab-pane fade"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <form class="text-left">
              <div class="form-group">
                <label for="sign-email">Email address</label>
                <input
                  v-model="uId"
                  type="email"
                  class="form-control"
                  id="sign-email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
                <small id="emailHelp" class="form-text text-muted"
                  >We'll never share your email with anyone else.</small
                >
              </div>
              <div class="form-group">
                <label for="sign-pass">Password</label>
                <input
                  v-model="uPass"
                  type="password"
                  class="form-control"
                  id="sign-pass"
                  placeholder="Password"
                />
              </div>
              <button type="submit" @click="createUser" class="prod-btn">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import router from "@/router/index.js";
export default {
  name: "Login",
  data() {
    return {
      uId: "",
      uPass: "",
    };
  },
  methods: {
    loginUser() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.uId, this.uPass)
        .then(() => {
          router.replace({ name: "User" });
        })
        .catch(function(error) {
          window.alert(error.message);
        });
    },
    createUser() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.uId, this.uPass)
        .then(() => {
          this.uId = "";
          this.uPass = "";
          window.alert("Please Signin to continue.");
        })
        .catch((error) => {
          window.alert(error.message);
        });
    },
    google() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          console.log(result);
          router.replace({ name: "User" });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.form-control:focus {
  background-color: #ffebee;
  box-shadow: none;
  border-color: rgb(238, 238, 238);
}
.form-control {
  color: black;
}

button:focus {
  outline: none;
}
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
.nav-tabs .nav-link.active {
  border-bottom: 1px solid black;
}
.nav-tabs {
  border-bottom: none;
}
.nav-tabs .nav-link {
  border: none;
}
.active {
  color: black !important;
}
a {
  color: gray !important;
}
.nav-center {
  text-align: center;
}
.nav-center ul.nav {
  display: inline-block;
}
.nav-center ul.nav li {
  display: inline;
}
.nav-center ul.nav li a {
  float: left;
}
</style>
