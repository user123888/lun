<template>
	<view>
		<uni-section title="新手指导" titleFontSize="30rpx" class="uniSection">
			<template v-slot:decoration>
				<view class="decoration"></view>
			</template>
		</uni-section>
		<view class="content-box">
			<view class="titleBox">
				首次登录流程：
			</view>
			<view class="stepBox">
				<u-steps current="2">
					<u-steps-item title="点击登录"></u-steps-item>
					<u-steps-item title="填写名字头像"></u-steps-item>
					<u-steps-item title="确定登录完成"></u-steps-item>
				</u-steps>
			</view>
		</view>
		<view class="content-box">
			<view class="titleBox">
				非首次登录流程：
			</view>
			<view class="stepBox">
				<u-steps current="2">
					<u-steps-item title="点击登录"></u-steps-item>
					<u-steps-item title="已登录过/跳过"></u-steps-item>
					<u-steps-item title="登录完成"></u-steps-item>
				</u-steps>
			</view>
		</view>
		<view class="content-box">
			<view class="titleBox">
				委托方流程：
			</view>
			<view class="stepBox">
				<u-steps current="2">
					<u-steps-item title="发布委托"></u-steps-item>
					<u-steps-item title="委托被帮忙"></u-steps-item>
					<u-steps-item title="等待被联系"></u-steps-item>
				</u-steps>
			</view>
		</view>
		<view class="content-box">
			<view class="titleBox">
				帮忙方流程：
			</view>
			<view class="stepBox">
				<u-steps current="3">
					<u-steps-item title="委托帮忙"></u-steps-item>
					<u-steps-item title="查看委托信息"></u-steps-item>
					<u-steps-item title="联系委托方"></u-steps-item>
					<u-steps-item title="确定完成委托"></u-steps-item>
				</u-steps>
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
	$uni-success: #1dadc8 !default;

	.decoration {
		width: 10px;
		height: 10px;
		margin-right: 4px;
		border-radius: 50%;
		background-color: $uni-success;
	}

	.content-box {
		height: 180px;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #ffffff;

		.stepBox {
			width: 90%;
			height: 100px;
		}

		.titleBox {
			color: #666;
			font-size: 16px;
			width: 90%;
			height: 50px;
			margin-top: 20px;
		}
	}
</style>