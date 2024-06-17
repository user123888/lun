<template>
	<view class="page">
		<uni-section title="联系客服" titleFontSize="30rpx" class="uniSection">
			<template v-slot:decoration>
				<view class="decoration"></view>
			</template>
			</uni-section>
		<view class="main">
			<view class="everyItem">
				<view class="containner">
					<image src="../../static/qq.png"></image><view class="textBox">qq：1649297435</view>
				</view>
				<view class="containner">
					<image src="../../static/wx.png"></image><view class="textBox">vx：cjtyxt</view>
				</view>	
				<u-line color="#2979ff" length="350"></u-line>
				<view class="lastBox">
				小程序问题 / 订单疑问 请与上方客服联系
				</view>
			</view>
			

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	$uni-success: #e2911a !default;
	.decoration {
		width: 10px;
		height: 10px;
		margin-right: 4px;
		border-radius: 50%;
		background-color: $uni-success;
	}
	.page {
		height: 800px;
		background-color: #ffffff;

		.main {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	.everyItem {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		margin-top: 150px;
		height: 100px;
		width: 100%;
		.containner {
			display: flex;
			justify-self: center;
			align-items: center;
			height: 50px;
			line-height: 50px;
		.textBox{
			margin-left: 5px;
		}
		}
	}
	image {
		height: 30px;
		width: 30px;
	}

	.lastBox{
		margin-top: 5px;
		color: #999;
		font-size: 16px;
	}
</style>