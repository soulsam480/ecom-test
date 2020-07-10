<template>
  <div class="admin container">
    <br>
    <div id="afterlogin" v-if="getAuth">
      <h5>
        Admin : {{ user.data.displayName }}
        <b class="text-info">{{ authId }}</b>
        <button class="btn btn-danger float-right" @click="Logout()">
          Admin Logout
        </button>
      </h5>
      <br />
      <h3 class="text-center">Add a Product</h3>
      <form>
        <div class="form-group">
          <label for>
            <b>Product Name</b>
          </label>
          <input
            v-model="a"
            type="text"
            class="form-control"
            id="inputTitle"
            placeholder="Product Name"
          />
        </div>
        <div class="form-group">
          <label for="inputDesc">
            <b>Product Price</b>
          </label>
          <input
            v-model="c"
            type="text"
            class="form-control"
            id="inputDesc"
            placeholder="Product Price"
          />
        </div>
        <div class="form-group">
          <legend class="col-form-label pt-0">
            <b>Product Sizes</b>
          </legend>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              id="inlineCheckbox1"
              value="S"
              v-model="checkedSizes"
            />
            <label class="form-check-label" for="inlineCheckbox1">S</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              id="inlineCheckbox2"
              value="M"
              v-model="checkedSizes"
            />
            <label class="form-check-label" for="inlineCheckbox2">M</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              id="inlineCheckbox3"
              value="L"
              v-model="checkedSizes"
            />
            <label class="form-check-label" for="inlineCheckbox3">L</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              id="inlineCheckbox4"
              value="XL"
              v-model="checkedSizes"
            />
            <label class="form-check-label" for="inlineCheckbox4">XL</label>
          </div>
        </div>
        <div class="form-group">
          <legend class="col-form-label pt-0">
            <b>Product Colors</b>
          </legend>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              id="inlineCheckbox5"
              value="black"
              v-model="checkedColors"
            />
            <label class="form-check-label" for="inlineCheckbox5">Black</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              id="inlineCheckbox6"
              value="white"
              v-model="checkedColors"
            />
            <label class="form-check-label" for="inlineCheckbox6">White</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              id="inlineCheckbox7"
              value="yellow"
              v-model="checkedColors"
            />
            <label class="form-check-label" for="inlineCheckbox7">Yellow</label>
          </div>
        </div>
        <div class="form-group">
          <legend class="col-form-label pt-0">
            <b>Product Categories</b>
          </legend>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              id="inlineCheckbox8"
              value="Men"
              v-model="checkedCats"
            />
            <label class="form-check-label" for="inlineCheckbox8">Men</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              id="inlineCheckbox9"
              value="Women"
              v-model="checkedCats"
            />
            <label class="form-check-label" for="inlineCheckbox9">Women</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              id="inlineCheckbox10"
              value="uncat"
              v-model="checkedCats"
            />
            <label class="form-check-label" for="inlineCheckbox10">uncat</label>
          </div>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="checkbox"
            id="featured"
            :value="true"
            v-model="featured"
          />
          <label class="form-check-label" for="featured">Featured roduct</label>
        </div>
        <br />
        <div class="form-group">
          <label for="Image">
            <b>Product Image</b> (
            <small aria-describedby="Image"
              >Upload 3 Product Images at once</small
            >)
          </label>

          <input
            type="file"
            class="form-control-file"
            @change="previewImage"
            accept="image/*"
            id="Image"
            multiple
          />
          <br />
          <p>
            {{ uploadValue.toFixed() + "%" }}
            <progress id="progress" :value="uploadValue" max="100"></progress>
          </p>
          <button class="btn btn-primary" @click="onUpload()">
            <!--           :disabled="!imageData"
            -->
            Upload Image
          </button>
        </div>
      </form>
      <label for="postContent">
        <b>Product Description</b>
      </label>
      <editor
        ref="toastuiEditor"
        :initialValue="editorText"
        :options="editorOptions"
        height="500px"
        initialEditType="wysiwyg"
        previewStyle="vertical"
        v-on:keyup.enter="addData()"
        id="postContent"
      ></editor>
      <br />

      <br />
      <button class="btn btn-primary" @click="addData()" :disabled="onPostEdit">
        Commit Product
      </button>
      <br />
      <br />
      <div>
        <h3 class="text-center">Update Product</h3>
        <div class="row">
          <div class="col-sm-4" v-for="item in getProducts" :key="item.id">
            <div class="card">
              <p class="card-header">{{ item.name }}</p>
              <div class="card-body p-1">
                <div class="btn-group">
                  <button
                    class="btn btn-info btn-sm"
                    @click="editPost(item.id)"
                  >
                    Edit
                  </button>
                  <button
                    class="btn btn-success btn-sm"
                    @click="updateProduct(item.id)"
                  >
                    Save
                  </button>
                  <button
                    class="btn btn-danger btn-sm"
                    @click="removeProduct(item.id)"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="beforelogin" v-else>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          v-model="authId"
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
        />
        <small id="emailHelp" class="form-text text-muted"
          >Hi Friend! Hacking is injurious to health. Don't try. Ok Bye.</small
        >
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          v-model="authPass"
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          v-on:keyup.enter="Auth"
        />
      </div>
      <button class="btn btn-success" @click="Auth()">Login</button>
    </div>
  </div>
</template>

<script>
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import firebase from "firebase";
import { Editor } from "@toast-ui/vue-editor";
import { mapGetters } from "vuex";

export default {
  name: "Admin",
  props: [],
  components: {
    editor: Editor,
  },
  data: function() {
    return {
      a: "",
      b: "",
      c: "",
      featured: false,
      checkedSizes: [],
      checkedColors: [],
      checkedCats: [],
      authId: "",
      authPass: "",
      imageData: [],
      picture: [],
      uploadValue: 0,
      editorText: "Add post content here",
      editorOptions: {
        hideModeSwitch: true,
      },
      postBody: "",
      onPostEdit: false,
    };
  },
  computed: {
    getAuth() {
      return this.$store.getters.getAuth;
    },
    getProducts() {
      return this.$store.getters.getProducts;
    },
    ...mapGetters({ user: "user", cred: "authCredGet" }),
  },
  methods: {
    /* generateId() {

    }, */
    removeProduct(id) {
      firebase
        .database()
        .ref(`/Products/${id}`)
        .remove()
        .then(() => {
          this.$store.dispatch('addData')
          window.alert("Product deleted successfully!");
        });
    },
    editPost(id) {
      var main = this.$store.getters.getProducts.find((el) => el.id === id);
      (this.a = main.name),
        (this.c = main.price),
        (this.checkedSizes = main.sizes),
        (this.checkedColors = main.colors),
        (this.checkedCats = main.cats),
        (this.picture = main.imgUrls),
        (this.featured = main.featured),
        this.$refs.toastuiEditor.invoke("setHtml", `${main.desc}`);
      this.onPostEdit = true;
    },
    updateProduct(id) {
      this.postBody = this.$refs.toastuiEditor.invoke("getHtml");

      firebase
        .database()
        .ref(`/Products/${id}`)
        .update({
          name: this.a,
          price: this.c,
          sizes: this.checkedSizes,
          colors: this.checkedColors,
          cats: this.checkedCats,
          imgUrls: this.picture,
          desc: this.postBody,
          featured: this.featured,
        })
        .then(() => {
          window.alert("updated successfully!");
        });
      this.onPostEdit = false;
    },
    addData() {
      this.postBody = this.$refs.toastuiEditor.invoke("getHtml");
      var newProduct = this.b;
      firebase
        .database()
        .ref(`/Products/${newProduct}`)
        .set({
          id: this.b,
          name: this.a,
          price: this.c,
          sizes: this.checkedSizes,
          colors: this.checkedColors,
          cats: this.checkedCats,
          imgUrls: this.picture,
          desc: this.postBody,
          featured: this.featured,
        })
        .then(() => {
          window.alert("Product added Successfully.");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    previewImage(event) {
      this.b =
        Math.random()
          .toString(36)
          .slice(2) +
        Math.random()
          .toString(36)
          .slice(2);
      this.uploadValue = 0;
      this.picture = null;
      var files = event.target.files;
      files.forEach((el) => {
        this.imageData.push(el);
      });
    },

    onUpload() {
      this.picture = [];
      var a = 0;
      this.imageData.forEach((el) => {
        a = a + 1;
        const storageRef = firebase
          .storage()
          .ref(`/Products/${this.b}/${a}`)
          .put(el);
        storageRef.on(
          `state_changed`,
          (snapshot) => {
            this.uploadValue =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          (error) => {
            console.log(error.message);
          },
          () => {
            this.uploadValue = 100;
            storageRef.snapshot.ref.getDownloadURL().then((url) => {
              this.imageData = [];
              this.picture.push(url);
            });
          }
        );
      });
    },
    Logout() {
      firebase.auth().signOut();
      this.$store.dispatch("changeAuth");
    },
    Auth() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.authId, this.authPass)
        .then(() => {
          this.authId = "";
          this.authPass = "";
          if (this.user.data.userId === this.cred.uid) {
            this.$store.dispatch("changeAuth");
          } else {
            firebase
              .auth()
              .signOut()
              .then(() => {
                this.authId = "";
                this.authPass = "";
                window.alert("Bhag B*dk");
              });
          }
        });
    },
  },
  created() {},
};
</script>
