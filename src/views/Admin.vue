<template>
  <div class="admin container-fluid">
    <div id="afterlogin" v-if="getAuth">
      <br />
      <div>
        <h5 class="d-inline">Admin: {{ user.data.displayName }}</h5>
        <button class="btn btn-danger btn-sm float-right" @click="Logout()">
          Logout
        </button>
      </div>
      <!-- <div class="row d-flex justify-content-center">
        <div class="col-md-4">
           <h4>{{ user.data.displayName }}</h4>
              <h6>{{ user.data.email }}</h6>
              <button class="btn btn-outline-danger btn-sm" @click="logOut()">
                Logout
              </button>
        </div>
      </div> -->
      <br />
      <div class="row">
        <div class="col-sm-2">
          <div class="sidebar">
            <a
              class="resnav"
              :class="{ act: sideBar === 'product' }"
              @click="changeSide('product')"
              >Product</a
            >
            <a
              class="resnav"
              :class="{ act: sideBar === 'categories' }"
              @click="changeSide('categories')"
              >Categories</a
            >
            <a
              class="resnav"
              :class="{ act: sideBar === 'media' }"
              @click="changeSide('media')"
              >Media</a
            >
          </div>
        </div>
        <div class="col-sm-10">
          <div id="product" v-if="sideBar === 'product'">
            <h4>Add a Product</h4>
            <hr />
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
                <label for>
                  <b>Short Description</b>
                </label>
                <input
                  v-model="shortDes"
                  type="text"
                  class="form-control"
                  id="inputShortDesc"
                  placeholder="Short Description"
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
                  <label class="form-check-label" for="inlineCheckbox1"
                    >S</label
                  >
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox2"
                    value="M"
                    v-model="checkedSizes"
                  />
                  <label class="form-check-label" for="inlineCheckbox2"
                    >M</label
                  >
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox3"
                    value="L"
                    v-model="checkedSizes"
                  />
                  <label class="form-check-label" for="inlineCheckbox3"
                    >L</label
                  >
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox4"
                    value="XL"
                    v-model="checkedSizes"
                  />
                  <label class="form-check-label" for="inlineCheckbox4"
                    >XL</label
                  >
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
                  <label class="form-check-label" for="inlineCheckbox5"
                    >Black</label
                  >
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox6"
                    value="white"
                    v-model="checkedColors"
                  />
                  <label class="form-check-label" for="inlineCheckbox6"
                    >White</label
                  >
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox7"
                    value="yellow"
                    v-model="checkedColors"
                  />
                  <label class="form-check-label" for="inlineCheckbox7"
                    >Yellow</label
                  >
                </div>
              </div>
              <div class="form-group">
                <legend class="col-form-label pt-0">
                  <b>Product Categories</b>
                </legend>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox8"
                    value="Men"
                    v-model="checkedCats"
                  />
                  <label class="form-check-label" for="inlineCheckbox8"
                    >Men</label
                  >
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox9"
                    value="Women"
                    v-model="checkedCats"
                  />
                  <label class="form-check-label" for="inlineCheckbox9"
                    >Women</label
                  >
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox10"
                    value="uncat"
                    v-model="checkedCats"
                  />
                  <label class="form-check-label" for="inlineCheckbox10"
                    >uncat</label
                  >
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
                <label class="form-check-label" for="featured"
                  >Featured roduct</label
                >
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
                  <progress
                    id="progress"
                    :value="uploadValue"
                    max="100"
                  ></progress>
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
              id="postContent"
            ></editor>
            <br />
            <div class="form-group">
              <label for>
                <b>Tags</b>
              </label>
              <input
                v-model="tags"
                type="text"
                class="form-control"
                id="Tags"
                placeholder="Tags"
              />
            </div>
            <br />
            <button
              class="btn btn-primary"
              @click="addData()"
              :disabled="onPostEdit"
            >
              Commit Product
            </button>
            <br />
            <br />
            <div>
              <h3 class="text-center">Update Product</h3>
              <div class="row">
                <div
                  class="col-sm-4"
                  v-for="item in getProducts"
                  :key="item.id"
                >
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
          <div id="cat" v-if="sideBar === 'categories'">
            <h4>Manage Categories</h4>
            <hr />
          </div>
          <div id="media" v-if="sideBar === 'media'">
            <h4>Manage Media</h4>
            <hr />
          </div>
        </div>
      </div>
    </div>
    <div id="beforelogin" v-else>
      <br />
      <div class="row d-flex justify-content-center">
        <div class="col-md-4">
          <h4>Admin Login</h4>
          <hr />
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
              >Hi Friend! Hacking is injurious to health. Don't try. Ok
              Bye.</small
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
      shortDes: "",
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
      sideBar: "product",
      tags: "",
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
    changeSide(data) {
      this.sideBar = data;
    },
    removeProduct(id) {
      firebase
        .database()
        .ref(`/Products/${id}`)
        .remove()
        .then(() => {
          this.$store.dispatch("addData");
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
        (this.shortDes = main.shortDes);
      this.tags = main.tags.join();
      this.$refs.toastuiEditor.invoke("setHtml", `${main.desc}`);
      this.onPostEdit = true;
    },
    updateProduct(id) {
      this.postBody = this.$refs.toastuiEditor.invoke("getHtml");
      var tags = this.tags.split(",");
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
          shortDes: this.shortDes,
          tags: tags,
        })
        .then(() => {
          window.alert("updated successfully!");
          this.b = "";
          this.a = "";
          this.c = "";
          this.checkedSizes = "";
          this.checkedColors = "";
          this.checkedCats = "";
          this.picture = "";
          this.postBody = "";
          this.featured = "";
          this.shortDes = "";
          this.tags = "";
        });
      this.onPostEdit = false;
    },
    addData() {
      this.postBody = this.$refs.toastuiEditor.invoke("getHtml");
      var tags = this.tags.split(",");
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
          shortDes: this.shortDes,
          tags: tags,
        })
        .then(() => {
          window.alert("Product added Successfully.");
          this.b = "";
          this.a = "";
          this.c = "";
          this.checkedSizes = "";
          this.checkedColors = "";
          this.checkedCats = "";
          this.picture = "";
          this.postBody = "";
          this.featured = "";
          this.shortDes = "";
          this.tags = "";
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
    async Logout() {
      await firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.dispatch("changeAuth");
        });
    },
    async Auth() {
      await firebase
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
<style scoped>
.sidebar {
  border-radius: 5px;
  height: 100%;
  background-color: #ffebee;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.sidebar a {
  cursor: pointer;
  width: 100%;
  padding: 10px 16px;
  text-decoration: none;
  font-size: 20px;
}
.sidebar a:hover {
  background-color: #fddde2;
}
.sidebar a.act {
  background-color: #fddde2;
}
@media only screen and (max-width: 768px) {
  .sidebar {
    flex-direction: row;
  }
  .col-sm-10,
  .col-sm-2 {
    max-width: 100% !important;
    flex: 0 0 100% !important;
  }
  .col-sm-10 {
    padding-top: 10px;
  }
}
</style>
