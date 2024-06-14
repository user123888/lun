<template>
	<view class="">


		<view>
			<u-search shape="round"></u-search>
		</view>
		<view class="search">
			<u-cell-group>
				<u-cell title="历史订单" value="委托/帮忙"></u-cell>
			</u-cell-group>
		</view>
		<view class="totalBox">
			<text class="total">累计0条</text>

		</view>
		<!-- 每一个盒子 -->
		<view class="itemBox">
			<view class="forLeft">
				你好
			</view>
			<view class="forRight">
				你好啊
			</view>
		</view>
		
		<view class="itemBox">
			<view class="forLeft">
				你好
			</view>
			<view class="forRight">
				你好啊
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
	.search {

		margin-top: 10px;
		margin-bottom: 5px;
	}

	.totalBox {
		width: 100%;
		height: 30px;

		box-sizing: border-box;
		// border-bottom: 1px solid rgba(214, 219, 223, 0.8);
		// opacity: 0.2;
	}

	.total {
		margin-left: 10px;
		font-size: 12px;
		color: #999;
	}

	.itemBox {
		height: 35px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid rgba(214, 219, 223, 0.8);
		// border-top: 1px solid rgba(214, 219, 223, 0.8);
		margin-bottom: 2px;

		.forLeft {
			width: 30%;
			margin-left: 15px;
		}

		.forRight {
			width: 15%;
			margin-right: 15px;
		}
	}
</style>