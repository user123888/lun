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
					<image src="../../static/wx.png"></image>
					<view class="textBox">
						<text @click="copy" id="1">{{vxValue}}</text>
					</view>

				</view>
				<view class="containner">
					<image src="../../static/qq.png"></image>
					<view class="textBox">
						<text @click="copy" id="2">{{qqValue}}</text>
					</view>
				</view>
				<view class="containner">
					<image src="../../static/qqemail.png"></image>
					<view class="textBox">
						<text @click="copy" id="3">{{qqEmailValue}}</text>
					</view>
				</view>
				<view class="copyBox">
					<text class="copyTextBox">(点击文本可复制)</text>
				</view>
				<u-line color="#2979ff" length="350"></u-line>
				<view class="lastBox">
					有订单疑问 / 小程序问题 请与联系客服
				</view>
			</view>


		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				vxValue: '88888888',
				qqValue: '1649297435',
				qqEmailValue: '1649297435@qq.com',
				currentValue: ''


			};

		},
		methods: {
			copy(e) {
				console.log(e.target.id)
				if (e.target.id == 1) {
					this.currentValue = this.vxValue
				} else if (e.target.id == 2) {
					this.currentValue = this.qqValue
				} else {
					this.currentValue = this.qqEmailValue
				}
				uni.setClipboardData({
					data: this.currentValue,
					success: function(res) {
						wx.showToast({
							title: '复制成功',
							icon: 'success',
							duration: 2000
						});

					},
				})
			}
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
		margin-top: 100px;
		height: 100px;
		width: 100%;

		.containner {
			width: 100%;
			display: flex;
			margin-left: 50px;
			align-items: center;
			height: 50px;
			line-height: 50px;

			.textBox {
				color: #999;
				margin-left: 5px;
			}
		}
	}

	image {
		height: 30px;
		width: 30px;
	}

	.lastBox {
		margin-top: 5px;
		color: #999;
		font-size: 16px;
	}

	.copyTextBox {
		color: #999;
		font-size: 12px;
	}

	.copyBox {
		margin-top: 5px;
		margin-bottom: 2px;
	}
</style>