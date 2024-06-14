<template>
	<view>
		<view class="contentBox">
			<text><slot></slot>-></text>
			<image class="BoxImg" :src="imgUrl"></image>
		</view>
	</view>
</template>

<script>
	export default {
		name:"contentbox",
		props:['item','imgUrl'],
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.BoxImg{
		width: 200rpx;
		height: 200rpx;
		padding-right: 45rpx;
	}
	.contentBox{
		width: 100%;
		height: 300rpx;
		overflow: hidden;
		display: flex;
		border-radius: 20rpx;
		background-color: #ffffff;
		margin-bottom: 30rpx;
		justify-content: space-between;
		align-items: center;
	}
	
	text{ padding-left: 30rpx;
		font-size: 48rpx;
		font-weight: 900;
	}
</style>
