<template>
<!-- //面包屑部分 -->
<div class="nav-breadcrumb-wrap"  >
  <div class="container" style="display: flex;" >
    <nav class="nav-breadcrumb">
      <a href="/">主页</a>
      <!-- <span>Goods</span> -->
      <slot name="bread"></slot>
      <slot name="myCard"></slot>
      <slot name="orderConfirm"></slot>
      <slot name="orderSuccess"></slot>
      <slot name="Address"></slot>
    </nav>
  </div>
</div>
</template>


<script>
export default {
	data() {
		return {
			msg: "123"
		}
	},
	methods: {
		show() {
		console.log("object")
		}
	}
}
</script>


<style>
  .bread{
      height: 45px;
      line-height: 45px;
      background-color: #f0f0f0;
  }
  .bread-wrap{
      padding: 0 10px;
      font-size: 14px;
      color: #a1a1a1;
  }
  .bread-wrap a{
    position: relative;
      margin-right: 20px;
  }
  .bread-wrap a::after{
      position: absolute;
      top: 0px;
      content:'/';
      height:20px;
      line-height: 20px;
  }
  .bread-wrap span{
      color:#d1434a;
  }
</style>