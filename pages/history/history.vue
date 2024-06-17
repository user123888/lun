<template>
	<view>
		<uni-section title="查询记录" titleFontSize="30rpx" class="uniSection">
			<template v-slot:decoration>
				<view class="decoration"></view>
			</template>
		</uni-section>

		<view>
			<u-search shape="round" @custom='searchValue' @search='searchValue' placeholder='委托类型搜索'></u-search>
		</view>
		<view class="search">
			<u-cell-group>
				<u-cell title="创建时间/委托类型" value="委托/帮忙"></u-cell>
			</u-cell-group>
		</view>
		<view class="totalBox">
			<text class="total">累计{{total||0}}条</text>

		</view>
		<!-- 每一个盒子 -->
		<view class="itemBox" v-for="(item,index) in eventData" :key="index">
			<view class="forLeft">
				{{timestampToDate(item.addtimesingle)}} - {{item.title}}
			</view>
			<view class="forRight">
				{{change(item)}}
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				total: null,
				openid: '',
				eventData: [],
				tempData: []

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
						this.eventData = res.result.data
						this.tempData = res.result.data
						this.total = res.result.data.length
					})
			},
			change(item) {
				if (item.userid === this.openid) {
					return '委托'
				} else {
					return '帮忙'
				}
			},
			timestampToDate(timestamp) {
				const date = new Date(timestamp); // 将时间戳转换为Date对象
				const options = {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				}; // 定义日期格式
				return new Intl.DateTimeFormat('zh-CN', options).format(date); // 使用Intl.DateTimeFormat进行格式化
			},
			searchValue(value) {
				if (value) {
					console.log((value))
					this.eventData = this.tempData.filter(item => item.title == value)
					this.total = this.eventData.length
				} else {
					this.begin()
				}
			}

		}
	}
</script>

<style lang="scss">
	$uni-success: #42ca86 !default;

	.decoration {
		width: 10px;
		height: 10px;
		margin-right: 4px;
		border-radius: 50%;
		background-color: $uni-success;
	}

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
		font-size: 14px;
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
			width: 75%;
			margin-left: 15px;
		}

		.forRight {
			color: #666;
			width: 15%;
			margin-right: 15px;
		}
	}
</style>