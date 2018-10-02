<template>
<div>
  <!-- 弹框部分 -->
  <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':mdShow}">
    <!-- 登录框 -->
    <div class="md-modal-inner">
      <!-- 登录框头部 -->
      <div class="md-top">
        <!-- 登录框关闭 -->
        <button class="md-close" @click="closeModal">Close</button>
      </div>
      <!-- 登录框身体 -->
      <div class="md-content">
        <!-- 登录框内容 -->
        <div class="confirm-tips">
	        <slot name="message"></slot>
        </div>
        <!-- 登录按钮 -->
        <div class="btn-wrap">
          <slot name="btnGroup"></slot>
        </div>
      </div>
    </div>
  </div>
  <!-- 遮罩部分 -->
  <div class="md-overlay" v-if="mdShow" @click="closeModal"></div>
</div>
</template>


<script>
export default {
	data() {
		return {
			msg: "123"
		}
	},
	props:["mdShow"],
	methods: {
		closeModal() {
		this.$emit("close");
		}
	}
}
</script>


<style >
</style>