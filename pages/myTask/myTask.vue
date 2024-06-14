<template>
	<view>
		<!-- <u-loading-page :loading="true"></u-loading-page> -->
		<uni-section title="我的委托" titleFontSize="30rpx" class="uniSection">
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
											<text class="content-text">报酬:<text class="money">￥{{item.money}}</text></text>
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

			</view>
		</uni-section>
		<!-- 提示信息弹窗 -->
		<uni-popup ref="message" type="message" center>
			<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
		</uni-popup>
		<!-- 对话框 -->
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog :type="msgType" cancelText="取消" confirmText="确定" title="提醒消息" content="确定要删除该委托吗？"
				@confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>
<script>
	export default {
		components: {},
		data() {
			return {
				
				// 选中的数据id
				delId:"",
				//分段器数据
				list: ['进行中', '已完成', '已超时'],
				showNull: false,
				curNow: 0,

				// 或者如下，也可以配置keyName参数修改对象键名
				// list: [{name: '未付款'}, {name: '待评价'}, {name: '已付款'}],

				currentIndex: -1,
				isOpen: 'none',
				type: 'center',
				msgType: 'error',
				messageText: '提示',
				value: '',
				eventData: [],
				newData: [],
				options1: [{
					text: '取消置顶'
				}],
				options2: [{
						text: '编辑',
						style: {
							backgroundColor: '#007aff'
						}
					},
					{
						text: '删除',
						style: {
							backgroundColor: '#dd524d'
						}
					}
				]
			};
		},
		onLoad() {
			this.onBegin()
			// this.openid = uni.getStorageSync('openid')
			// uniCloud.callFunction({
			// 	name: 'mytask',
			// 	data: {
			// 		userid: this.openid
			// 	}

			// }).then(res => {

			// 	this.newData = res.result.data
			// 	if (this.curNow === 0) {
			// 		this.eventData = this.newData.filter(item => item.datetimesingle - Date.now() > 0)
			// 	}

			// })
		},
		methods: {
			sectionChange(index) {
				// 分段器选择
				this.curNow = index
				this.showNull = false
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
			onBegin(){
				this.openid = uni.getStorageSync('openid')
				if(this.openid){
					uniCloud.callFunction({
						name: 'mytask',
						data: {
							userid: this.openid
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
					this.showNull=true
				}
				},
			
			//转换时间格式
			changeTime(time) {
				let limitTime = time - Date.now();
				// console.log(Date.now())
				return limitTime
			},


			change(index) {

			},
			setOpened(index) {
				this.currentIndex = index
				if (this.isOpen === 'right') {
					this.isOpen = 'none'
				} else {
					this.isOpen = 'right'
				}


			},
			// 删除提示框
			dialogToggle(type,id) {
				this.msgType = type
				this.delId = id
				this.$refs.alertDialog.open()
				// console.log(id)
			},
			// 删除确定
			dialogConfirm() {
				
				uniCloud.callFunction({
					name:'deletemytask',
					data:{
						id:this.delId
					}
				}).then(res=>{
					this.messageText = `删除成功！`
					this.$refs.message.open()
					this.onBegin()
					
				}).catch(err=>{
					this.messageText = '删除失败！'
				})
				
				
			},
			dialogClose() {

			},
			bindClick(e, id) {
				e.content.text === '编辑' ? this.goEdit(id) : this.dialogToggle('error',id)
			},
			goEdit(id) {

				uni.navigateTo({
					url: `/pages/editTask/editTask?id=${id}`
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
		box-sizing: border-box;
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
		width: 60%;
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
		width: 60%;
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

	/deep/.uni-popup-dialog {
		transform: translateY(-100px);
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
		margin-bottom: 0px;
	}

	.btn {
		width: 80%;
	}

	/deep/.u-subsection--subsection {
		height: 35px !important;
	}
</style>