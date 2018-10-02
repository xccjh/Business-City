<template>
<div style="margin-top: -50px">
  <nav-header></nav-header>
  <nav-bread>
  	<span slot="orderSuccess">
  		订单信息
  	</span>
  </nav-bread>
  <div class="container">
    <div class="page-title-normal">
      <!-- <h2 class="page-title-h2"><span>check out</span></h2> -->
      <h2 class="page-title-h2" style="font-size: 20px;"><span>订单已付款</span></h2>
    </div>
    <!-- 进度条 -->
    <div class="check-step">
      <ul>
        <!-- <li class="cur"><span>Confirm</span> address</li>
        <li class="cur"><span>View your</span> order</li>
        <li class="cur"><span>Make</span> payment</li>
        <li class="cur"><span>Order</span> confirmation</li> -->
          <li class="cur"><span>确认</span>地址</li>
          <li class="cur"><span>查看</span>订单</li>
          <li class="cur"><span>支付</span>金额</li>
          <li class="cur"><span>订单</span>信息</li>
      </ul>
    </div>

    <div class="order-create">
      <div class="order-create-pic"><img src="/static/ok.png" alt=""></div>
      <div class="order-create-main">
        <!-- <h3>Congratulations! <br>Your order is under processing!</h3> -->
        <h3>恭喜你! <br>你的订单已经完成啦！</h3>
        <p>
          <!-- <span>Order ID：{{orderId}}</span> -->
          <!-- <span>Order total：{{orderTotal | currency("¥")}}</span> -->
          <span>订单ID：{{orderId}}</span>
          <span>订单总金额：{{orderTotal | currency("¥")}}</span>
        </p>
        <!-- 两个按钮 -->
        <div class="order-create-btn-wrap">
          <div class="btn-l-wrap">
            <!-- <a href="javascript:;" class="btn btn--m">Cart List</a> -->
            <router-link class="btn btn--m" to='/cart'>查看购物车</router-link>
          </div>
          <div class="btn-r-wrap">
            <!-- <a href="javascript:;" class="btn btn--m">Goods List</a> -->
            <router-link class="btn btn--m" to='/'>商品列表</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <nav-footer></nav-footer>
</div>

</template>


<script>
  import {currency} from "../util/currency.js"
  import "../assets/css/base.css"
  import "../assets/css/checkout.css"
  import axios from "axios"
  import Modal from "../components/Modal.vue"
  import NavHeader from "../components/NavHeader.vue"
  import NavFooter from "../components/NavFooter.vue"
  import NavBread from  "../components/NavBread.vue"
  export default {
  	data() {
  		return {
  			orderId: 0,
  			orderTotal:0
  		}
  	},
  	mounted(){
  		var orderId = this.$route.query.orderId;
  		if (!orderId) {
  			return;
  		}
  		axios.get("/users/orderDetail",{
  			params:{orderId:orderId}
  		}).then((response)=> {
  			let res= response.data;
  			if(res.status=='0') {
  				this.orderId = orderId;
  				this.orderTotal = res.result.orderTotal
  			}
  		});
  	},
  	methods: {
  		show() {
  		console.log("object")
  		}
  	},
  	components:{
  		Modal,
		NavHeader,
		NavFooter,
		NavBread
  	}
  }
</script>


<style>
</style>