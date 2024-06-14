<template>
	<view>
		<uni-section title="我的帮忙" titleFontSize="30rpx" class="uniSection">
			<template v-slot:decoration>
				<view class="decoration"></view>
			</template>
			<view class="blackBox">

			</view>

			<u-subsection fontSize="14" :list="list" :current="curNow" @change="sectionChange" mode="subsection"
				style="margin-bottom: 10px;"></u-subsection>


			<view>
				<uni-swipe-action v-for="(item,index) in eventData" :key="index">
					<uni-swipe-action-item :right-options="options2" @change="change(index)"
						@click="bindClick($event,item._id)" :show="index===currentIndex? isOpen:'none'">
						<view class="content-box">
							<view class="itemBox" @click="setOpened(index)">
								<!-- 左侧大盒子 -->
								<view class="content-left">
									<view class="inBoxList">
										<image src="../../static/id.png" style="width: 16px;height: 16px;"></image>
										<text class="content-text">{{item.hall}}</text>
									</view>
									<view class="inBoxList">
										<image src="../../static/itemblue.png" style="width: 16px;height: 16px;">
										</image>
										<view>
											<text class="content-text">{{item.title}}</text>
										</view>
									</view>

									<view class="inBoxList">
										<image src="../../static/aword.png" style="width: 16px;height: 16px;"></image>
										<view>
											<text class="content-text">报酬:<text
													class="money">￥{{item.money}}</text></text>
										</view>
									</view>
									<view class="inBoxList">
										<image src="../../static/time.png" style="width: 16px;height: 16px;"></image>
										<text class="content-text"> <text
												style="color:#333">剩余:{{Math.floor(((changeTime(item.datetimesingle))/1000)/60)}}分钟</text></text>
									</view>
								</view>


								<!-- 右侧大盒子 -->
								<view class="content-right">
									<image src="../../static/sliderow.png" style="width: 50px;height: 40px;"></image>
								</view>

							</view>
						</view>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</view>
			<view v-if="showNull" class="nullData">
				<view class="imgBox">
					<image class="nullbox" src="../../static/null.png"></image>
				</view>
				<!-- <button @tap="toHelp()" type="primary" style="width: 80%;">去帮忙</button> -->
			</view>

		</uni-section>
		<!-- 提示信息弹窗 -->
		<uni-popup ref="message" type="message" center>
			<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
		</uni-popup>
		<!-- 对话框 -->
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog :type="msgType" cancelText="取消" confirmText="确定" title="提醒消息" content="确定要取消帮忙吗？"
				@confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>
<script>
	export default {
		components: {},
		data() {
			return {
				//选中的id
				id: "",
				openid: null,
				//分段器数据
				list: ['进行中', '已完成', '已超时'],
				curNow: 0,
				showNull: false,
				newData: [],
				currentIndex: -1,
				isOpen: 'none',
				type: 'center',
				msgType: 'success',
				messageText: '提示',
				value: '',
				eventData: [],

				options2: [{
						text: '查看',
						style: {
							backgroundColor: '#007aff'
						}
					},
					{
						text: '取消',
						style: {
							backgroundColor: '#dd524d'
						}
					}
				]
			};
		},
		onLoad() {
			this.openid = uni.getStorageSync('openid')
			this.onBegin()

		},
		methods: {
			onBegin() {
				if(this.openid){
				uniCloud.callFunction({
					name: 'myhelp',
					data: {
						helperid: this.openid
					}
				}).then(res => {

					this.newData = res.result.data
					
					if (this.curNow === 0) {
						this.eventData = this.newData.filter(item => item.datetimesingle - Date.now() > 0)
						if(this.eventData.length===0){
						this.showNull=true
					}
					}

				})
				}
				else {
					this.showNull = true
				}
			},
			sectionChange(index) {
				// 分段器选择
				this.curNow = index
				this.showNull = false
				// this.nullImg=
				//  this.btnMsg="去发布"
				if (index === 0) {
					this.eventData = this.newData.filter(item => item.datetimesingle - Date.now() > 0)
					if (this.eventData.length === 0) {
						this.showNull = true
					}

				}
				if (index === 1) {
					this.eventData = this.newData.filter(item => item.datetimesingle == 0)
					if (this.eventData.length === 0) {
						this.showNull = true
					}
				}
				if (index === 2)
					this.eventData = this.newData.filter(item => item.datetimesingle - Date.now() < 0)
				if (this.eventData.length === 0) {
					this.showNull = true
				}
			},
			toHelp() {
				uni.switchTab({
					url: '/pages/task/task'
				})
			},
			//转换时间格式
			changeTime(time) {
				let limitTime = time - Date.now();
				// console.log(Date.now())
				return limitTime
			},
			change(index) {
				// if (this.currentIndex = index)
			},
			setOpened(index) {
				this.currentIndex = index
				if (this.isOpen === 'right') {
					this.isOpen = 'none'
				} else {
					this.isOpen = 'right'
				}


			},

			dialogToggle(type, id) {
				this.id = id
				this.msgType = type
				this.$refs.alertDialog.open()
			},
			dialogConfirm() {
				uniCloud.callFunction({
					name: 'helptask',
					data: {
						id: this.id,
						openid: 0
					}
				}).then(res => {
					this.messageText = `取消成功！`
					this.$refs.message.open()
					this.onBegin()
				})


			},
			dialogClose() {
				console.log('点击关闭')
			},
			bindClick(e, id) {
				e.content.text === '查看' ? this.goLook(id) : this.dialogToggle('success', id)
			},
			goLook(id) {
				uni.navigateTo({
					url: `/pages/lookTask/lookTask?id=${id}`
				})
			}
		}
	};
</script>
<style lang="scss">
	$uni-success: #489dff !default;

	.decoration {
		width: 10px;
		height: 10px;
		margin-right: 4px;
		border-radius: 50%;
		background-color: $uni-success;
	}

	.title {
		font-size: 18px;
		font-weight: bold;
		margin: 20px 0 5px 0;
	}

	.content-box {
		// flex: 1;
		height: 120px;
		padding: 0 15px;
		position: relative;
		background-color: #fff;
		border: 1px solid #f5f5f5;

	}

	.itemBox {
		width: 100%;
		height: 120px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.content-left {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 50%;
		height: 120px;
	}

	.content-right {
		width: 10%;
		display: flex;
		align-items: center;
		justify-content: right;
		height: 100px;
	}

	.inBoxList {
		width: 350px;
		display: flex;
		align-items: center;
		color: #666;
		font-size: 16px;
		margin-bottom: 5px;


	}

	.content-text {
		font-size: 16px;
		height: 21px;
		line-height: 21px;
		width: 40%;
		margin-left: 10rpx;

	}

	.blackBox {
		width: 100%;
		height: 10px;
	}

	/deep/.uni-dialog-content-text {
		font-size: 16px;
	}

	/deep/.uni-dialog-title-text {
		color: #489dff;
	}

	.nullData {
		margin-top: 50px;
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 900px;
		width: 100%;
	}

	.nullbox {
		width: 100px;
		height: 100px;
	}

	.imgBox {
		margin-bottom: 50px;
	}

	/deep/.u-subsection--subsection {
		height: 35px !important;
	}

	.container {
		/* #ifndef APP-NVUE */
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		/* #endif */
	}
</style>