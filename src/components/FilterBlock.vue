<template>
  <div class="col-sm-2">
    <div class="filter-large">
      <h6 class="text-muted">FILTERS</h6>
      <label for="sizes"
        >Size
        <small class="text-muted" v-if="size" @click="size = ''">
          clear
        </small></label
      >
      <div>
        <div class="box">
          <input v-model="size" id="one" value="s" type="checkbox" />
          <span class="check"></span>
          <label for="one">SMALL</label>
        </div>
        <div class="box">
          <input v-model="size" id="two" value="m" type="checkbox" />
          <span class="check"></span>
          <label for="two">MEDIUM</label>
        </div>
        <div class="box">
          <input v-model="size" id="three" value="l" type="checkbox" />
          <span class="check"></span>
          <label for="three">LARGE</label>
        </div>
        <div class="box">
          <input v-model="size" id="four" value="xl" type="checkbox" />
          <span class="check"></span>
          <label for="four">XLARGE</label>
        </div>
        <div class="box">
          <input v-model="size" id="five" value="xxl" type="checkbox" />
          <span class="check"></span>
          <label for="five">XXLARGE</label>
        </div>
      </div>
      <label for="color"
        >Color
        <small class="text-muted" v-if="color" @click="color = ''">
          clear
        </small>
      </label>
      <div>
        <div class="c-box">
          <input
            v-model="color"
            type="checkbox"
            name="black"
            id="black"
            value="black"
          />
          <span class="c b"></span>
          <label for="black"> BLACK</label>
        </div>

        <div class="c-box">
          <input
            v-model="color"
            type="checkbox"
            name="yellow"
            id="yellow"
            value="yellow"
          />
          <span class="c y"></span>
          <label for="yellow"> YELLOW</label>
        </div>

        <div class="c-box">
          <input
            v-model="color"
            type="checkbox"
            name="white"
            id="white"
            value="white"
          />
          <span class="c w"></span>
          <label for="white"> WHITE</label>
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
          <h5>Filters</h5>
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
                  <input v-model="size" id="one" value="s" type="checkbox" />
                  <span class="check"></span>
                  <label for="one">SMALL</label>
                </div>
                <div class="box">
                  <input v-model="size" id="two" value="m" type="checkbox" />
                  <span class="check"></span>
                  <label for="two">MEDIUM</label>
                </div>
                <div class="box">
                  <input v-model="size" id="three" value="l" type="checkbox" />
                  <span class="check"></span>
                  <label for="three">LARGE</label>
                </div>
                <div class="box">
                  <input v-model="size" id="four" value="xl" type="checkbox" />
                  <span class="check"></span>
                  <label for="four">XLARGE</label>
                </div>
                <div class="box">
                  <input v-model="size" id="five" value="xxl" type="checkbox" />
                  <span class="check"></span>
                  <label for="five">XXLARGE</label>
                </div>
              </div>
              <div v-if="filter === 'color'">
                <div class="c-box">
                  <input
                    v-model="color"
                    type="checkbox"
                    name="black"
                    id="black"
                    value="black"
                  />
                  <span class="c b"></span>
                  <label for="black"> BLACK</label>
                </div>

                <div class="c-box">
                  <input
                    v-model="color"
                    type="checkbox"
                    name="yellow"
                    id="yellow"
                    value="yellow"
                  />
                  <span class="c y"></span>
                  <label for="yellow"> YELLOW</label>
                </div>

                <div class="c-box">
                  <input
                    v-model="color"
                    type="checkbox"
                    name="white"
                    id="white"
                    value="white"
                  />
                  <span class="c w"></span>
                  <label for="white"> WHITE</label>
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
        <span class="text-muted" style="color:#ce93d8;">|</span>
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
</template>

<script>
export default {
  name: "FilterBlock",
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
  methods: {
    showFilter(data) {
      this.showContent = data;
      this.showFilterDiv = true;
    },
  },
};
</script>

<style scoped>
.c-box input:checked ~ .b::before {
  background-color: black;
}

.c-box input:checked ~ .y::before {
  background-color: yellow;
}

.c-box input:checked ~ .w::before {
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
  border: 2px solid #ce93d8;
}
.c-box .c::before {
  content: "";
  position: absolute;
  margin-top: -10px;
  height: 20px;
  width: 20px;
  z-index: 10;
  border-radius: 10000px;
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
  border: 3px solid #ce93d8;
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
.border::before {
  position: absolute;
  content: "";
  padding: 0.7px 8px;
  margin-left: -8px;
  margin-top: 20px;
  background-color: black;
}
.border {
  box-shadow: 0 0 5px 0.1px #ce93d8;
}
.black {
  background-color: black;
  padding: 15px;
  border: 1px solid black !important;
  margin: 5px;
  cursor: pointer;
  border-radius: 2px;
}
.white {
  background-color: white;
  padding: 15px;
  border: 1px solid black !important;
  margin: 5px;
  cursor: pointer;
  border-radius: 2px;
}
.yellow {
  background-color: yellow;
  padding: 15px;
  border: 1px solid black !important;
  margin: 5px;
  cursor: pointer;
  border-radius: 2px;
}
.color-picker {
  display: flex;
  flex-direction: row;
  align-content: space-between;
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
.size {
  display: flex;
  flex-direction: row;
  align-content: space-between;
  margin-bottom: 10px;
}
.size div {
  background-color: #ffebee;
  border: 1px solid black !important;
  margin: 5px;
  cursor: pointer;
  border-radius: 2px;
  height: 32px;
  width: 32px;
  text-align: center;
  line-height: 32px;
  font-weight: bold;
}
.act {
  box-shadow: 0 0 5px 0.1px #ce93d8;
}
.act::before {
  text-align: center;
  display: block;
  position: absolute;
  content: "";
  padding: 0.7px 10px;
  margin-left: 5px;
  margin-top: 37px;
  background-color: black;
}
.filter-large {
  background-color: #ffebee;
  height: 700px;
  padding: 10px;
  border-radius: 2px;
  position: sticky !important;
    top: 100px !important;
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
