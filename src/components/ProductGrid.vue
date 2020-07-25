<template>
  <div class="productgrid">
    <div class="row">
      <!--Filter Block-->
      <div class="col-sm-2">
        <div class="filter-large">
          <h6 class=" d-inline prod-add">SORT BY</h6>
          <small
            class="text-muted d-inline"
            style="cursor:pointer;"
            @click="sort = ''"
            v-if="sort !== ''"
          >
            Clear</small
          >
          <div class="sort-large">
            <ul>
              <li :class="{ fActive: sort === 'pop' }" @click="sort = 'pop'">
                Most Popular
              </li>
              <li :class="{ fActive: sort === 'htl' }" @click="sort = 'htl'">
                Price High to Low
              </li>
              <li :class="{ fActive: sort === 'lth' }" @click="sort = 'lth'">
                Price Low to High
              </li>
              <li :class="{ fActive: sort === 'mr' }" @click="sort = 'mr'">
                Most Recent
              </li>
            </ul>
          </div>
          <h6 class=" prod-add">FILTERS</h6>
          <label for="sizes" style="font-weight:700;"
            >Size
            <small
              class="text-muted"
              style="cursor:pointer;"
              v-if="size.length > 0"
              @click="size = []"
            >
              clear
            </small></label
          >
          <div>
            <div class="box">
              <input v-model="size" id="one" value="S" type="checkbox" />
              <span class="check"></span>
              <label for="one">S</label>
            </div>
            <div class="box">
              <input v-model="size" id="two" value="M" type="checkbox" />
              <span class="check"></span>
              <label for="two">M</label>
            </div>
            <div class="box">
              <input v-model="size" id="three" value="L" type="checkbox" />
              <span class="check"></span>
              <label for="three">L</label>
            </div>
            <div class="box">
              <input v-model="size" id="four" value="XL" type="checkbox" />
              <span class="check"></span>
              <label for="four">XL</label>
            </div>
            <div class="box">
              <input v-model="size" id="five" value="XXL" type="checkbox" />
              <span class="check"></span>
              <label for="five">XXL</label>
            </div>
          </div>
          <label for="color" style="font-weight:700;"
            >Color
            <small
              class="text-muted"
              v-if="color.length > 0"
              @click="color = []"
              style="cursor:pointer;"
            >
              clear
            </small>
          </label>
          <div class="colors">
            <div class="c-box" :class="{ fActive: color.includes('black') }">
              <input
                v-model="color"
                type="checkbox"
                name="black"
                id="black"
                value="black"
              />
              <span class="c b"></span>
              <label for="black"> Black</label>
            </div>

            <div class="c-box" :class="{ fActive: color.includes('yellow') }">
              <input
                v-model="color"
                type="checkbox"
                name="yellow"
                id="yellow"
                value="yellow"
              />
              <span class="c y"></span>
              <label for="yellow"> Yellow</label>
            </div>

            <div class="c-box" :class="{ fActive: color.includes('white') }">
              <input
                v-model="color"
                type="checkbox"
                name="white"
                id="white"
                value="white"
              />
              <span class="c w"></span>
              <label for="white">White</label>
            </div>
          </div>
        </div>

        <div class="filter-small">
          <div class="filter-small-content" v-if="showFilterDiv">
            <span @click="showFilterDiv = false" class="text-right"
              ><img src="../assets/close.svg" class="close-arr" alt="down"
            /></span>
            <div class="sort" v-if="showContent === 'sort'">
              <h5 class="d-inline">Sort By</h5>
              <span
                class="text-muted d-inline"
                @click="sort = ''"
                v-if="sort !== ''"
              >
                Clear</span
              >
              <hr />
              <ul>
                <li :class="{ fActive: sort === 'pop' }" @click="sort = 'pop'">
                  Most Popular
                </li>
                <li :class="{ fActive: sort === 'htl' }" @click="sort = 'htl'">
                  Price High to Low
                </li>
                <li :class="{ fActive: sort === 'lth' }" @click="sort = 'lth'">
                  Price Low to High
                </li>
                <li :class="{ fActive: sort === 'mr' }" @click="sort = 'mr'">
                  Most Recent
                </li>
              </ul>
            </div>
            <div class="filter" v-if="showContent === 'filter'">
              <h5 class="d-inline">Filters</h5>
              <span
                class="text-muted d-inline"
                @click="(color = []), (size = [])"
                v-if="color.length > 0 || size.length > 0"
              >
                Clear</span
              >
              <hr />
              <div class="row">
                <div class="col-3">
                  <div class="filter-col">
                    <a
                      :class="{ fActive: size.length > 0 }"
                      @click="filter = 'size'"
                      >Size</a
                    >
                    <a
                      :class="{ fActive: color.length > 0 }"
                      @click="filter = 'color'"
                      >Color</a
                    >
                  </div>
                </div>
                <div class="col-9">
                  <div v-if="filter === 'size'">
                    <div class="box">
                      <input
                        v-model="size"
                        id="one"
                        value="S"
                        type="checkbox"
                      />
                      <span class="check"></span>
                      <label for="one">S</label>
                    </div>
                    <div class="box">
                      <input
                        v-model="size"
                        id="two"
                        value="M"
                        type="checkbox"
                      />
                      <span class="check"></span>
                      <label for="two">M</label>
                    </div>
                    <div class="box">
                      <input
                        v-model="size"
                        id="three"
                        value="L"
                        type="checkbox"
                      />
                      <span class="check"></span>
                      <label for="three">L</label>
                    </div>
                    <div class="box">
                      <input
                        v-model="size"
                        id="four"
                        value="XL"
                        type="checkbox"
                      />
                      <span class="check"></span>
                      <label for="four">XL</label>
                    </div>
                    <div class="box">
                      <input
                        v-model="size"
                        id="five"
                        value="XXL"
                        type="checkbox"
                      />
                      <span class="check"></span>
                      <label for="five">XXL</label>
                    </div>
                  </div>
                  <div v-if="filter === 'color'" class="colors">
                    <div
                      class="c-box"
                      :class="{ fActive: color.includes('black') }"
                    >
                      <input
                        v-model="color"
                        type="checkbox"
                        name="black"
                        id="black"
                        value="black"
                      />
                      <span class="c b"></span>
                      <label for="black"> Black</label>
                    </div>

                    <div
                      class="c-box"
                      :class="{ fActive: color.includes('yellow') }"
                    >
                      <input
                        v-model="color"
                        type="checkbox"
                        name="yellow"
                        id="yellow"
                        value="yellow"
                      />
                      <span class="c y"></span>
                      <label for="yellow"> Yellow</label>
                    </div>

                    <div
                      class="c-box"
                      :class="{ fActive: color.includes('white') }"
                    >
                      <input
                        v-model="color"
                        type="checkbox"
                        name="white"
                        id="white"
                        value="white"
                      />
                      <span class="c w"></span>
                      <label for="white"> White</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="filter-small-container">
            <div class="sort-div">
              <button
                class="filt-btn"
                :class="{ fActive: sort !== '' }"
                @click="showFilter('sort')"
              >
                SORT
              </button>
            </div>

            <div class="filters-div">
              <button
                class="filt-btn"
                :class="{ fActive: size.length > 0 || color.length > 0 }"
                @click="showFilter('filter')"
              >
                FILTERS
              </button>
            </div>
          </div>
        </div>
      </div>
      <!--Product grid-->
      <div class="col-sm-10">
        <div class="row">
          <div
            class="col-6 col-md-3"
            style="padding:10px;"
            v-for="item in filtered"
            :key="item.id"
          >
            <router-link :to="{ name: 'Product', params: { id: item.id } }">
              <div class="prod">
                <div class="prod-img">
                  <img v-lazy="item.imgUrls[0]" alt />
                </div>
                <div class="prod-title">
                  <p>{{ item.name }}</p>
                  <h6>₹ {{ item.price }}</h6>
                  <small>Colors</small>
                  <div class="color-picker-feature">
                    <div
                      v-if="item.colors.includes('black')"
                      class="black"
                    ></div>
                    <div
                      v-if="item.colors.includes('white')"
                      class="white"
                    ></div>
                    <div
                      v-if="item.colors.includes('yellow')"
                      class="yellow"
                    ></div>
                  </div>
                </div>
              </div>
            </router-link>
            <button v-if="isWishlist" @click="remove(item)" class="prod-btn">Remove</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["products", "isWishlist"],
  name: "ProductGrid",
  computed: {
    filtered() {
      const filters = { sizes: this.size, colors: this.color };
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.products
        .sort((a, b) => b.time - a.time)
        .filter((product) => {
          return Object.entries(filters).every(
            ([filterProperty, filterValues]) => {
              if (!filters[filterProperty].length) {
                return product;
              }
              switch (Object.prototype.toString.call(product[filterProperty])) {
                case "[object Array]":
                  return product[filterProperty].some((productValue) => {
                    return filterValues.includes(productValue);
                  });
              }
            }
          );
        });
    },
  },
  methods: {
    showFilter(data) {
      this.showContent = data;
      this.showFilterDiv = true;
    },
    remove(data){
      this.$store.commit("removeFromWishlist",data)
    }
  },
  created() {},
  components: {},
  data() {
    return {
      size: [],
      color: [],
      showContent: "",
      showFilterDiv: false,
      sort: "",
      filter: "size",
    };
  },
};
</script>

<style lang="scss" scoped>
.prod-btn {
  background: #ce93d8;
  border-radius: 2px;
  font-size: 14px;
  border: none;
  padding: 5px 20px;
  width: 100%;
}
.prod-add::before {
  position: absolute;
  content: "";
  height: 0.1%;
  width: 40%;
  margin-top: 22px;
  background-color: #ce93d8;
}
.prod-add {
  font-weight: 700;
}
.sort-large ul {
  list-style-type: none;
  padding: 0;
  margin: 0px 10px 15px 10px;
}
.sort-large ul li {
  padding: 2px 0px;

  color: rgb(59, 59, 59);
  cursor: pointer;
}
/* product styles
 */
.black {
  background-color: black;
}
.white {
  background-color: white;
}
.yellow {
  background-color: yellow;
}
.color-picker-feature div {
  padding: 6px;
  border: 0.5px solid black !important;
  margin: 2px;
  cursor: pointer;
  border-radius: 2px;
}
.color-picker-feature {
  display: flex;
  flex-direction: row;
  align-content: space-between;
}
.col-6,
.col-md-3 {
  padding: 4px 3px 4px 3px !important;
}
@media only screen and (max-width: 768px) {
  .col-sm-10 {
    max-width: 100% !important;
    flex: 0 0 100% !important;
  }
  .col-sm-2 {
    max-width: 100% !important;
    flex: 0 0 100% !important;
  }
  .container {
    max-width: 100%;
  }
}
a {
  color: unset !important;
  text-decoration: none !important;
}
button:focus {
  outline: none;
}

.prod {
  border-radius: 2px;
}

.prod-title {
  padding: 5px 10px;
}
.prod-title p {
  font-size: 18px;
}
.prod-title h6 {
  margin-bottom: 2px;
}
p {
  margin: 0;
}
.prod-img img {
  vertical-align: middle;
  width: 100%;
  max-width: 100%;
  border-radius: 2px;
}

/* filter styles
 */
.colors .fActive::before {
  margin: 0.5px 0 0 -10px;
}
.c-box .b::before {
  background-color: black;
}

.c-box .y::before {
  background-color: yellow;
}

.c-box .w::before {
  background-color: white;
}
.c-box {
  margin: 10px;
  display: flex;
  align-items: center;
  user-select: none;
}
.c-box label {
  padding-left: 30px;
  cursor: pointer;
  z-index: 12;
}
.c-box input {
  opacity: 0;
  visibility: hidden;
  position: absolute;
}
.c-box .c::before {
  border: 1.5px solid #ce93d8;
}
.c-box .c::before {
  content: "";
  position: absolute;
  margin-top: -10px;
  height: 20px;
  width: 20px;
  z-index: 10;
  border-radius: 2px;
}
.box {
  margin: 10px;
  display: flex;
  align-items: center;
  user-select: none;
}
.box label {
  color: black;
  position: absolute;
  z-index: 10;
  padding-left: 25px;
  cursor: pointer;
}
.box input {
  opacity: 0;
  visibility: hidden;
  position: absolute;
}
.box input:checked ~ .check {
  border-color: #ce93d8;
  box-shadow: 0px 0px 0px 17px #ce93d8 inset;
}
.box input:checked ~ .check::after {
  opacity: 1;
  transform: scale(1);
}
.box .check {
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 100000px;
  border: 1.5px solid #ce93d8;
  box-shadow: 0px 0px 0px 0px #ce93d8 inset;
  transition: all 0.15s cubic-bezier(0, 1.05, 0.72, 1.07);
}
.box .check::after {
  content: "";
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 4;
  position: absolute;
  transform: scale(0);
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: center;
  transition-delay: 0.2s !important;
  transition: all 0.25s cubic-bezier(0, 1.05, 0.72, 1.07);
}

.filter .row .col-3 {
  border-right: 1px solid black;
}
.filter-col a {
  width: 100%;
  padding: 4px 5px;
}
.filter-col {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.sort-div .fActive::before {
  text-align: center;
  margin-left: 25% !important;
}
.filters-div .fActive::before {
  text-align: center;
  margin-left: 20% !important;
}
.fActive {
  color: black !important;
  font-weight: bold;
}
.fActive::before {
  text-align: center;
  display: block;
  position: absolute;
  content: "";
  padding: 3px;
  border-radius: 1000px;
  background-color: #ce93d8;
  margin: 8.5px 0 0 -10px;
}
.sort ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.sort ul li {
  padding: 5px;
  color: rgb(59, 59, 59);
}

.sort,
.filter {
  padding: 15px;
  font-size: 17px;
}
.close-arr {
  width: 15px;
  display: block;
  margin: 15px;
  float: right;
}
@keyframes content {
  0% {
    max-height: 60px;
  }
  25% {
    max-height: 120px;
  }
  50% {
    max-height: 180px;
  }
  100% {
    max-height: 500px;
  }
}
.filter-small-content {
  max-height: 500px;
  z-index: 9;
  animation: 0.3s content linear;
  background-color: #ffebee;
}
.sort-div,
.filters-div {
  position: relative;
  max-width: 50%;
  flex: 0 0 50%;
  padding: 10px;
  text-align: center;
}
.sort-div {
  border-right: 0.1px solid black;
}
button:focus {
  outline: none !important;
}
.filt-btn {
  background-color: transparent !important;
  font-size: 18px;
  border: none !important ;
  width: 100%;
  font-weight: bold;
  height: 100%;
}
.filter-small-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  z-index: 12;
  background-color: #ffebee;
}
.filter-small {
  display: none;
  position: fixed;
  bottom: 0;
  z-index: 10;
  width: 100vw !important;
  margin-left: -5px;
}

@media only screen and (max-width: 768px) {
  .color-picker {
    flex-direction: column;
    align-items: baseline;
    align-content: center;
  }
}
label {
  margin: 0;
}
.filter-large {
  background-color: #ffebee;
  padding: 10px;
  border-radius: 2px;
  height: auto;
  position: sticky !important;
  top: 90px;
}
.col-sm-2 {
  padding: 0 5px 0 5px;
}
@media only screen and (max-width: 768px) {
  .col-sm-2 {
    max-width: 100% !important;
    flex: 0 0 100% !important;
  }
  .filter-large {
    display: none;
  }
  .filter-small {
    display: block !important;
  }
}
</style>
