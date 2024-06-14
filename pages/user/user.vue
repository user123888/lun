<template>

	<view class="userPage">
		<u-popup :show="show" :round="10" @close="close" @open="open" :closeOnClickOverlay="false">
			<view class="popUpBox">

				<view class="userInfoBox">
					<!-- 第一个表单 -->
					<view class="inpBox">
						<view class="inpLeftBox">
							<text>设置头像</text>
						</view>
						<view class="inpRightBox">


							<button class="avatarBtn" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">


								<u-avatar :src="avatarUrl" shape="square" size="40"></u-avatar>
							</button>

						</view>
					</view>
					<u-line length="100%"></u-line>
					<!-- 第二个表单 -->
					<view class="inpBox">
						<view class="inpLeftBox">
							设置昵称
						</view>
						<view class="inpRightBox">
							<input ref="inputName" class="nameInput" type="nickname" placeholder="昵称"
								v-model="nickname" />
						</view>
					</view>
					<view class="inpBox">
						<view class="confirm-text">
							<u-button size="large" type="primary" :plain="true" shape="circle" @click="submitUser"
								text="确定"></u-button>
							<view class="textBox">
								<text @click="submitUser">已登录过 / 直接跳过</text>
							</view>
						</view>
					</view>
				</view>

				<!-- <button class="avatarBtn" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
					<u-avatar :src="avatarUrl" shape="square" size="60"></u-avatar>
				</button>
				<input ref="inputName" class="nameInput" type="nickname" placeholder="昵称" v-model="nickname" />
				<view class="btnBox">
					<u-button size="default" type="primary" :plain="true" shape="circle" @click="submitUser"
						text="确定"></u-button>

					<u-button size="default" type="primary" :plain="true" shape="circle" @click="submitUser"
						text="已设置,跳过"></u-button>
				</view> -->
			</view>
		</u-popup>
		<view class="bgcBox">
			<!-- 用户框 -->
			<view class="userBox">
				<!-- 头像 -->
				<view class="avatarBox">
					<u-avatar class="avatar" :src="avatarUrl||null" shape="circle" size="80"></u-avatar>
				</view>

				<!-- 登录按钮 -->
				<view v-if="!isLogin" class="loginBtnBox">
					<u-button class="loginBtn" size="default" type="primary" :plain="true" shape="circle" @click="login"
						text="点击登录"></u-button>

				</view>
				<view v-else class="noLoginBox">
					<text class="noLoginBoxText">{{nickname||'微信用户'}}</text>
				</view>
			</view>
		</view>
		<!-- 功能列表菜单-->
		<view class="funtionOrder">
			<!-- 第一个菜单框 -->
			<view class="InFirstOrder">
				<!-- 每一项  -->
				<view class="OrderList borderLine" @click="goHistory">
					<view class="list-left ">
						<image src="../../static/searchnew.png" style="width: 20px;height: 20px;"></image>
						<text class="textcontent">查询记录</text>
					</view>
					<view class="list-right">
						<image src="../../static/row.png" style="width: 16px;height: 16px;"></image>
					</view>
				</view>
				<!-- 每一项 -->
				<view class="OrderList borderLine">
					<view class="list-left">
						<image src="../../static/guide.png" style="width: 20px;height: 20px;"></image>
						<text class="textcontent">新手指导</text>
					</view>
					<view class="list-right">
						<image src="../../static/row.png" style="width: 16px;height: 16px;"></image>
					</view>
				</view>
				<view class="OrderList">
					<view class="list-left">
						<image src="../../static/customer.png" style="width: 20px;height: 20px;"></image>
						<text class="textcontent">联系客服</text>
					</view>
					<view class="list-right">
						<image src="../../static/row.png" style="width: 16px;height: 16px;"></image>
					</view>
				</view>
			</view>

			<!-- 第二个菜单框 -->
			<view class="InSecondOrder" ref="main">
				<uni-section class="section" title="委托数据统计图" type="line"></uni-section>
				<view class="charts-box">
					<qiun-data-charts class="charts" type="pie" :opts="opts" :chartData="chartData" />
				</view>
				</ec-canvas>
			</view>
		</view>


	</view>
</template>

<script>
	import input from '../../uni_modules/uview-ui/libs/config/props/input';
	export default {
		data() {
			return {
				fileID: '',
				openid: '',
				nickname: '',
				avatarUrl: '',
				show: false,
				userData: [],
				isLogin: 0,
				chartData: {},
				opts: {
					color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
						"#ea7ccc"
					],
					padding: [5, 5, 5, 5],
					enableScroll: false,
					extra: {
						pie: {
							activeOpacity: 0.5,
							activeRadius: 10,
							offsetAngle: 0,
							labelWidth: 15,
							border: true,
							borderWidth: 3,
							borderColor: "#FFFFFF"
						}
					}
				}

			}
		},
		onShow() {
			uniCloud.callFunction({
				name: 'wakeup',
			})
		},
		methods: {
			submitUser() {
				this.show = false
				this.getData(this.openid)

			},
			onChooseAvatar(e) {
				this.avatarUrl = e.detail.avatarUrl

				// 上传图片到unicloud的云存储空间
				uniCloud.uploadFile({
					filePath: this.avatarUrl,
					cloudPath: `${this.openid}.jpg`,
					onUploadProgress: function(progressEvent) {
						console.log(progressEvent);
						var percentCompleted = Math.round(
							(progressEvent.loaded * 100) / progressEvent.total
						);
					},
					success: function(res) {
						this.fileID = res.fileID
						uni.showToast({
							icon: 'none',
							title: '上传成功',
							duration: 1500
						})
					}.bind(this)
				});
			},
			open() {
				// console.log('open');
			},
			goHistory() {
				uni.navigateTo({
					url: '/pages/history/history',

				})
			},
			close() {
				this.show = false
			},
			login() {
				uniCloud.callFunction({
					name: 'wakeup'
				})
				if (!this.isLogin) {
					uni.showModal({
						title: "微信授权一键登录",
						showCancel: true,
						confirmColor: '#18bc37',
						success: (res) => {
							if (res.cancel) {
								uni.showToast({
									title: "用户取消!",
									duration: 500
								})
								return;
							}
							uni.showLoading({
								title: "登录中",
								// duration: 3000
							})
							uni.getUserProfile({
								desc: '获取数据',
								success: (res) => {
									this.getWeiXinData(res.userInfo)
									this.isLogin = 1

								},
								fail: () => {
									uni.showToast({
										title: '登录失败！'
									})
								}
							})
						}
					})
				}
			},
			async getWeiXinData(userInfo) {
				await uni.login({
					provider: 'weixin'
				}).then(res => {
					uniCloud.callFunction({
						name: 'login',
						data: {
							code: res.code
						}
					}).then(r => {

						this.openid = r.result.openid
						this.show = true

					})
				})
			},
			async getData(openid) {
				uni.setStorageSync('openid', openid)

				await uniCloud.database().collection('user').where({
					openid: openid
				}).get().then(res => {
					this.userData = res.result.data
				})
				if (this.userData.length !== 0 && this.openid) {

					this.nickname = this.userData[0].name
					this.avatarUrl = this.userData[0].imgurl
					this.isLogin = 1
					uni.showToast({
						title: '登录成功！',
					})
					this.getServerData()
					console.log(this.userData)


				} else if (this.openid) {
					uniCloud.database().collection('user').add({
						name: this.nickname,
						imgurl: this.fileID,
						openid: openid
					}).then(res => {
						uni.showToast({
							title: '登录成功！',
						})
						this.getServerData()
						console.log("走2")
						console.log('添加成功！')
						// console.log(this.fileID)
					})
				} else {
					uni.showToast({
						title: "网络错误!"
					})
					console.log("走3")
					this.isLogin = 0
				}

			},
			getServerData() {
				//模拟从服务器获取数据时的延时
				setTimeout(() => {
					//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
					let res = {
						series: [{
							data: [{
									"name": "楼下",
									"value": 50,
									"labelShow": false
								}, {
									"name": "饭堂",
									"value": 30,
									"labelShow": false
								}, {
									"name": "南门",
									"value": 20,
									"labelShow": false
								}, {
									"name": "东门",
									"value": 18,
									"labelShow": false
								}, {
									"name": "北门",
									"value": 22,
									// "labelShow": false
								},
								{
									"name": "其他",
									"value": 10,
									"labelShow": false
								}
							]
						}]
					};
					this.chartData = JSON.parse(JSON.stringify(res));
				}, 500);
			},
			click(name) {
				this.$refs.uToast.success(`点击了第${name}个`)
			}
		}
	}
</script>

<style lang="scss">
	.userPage {
		background: linear-gradient(to top, #b7e3fd 0%, #edf8fe 100%);
		height: 1400rpx;
	}

	.bgcBox {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 150px;
		// background: #3c9cff;

	}

	.userBox {
		transform: translateY(100rpx);
		height: 100px;
		width: 60%;
		border-radius: 50rpx;
		// background-color: #ffffff;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

	}

	.avatarBox {
		transform: translateY(-100rpx);
	}

	.loginBtnBox {
		width: 50%;
		transform: translateY(-70rpx);
	}

	.funtionOrder {
		margin-top: 20px;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.InFirstOrder {
		background-color: #ffffff;
		border-radius: 10px;
		height: 153px;
		width: 90%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.InSecondOrder {
		height: 350px;
		width: 90%;
		border-radius: 10px;
		background-color: #ffffff;
		margin-top: 10px;
	}

	//每一项
	.OrderList {
		width: 100%;
		// padding: 5px;
		height: 50px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.list-left {
		margin-left: 20px;
		width: 80%;
		height: 50px;
		display: flex;
		align-items: center;
	}

	.list-right {
		width: 10%;
		height: 50px;
		display: flex;
		align-items: center;
	}

	.textcontent {
		margin-left: 10px;
		color: #333;
	}

	/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
	.charts-box {
		z-index: 2 !important;
		width: 100%;
		height: 300px;
	}

	/deep/.uni-section-header {
		margin-top: 10px;
		padding-top: 0px !important;
		padding-left: 25px !important;
		padding-bottom: 0px !important;
	}

	.noLoginBox {
		display: flex;
		justify-content: center;
		width: 60%;
		height: 30px;
		line-height: 30px;
		transform: translateY(-50px) !important;
	}

	.popUpBox {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 230px;
		width: 100%;

	}

	.avatarBtn {
		outline: none;
		display: flex;
		align-items: center;
		justify-content: center;
		// border-radius: 40px;
		height: 40px;
		width: 40px;
		border: 0px !important;
		box-sizing: border-box;
		background-color: #ffffff;

	}


	.nameInput {


		display: inline-block;
		text-align: center;
		vertical-align: center;
		border: 0 !important;
		height: 30px;
		width: 100px;
		border-radius: 15px;
	}

	.noLoginBoxText {
		text-align: center;
	}

	.btnBox {
		display: flex;
		width: 100%;
		justify-content: space-around;
	}

	.userInfoBox {
		height: 190px;
		width: 90%;
		display: flex;
		flex-direction: column;
	}

	.inpBox {
		display: flex;
		justify-content: space-between;
		height: 60px;
		width: 100%;

		.inpLeftBox,
		.inpRightBox {

			width: 120px;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	.inpLeftBox {
		color: #999;
		font-size: 14px;
	}

	.inpRightBox {
		font-size: 14px;
		color: #333;
		font-weight: 600;
	}

	.confirm-text {
		height: 65px;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.textBox {
		margin-top: 15px;
		font-size: 14px;
		color: #3c9cff;
	}
</style>