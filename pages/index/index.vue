<template>
	<view class="containner">
		<view class="iconBox">
			<image class="headerIcon" src="../../static/run.png"></image>
			<text style="font-size: 38rpx;">Hi,  欢迎使用</text>
		</view>
		<h1 class="title">LNU跑腿小程序</h1>
	
		<!-- 主体功能 -->	
		<view class="Box">
			<content-box @click.native="toAdd"  :imgUrl="runImgUrl">发布委托</content-box>
			<content-box @click.native="toBuy"  :imgUrl="boxImgUrl">我要帮忙</content-box>
			<content-box  @click.native="toMyTask" :imgUrl="taskImgUrl">我要委托</content-box>
		</view>
	</view>
</template>

<script>
export default {
	
    data() {
        return {
	  boxImgUrl:"../../static/box.png",
	  runImgUrl:"../../static/bugdrink.png",
	  taskImgUrl:"../../static/taskblue.png"
        }
    },
    methods: {
		toMyTask(){
			uni.navigateTo({
				url: '/pages/myTask/myTask'
			})
		},
		toBuy(){
			uni.navigateTo({
				url: '/pages/myHelp/myHelp'
			})
		},
		toAdd(){
			uni.navigateTo({
				url: '/pages/addTask/addTask'
			})
        }
}
}
</script>
<style>
	
	.iconBox{
		padding: 20rpx 10px 10px 50rpx;
	}
	.title{
		font-size: 40rpx;
		font-weight: bold;
		padding-left: 50rpx;
	}
	.Box{
		height: 1800rpx;
		padding-left: 30rpx;
		padding-right: 30rpx;
		margin-top: 30rpx;
		display: flex;
		flex-flow: column;
		flex-wrap: wrap;
	}
	.headerIcon{
		width: 80rpx;
		height: 80rpx;
	}
</style>
