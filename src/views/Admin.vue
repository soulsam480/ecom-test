<template>
  <div class="admin p-2">
    <div id="afterlogin" v-if="getAuth">
      <h5>
        Admin :
        <b class="text-info">{{ authId }}</b>
        <button class="btn btn-danger float-right" @click="Logout()">Admin Logout</button>
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
        <!--  <div class="form-group">
          <label for>
            <b>Product Description</b>
          </label>
          <input
            v-model="b"
            type="text"
            class="form-control"
            id="inputTitle"
            placeholder="Product Descrption"
          />
        </div>-->

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
              type="checkbox"
              id="inlineCheckbox8"
              value="Men"
              v-model="checkedCats"
            />
            <label class="form-check-label" for="inlineCheckbox8">Men</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              id="inlineCheckbox9"
              value="Women"
              v-model="checkedCats"
            />
            <label class="form-check-label" for="inlineCheckbox9">Women</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              id="inlineCheckbox10"
              value="uncat"
              v-model="checkedCats"
            />
            <label class="form-check-label" for="inlineCheckbox10">uncat</label>
          </div>
        </div>
        <div class="form-group">
          <label for="Image">
            <b>Product Image</b>
          </label>

          <input
            type="file"
            class="form-control-file"
            @change="previewImage"
            accept="image/*"
            id="Image"
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
      <button class="btn btn-primary" @click="addData()" :disabled="onPostEdit">Commit Post</button>
      <br />
      <br />
      <div>
        <h3 class="text-center">Update Post</h3>
        <div class="row">
          <div class="col-sm-4 p-1" v-for="item in editData" :key="item[0]">
            <div class="card">
              <p class="card-header">{{ item[1] }}</p>
              <div class="card-body p-1">
                <div class="btn-group">
                  <button class="btn btn-info btn-sm" @click="editPost(item[0])">Edit</button>
                  <button class="btn btn-success btn-sm" @click="updatePost(item[0])">Save</button>
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
        <small
          id="emailHelp"
          class="form-text text-muted"
        >We'll never share your email with anyone else.</small>
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

export default {
  name: "Admin",
  props: [],
  components: {
    editor: Editor
  },
  data: function() {
    return {
      a: "",
      c: "",
      checkedSizes: [],
      checkedColors: [],
      checkedCats: [],
      authId: "",
      authPass: "",
      imageData: null,
      picture: null,
      uploadValue: 0,
      editorText: "Add post content here",
      editorOptions: {
        hideModeSwitch: true
      },
      postBody: "",
      editData: [],
      onPostEdit: false
    };
  },
  computed: {
    getAuth() {
      return this.$store.getters.getAuth;
    }
  },
  methods: {
    addData() {
      this.postBody = this.$refs.toastuiEditor.invoke("getHtml");
      var newProduct = firebase
        .database()
        .ref()
        .child("Products")
        .push().key;
      console.log(this.postBody);
      firebase
        .database()
        .ref(`/Products/${newProduct}`)
        .set({
          name: this.a,
          price: this.c,
          sizes: this.checkedSizes,
          colors: this.checkedColors,
          cats: this.checkedCats,
          imgUrl: this.picture,
          desc: this.postBody
        })
        .catch(error => {
          console.log(error);
        });
      this.$store.dispatch("addData");
    },
    previewImage(event) {
      console.log(event);
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files[0];
    },

    onUpload() {
      this.picture = null;

      const storageRef = firebase
        .storage()
        .ref(`${this.imageData.name}`)
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
      );
    },
    Logout() {
      this.$store.dispatch("changeAuth");
    },
    Auth() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.authId, this.authPass)
        .then(this.$store.dispatch("changeAuth"))
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  created() {}
};
</script>
