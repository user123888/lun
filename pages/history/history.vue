<template>
	<view class="">


		<view>
			<u-search shape="round"></u-search>
		</view>
		<view class="search">
			<u-cell-group>
				<u-cell title="委托类型" value="委托/帮忙"></u-cell>
			</u-cell-group>
		</view>
		<view class="totalBox">
			<text class="total">累计{{total||0}}条</text>

		</view>
		<!-- 每一个盒子 -->
		<view class="itemBox" v-for="(item,index) in eventData" :key="index">
			<view class="forLeft">
			{{item.title}}
			</view>
			<view class="forRight">
				{{change(item)}}
			</view>
		</view>

		<!-- <view class="itemBox">
			<view class="forLeft">
				2021年5月1日
			</view>
			<view class="forRight">
				委托
			</view>
		</view> -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				total:null,
				openid: '',
				eventData: []

			};
		},
		onLoad() {
			this.openid = uni.getStorageSync('openid')

		},
		onShow() {
			this.begin()
		},
		methods: {
			begin() {
				uniCloud.database().collection('task')
					.where(uniCloud.database().command.or({
						userid: this.openid
					}, {
						helperid: this.openid
					}))
					.get()
					.then(res => {
						this.eventData=res.result.data
						this.total = res.result.data.length
					})
			},
			change(item){
				if(item.userid===this.openid){
					return '委托'
				}
				else {
					return '帮忙'
				}
			}
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
	}

	.total {
		margin-left: 10px;
		font-size: 12px;
		color: #999;
	}

	.itemBox {
		height: 35px;
		display: flex;
		background-color: #ffffff;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid rgba(214, 219, 223, 0.8);
		margin-bottom: 2px;

		.forLeft {
			color: #666;
			width: 30%;
			margin-left: 15px;
		}

		.forRight {
			color: #666;
			width: 15%;
			margin-right: 15px;
		}
	}
</style>