<template>
<div style="margin-top: -50px">
  <nav-header></nav-header>
  <nav-bread>
    <span slot="bread">商品列表</span>
  </nav-bread>
  <!-- 主体部分 -->
  <div class="accessory-result-page accessory-page">
  <div class="container">
    <!-- 主体头部分 -->
    <div class="filter-nav">
      <a class="sortby">排序方式:</a>
      <a href="javascript:void(0)" class="default cur">默认</a>
      <a href="javascript:void(0)" class="price" @click="sortGoods">
        商品价格
        <svg class="icon-arrow-short" :class="{'sort-up':sortFlag}">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-arrow-short"></use>
        </svg>
        <!-- <span :class="{'sort-up':!sortFlag}"></span> -->
        <!-- <img src="../assets/jiantou.png"> -->
        <!-- <div :class="{'sort-up':sortFlag,'sort-dw':!sortFlag}"></div> -->
      </a>
      <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
    </div>
    <!-- 主体内容部分 -->
    <div class="accessory-result">
      <!-- 左边过滤器部分 -->
      <div class="filter stopPop" id="filter" :class="{'filterby-show':filterBy}">
        <dl class="filter-price">
          <!-- <dt>Price:</dt> -->
          <dt>价格过滤:</dt>
          <dd>
            <a href="javascript:void(0)" :class="{'cur':priceChecked=='all'}" @click="showAll">
            显示全部
            </a>
          </dd>
          <dd v-for="(price,index) in priceFilter" >
            <a href="javascript:void(0)" @click="setPriceFilter(index)" :class="{'cur':priceChecked==index}">
            {{price.startPrice}} - {{price.endPrice}}
            </a>
          </dd>
        </dl>
      </div>
      <!-- 右边搜索结果部分 -->
      <div class="accessory-list-wrap">
        <div class="accessory-list col-4">
          <ul>
            <li v-for="(item,index) in goodsList" :key="index">
              <div class="pic">
                <a :href="item.productUrl"><img v-lazy="'/static/'+item.productImage" alt=""></a>
              </div>
              <div class="main">
                <div class="name">{{item.productName}}</div>
                <div class="price">{{item.salePrice}}</div>
                <div class="btn-area">
                  <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                </div>
              </div>
            </li>
          </ul>
          <!-- 加载更多部分 -->
          <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30" class="loadMore">
            <img src="../assets/loading-spinning-bubbles.svg" v-show="loading">
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  <!-- 弹框部分 -->
  <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
  <modal :mdShow= "mdShow" @close="closeModal">
    <p slot="message">
      请先登录，否则无法加入购物车中
    </p>
    <div slot="btnGroup">
      <a class="btn btn--m" href="javascript:;"" @click="mdShow=false">关闭</a>
    </div>
  </modal>
  <modal :mdShow= "mdShowCart" @close="closeModal">
    <p slot="message">
       <svg class="icon-status-ok">
       <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
       </svg>
       <span>加入购物车成功！</span>
    </p>
    <div slot="btnGroup">
      <a class="btn btn--m" href="javascript:;"" @click="mdShowCart=false">继续购物</a>
      <router-link class="btn btn--m" href="javascript:;" to="/cart">查看购物车</router-link>
    </div>
  </modal>
  <nav-footer></nav-footer>
</div>
</template>


<script type="text/javascript">
  import Vue from 'vue'
  import VueLazyLoad from 'vue-lazyload'
  import "../assets/css/base.css"
  import "../assets/css/product.css"
  import axios from "axios"
  import Modal from "../components/Modal.vue"
  import NavHeader from "../components/NavHeader.vue"
  import NavFooter from "../components/NavFooter.vue"
  import NavBread from  "../components/NavBread.vue"
  export default {
	  data() {
	  	return {
	  		goodsList:[],
        mdShow:false,
        mdShowCart:false,
        priceFilter:[
          {
          startPrice: "0.00",
          endPrice: "100.00"
          },
          {
          startPrice: "100.00",
          endPrice: "500.00"
          },
          {
          startPrice: "500.00",
          endPrice: "1000.00"
          },
          {
          startPrice: "100.00",
          endPrice: "5000.00"
          }
          ],
        priceChecked:"all",
        filterBy: false,
        overLayFlag:false,
        sortFlag:true,
        page:1,
        pageSize:8,
        busy:true,
        loading:false
	  	}
	  },
	  methods: {
      showAll() {
        this.priceChecked='all';
        this.getGoodList();
      },
      showFilterPop() {
        this.filterBy=true;
        this.overLayFlag=true
      },
      closePop () {
        this.filterBy=false;
        this.overLayFlag=false
      },
      setPriceFilter(index) {
        this.priceChecked=index;
        this.page = 1;
        this.getGoodList();
        this.closePop();
      },
      getGoodList(flag) {
        var param = {
          page:this.page,
          pageSize:this.pageSize,
          sort:this.sortFlag?1:-1,
          priceLevel:this.priceChecked
        };
        this.loading=true;
        axios.get("/goods/list",{
          params:param
        }).then((result) => {
          var res= result.data;
          this.loading=false;
          if(res.status=="0") {
            if(flag) {
              this.goodsList = this.goodsList.concat(res.result.list);
              if (res.result.count==0) {
                this.busy = true;
              }else {
                this.busy = false;
              }
            }else {
              this.goodsList = res.result.list;
              this.busy = false;
            }
          }else {
            this.goodList = [];
          }
        })
      },
      sortGoods() {
        this.sortFlag = !this.sortFlag;
        this.page = 1;
        this.getGoodList();
      },
      loadMore() {
        this.busy=true;
        setTimeout(() => {
        this.page++;
        this.getGoodList(true);
        }, 500);
      },
      addCart(productId) {
        axios.post("/goods/addCart",{
          productId:productId
        }).then((res) => {
          console.log(res);
          if(res.data.status == 0) {
            this.mdShowCart=true;
            this.$store.commit("updateCartCount",1);
          }else {
            this.mdShow=true;
          }
        })
      },
      closeModal() {
        this.mdShowCart=false;
      }
	  },
    mounted: function() {
      this.getGoodList();
    },
    components:{
      NavHeader,
      NavFooter,
      NavBread,
      Modal
    }
  }
</script>


<style>
  .loadMore {
    text-align: center;
  }
  .container {
    padding: 0 10px;
  }
  .filter-nav {
    height: 55px;
    line-height: 55px;
    background-color: white;
    text-align: right;
    padding-right: 20px;
    margin: 60px 0 30px 0;
  }
  .def {
    color: #ee7a23;
  }
  .filter-nav span {
    margin-right:  10px;
  }
  .filter-nav a {
    margin-left: 10px;
  }
  .goods-container {
    display: flex;
  }
  .price-warp {
    padding: 0 20px;
    margin-right: 50px;
    width: 230px;
  }
  .price-filter dt {
    height: 40px;
    line-height: 40px;
    margin-bottom: 30px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  .price-filter dd{
    height : 26px;
    line-height: 26px;
    margin-bottom: 20px;
  }
  .price-filter dd a {
    transition: all .3s ease-out
  }
  .cur {
    border-left: 2px solid #ee7a2c;
    color: #ee7a2c;
    transition: all .3s ease-out;
    padding-left: 15px;
  }
  .list-warp {
    flex: 1;
  }
  .list-warp ul::after {
    clear: both;
    content: "";
    height: 0;
    display:  block;
    visibility: hidden;
  }
  .list-warp .item {
    width: 23.80952%;
    float: left;
    margin-right: 1.5%;
    margin-bottom: 1.5%;
    border:  2px solid #e9e9e9;
    background-color: white;
    transition: all .5s ease-out;
  }
  .list-warp .item:hover {
    transform: translateY(-10px);
    transition: all 0.5s ease-out;
    box-shadow: 0 0 3px #e9e9e9;
    border-color: #ee7a2c;
  }
  .list-warp .item:nth-child(4n) {
    margin-right: 0;
  }
  .list-warp .info {
    margin-top:  20px;
    margin-bottom:  10px;
    padding:  0 10px;
  }
  .item img {
    width:  100%;
  }
  .info .info-name {
    height:  4em;
    font-weight: bold;
    font-size: 18px;
  }
  .info .info-name {
    color:  #d1434a;
  }
  .btn {
    display: inline-block;
    line-height: 40px;
    border: 1px solid #d1434a;
    margin-top: 10px;
  }
  .load-more {
    height: 100px;
    line-height:  100px;
    text-align: center;
  }
  .sort-up {
    transform: rotate(180deg);
    transition:all .3s ease-out;
    /* animation: rot .3s ease-out; */
  }
  .btn:hover {
    background-color: #ffe5e6;
    transition: all .3s ease-out;
  }
  /* .sort-dw {
    transform: rotate(0deg);
    transform-origin: 0% 50%;
    transition:all .3s ease-out;
  } */
   /* @keyframes rot{
       from{transform: rotate(0deg)}
       to{transform: rotate(180deg)}
   } */
  /* @font-face {
    font-family: 'icomoon';
    src:  url('../fonts/icomoon.eot?bvxpcp');
    src:  url('../fonts/icomoon.eot?bvxpcp#iefix') format('embedded-opentype'),
      url('../fonts/icomoon.ttf?bvxpcp') format('truetype'),
      url('../fonts/icomoon.woff?bvxpcp') format('woff'),
      url('../fonts/icomoon.svg?bvxpcp#icomoon') format('svg');
    font-weight: normal;
    font-style: normal;
  }
  .filter-nav span {
    font-family: "icomoon";
  } */
  /* .filter-nav div {
    background: url(../assets/jiantou2.png) no-repeat;
    width: 17px;
    height: 20px;
    display: inline-block;
    line-height: 16px;
  } */
  .icon-arrow-short {
    width: 25px;
    height: 25px;
    transition:all .3s ease-out;
  }
  .md-modal .icon-status-ok {
      width: 20px;
      height: 20px;
  }
</style>