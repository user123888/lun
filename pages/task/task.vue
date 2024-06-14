<template>
	<view class="taskView">
		<view class="tarBar">
			<uni-section titleFontSize='18px' title="苑区筛选" type="line">
				<u-tabs :list="list1" @click="hallSearch"></u-tabs>
			</uni-section>
			<uni-section titleFontSize='18px' title="类型筛选" type="line">
				<u-tabs :list="list2" @click="genre"></u-tabs>
			</uni-section>

		</view>
		<!-- 小喇叭-->
		<view class="notice">
			<uni-notice-bar show-icon scrollable text="每个人最多同时帮忙5个委托,超过限定数量可以先完成或取消现有的帮忙!感谢您的配合!" />
		</view>
		<!-- 数据列表 -->
		<view class="dataBox">
			<view class="contentList" v-for="(item,index) in eventData" :key="index">
				<view class="content-left">
					<view class="inBoxList">
						<image src="../../static/id.png" style="width: 16px;height: 16px;"></image>
						<text class="content-text">{{item.hall}}</text>
					</view>
					<view class="inBoxList">
						<image src="../../static/itemblue.png" style="width: 16px;height: 16px;"></image>
						<text class="content-text">{{item.title}}</text>
					</view>

					<view class="aword inBoxList">
						<image src="../../static/aword.png" style="width: 16px;height: 16px;"></image>
						<text class="content-text"><text>报酬:￥{{item.money}}</text></text>
					</view>
					<view class="inBoxList">
						<image src="../../static/time.png" style="width: 16px;height: 16px;"></image>
						<text class="content-text"> <text
								style="color:#333">剩余:{{Math.floor(((changeTime(item.datetimesingle))/1000)/60)}}分钟</text></text>
					</view>
				</view>
				<view class="content-right">
					<u-button @click="dialogToggle('success',item)" size="medium" type="primary" shape="circle"
						:ripple="true" ripple-bg-color="#909399">我要帮忙</u-button>
				</view>
			</view>
		</view>

		<view v-if="showNull" class="noData">
			<image src="../../static/null.png" style="width:100px;height: 100px;"></image>
		</view>
		<view>
			<!-- 提示窗示例 -->
			<uni-popup ref="alertDialog" type="dialog">
				<uni-popup-dialog :type="msgType" cancelText="关闭" confirmText="确定" title="提示" content="确定要帮忙该委托吗？"
					@confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
			</uni-popup>
		</view>
		<!-- 提示信息弹窗 -->
		<uni-popup ref="message" type="message" center>
			<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
		</uni-popup>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				eventData: [],
				//选中帮忙的id
				id: '',
				userid:'',
				genreItem: {
					name: "全部"
				},
				hallItem: {
					name: "全部"
				},

				type: 'center',
				showNull: false,
				msgType: 'success',
				messageText: '这是一条成功提示',
				list1: [{
						name: '全部'
					},
					{
						name: '尚志苑',
					}, {
						name: '志道苑',
					}, {
						name: '明德苑'
					}, {
						name: '新民苑'
					}, {
						name: '新勇苑'
					}, {
						name: '至善苑'
					}, {
						name: '尚雅苑'
					}, {
						name: '尚德苑'
					}, {
						name: '信勇苑'
					}, {
						name: '弘志苑'
					}, {
						name: '十三期北苑'
					}, {
						name: '十三期南苑'
					}, {
						name: '昌明苑'
					}, {
						name: '博雅苑'
					}
				],
				list2: [{
						name: '全部'
					}, {
						name: '校内代拿'
					}, {
						name: '岭师饭堂'
					}, {
						name: '南门代买'
					},
					{
						name: '北门代买'
					},
					{
						name: '东门代买'
					}, {
						name: '岭师快递'
					}
				],
				tempData: [],
				current: 0,

			};
		},
		onShow() {
			uniCloud.callFunction({
				name: 'task'
			}).then(res => {
				this.eventData = res.result.data
				console.log(res.result.data)
				if(this.eventData.length===0){
					this.showNull = true
				}
			})
			console.log(6666)
			this.openid = uni.getStorageSync('openid')

		},
		methods: {
			//首次渲染
			onbegin() {
				
				uniCloud.callFunction({
					name: 'task'
				}).then(res => {
					this.eventData = res.result.data
					// console.log(res.result.data)
					// if(this.eventData.length===0){
					// 	this.showNull = true
					// }
				})
				// 
			},
			//转换时间格式
			changeTime(time) {
				let limitTime = time - Date.now();
				// console.log(Date.now())
				return limitTime
			},
			// 第一个筛选条件 苑区
			hallSearch(hallItem) {
				this.hallItem = hallItem
				this.showNull = false
				if (hallItem.name === "全部" && this.genreItem.name === "全部") {
					this.onbegin()
				}
				if (hallItem.name === "全部" && this.genreItem.name !== "全部") {
					uniCloud.callFunction({
						name: 'searchtitletask',
						data: {
							titlename:this.genreItem.name
						}
					}).then(res => {
						this.eventData = res.result.data
						if (this.eventData.length === 0) {
							this.showNull = true
						}
					})
				}
				if (hallItem.name !== "全部" && this.genreItem.name === "全部") {
					uniCloud.callFunction({
						name: 'searchhalltask',
						data: {
							hallname: hallItem.name
						}
					}).then(res => {
						this.eventData = res.result.data
						if (this.eventData.length === 0) {
							this.showNull = true
						}
					})
				}
				if (hallItem.name !== "全部" && this.genreItem.name !== "全部") {


					uniCloud.callFunction({
						name: 'searchtask',
						data: {
							hallname: this.hallItem.name,
							titlename: this.genreItem.name
						}
					}).then(res => {
						this.eventData = res.result.data
						if (this.eventData.length === 0) {
							this.showNull = true
						}
					})

				}
			},
			// 第二个类型筛选条件
			genre(genreItem) {

				this.showNull = false
				this.genreItem = genreItem
				if (this.hallItem.name === "全部" && genreItem.name === "全部") {
					this.onbegin()
				}
				if (this.hallItem.name === "全部" && genreItem.name !== "全部") {
					uniCloud.callFunction({
						name: 'searchtitletask',
						data: {
							titlename: genreItem.name
						}
					}).then(res => {
						this.eventData = res.result.data
						if (this.eventData.length === 0) {
							this.showNull = true
						}
					})
				}
				if (this.hallItem.name !== "全部" && genreItem.name === "全部") {
					uniCloud.callFunction({
						name: 'searchhalltask',
						data: {
							hallname: this.hallItem.name,
						}
					}).then(res => {
						this.eventData = res.result.data
						if (this.eventData.length === 0) {
							this.showNull = true
						}
					})
				}
				if (this.hallItem.name !== "全部" && genreItem.name !== "全部") {

					uniCloud.callFunction({
						name: 'searchtask',
						data: {
							hallname: this.hallItem.name,
							titlename: this.genreItem.name
						}
					}).then(res => {
						this.eventData = res.result.data

						if (this.eventData.length === 0) {
							this.showNull = true
						}
					})

				}

			},
			sectionChange(index) {
				this.curNow = index
			},
			dialogToggle(type, item) {
				this.id = item._id
				this.userid=item.userid
				// console.log(item)
				this.msgType = type
				this.$refs.alertDialog.open()
			},
			dialogConfirm() {
				if(this.userid !== this.openid&&this.openid){
				uniCloud.callFunction({
					name: 'helptask',
					data: {
						id: this.id,
						openid: this.openid
					}
				}).then(res => {
					this.messageText = `接单成功！请尽快联系委托方完成帮忙！`
					this.$refs.message.open()
					this.onbegin()
					
				})
				}
				if(this.userid ===this.openid) {
					this.messageText = `你不能帮忙你自己的委托!`
					this.msgType='error'
					this.$refs.message.open()
				}
				if(!this.openid){
					uni.showModal({
						title:'请先授权登录！',
						confirmColor:'#18bc37',
						success: (res) => {
							if (res.cancel) {
								uni.showToast({
									title: "用户取消!",
									duration: 500
								})
								return;
							}
							uni.switchTab({
								url:'/pages/user/user'
							})
						}
					})
				}
				

			},

			dialogClose() {
				console.log('点击关闭')
			},
			onSelect(a) {
				console.log(123)

			}


		}
	}
</script>

<style lang="scss">
	.selectBox {
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #ffffff;
	}

	.navList {
		flex: 1;
		justify-content: center;
		align-items: center;
		display: flex;
		color: #999;
	}

	.navList-active {
		flex: 1;
		justify-content: center;
		align-items: center;
		display: flex;
		color: #489dff;
	}





	.contentList {
		width: 100%;
		height: 120px;
		background-color: #ffffff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 5rpx;
	}

	.content-left {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 60%;
		height: 120px;
		margin-left: 5%;


	}

	.content-right {
		width: 30%;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 120px;
		margin-right: 20rpx;
	}

	.inBoxList {
		display: flex;
		align-items: center;
		color: #666;
		font-size: 16px;
		margin-bottom: 10rpx;
	}

	.content-text {
		margin-left: 10rpx;
	}

	.money,
	.name {
		color: #000;
	}


	/deep/.uni-dialog-content-text {
		font-size: 16px;
	}

	/deep/.uni-dialog-title-text {
		color: #489dff;
	}

	/deep/.uni-section-header {
		padding-left: 5px !important;
		padding-bottom: 0px !important;
		padding-top: 0px !important;
		margin-top: 0 !important;
	}

	.tarBar {
		background-color: #fff;
		height: 150px;
		box-sizing: border-box;
		position: sticky;
		top: 0px;
		z-index: 2;
		border: none;
		transform: translateZ(0);
		width: 100%;

	}

	.dataBox {
		width: 100%;
		box-sizing: border-box;
	}

	.taskView {
		height: auto;
	}

	.notice {
		position: sticky;
		top: 150px;
		z-index: 2;
	}

	/deep/.uni-noticebar {
		margin-bottom: 0px !important;
	}

	.noData {
		width: 100%;
		height: 400px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>