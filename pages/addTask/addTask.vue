<template>
	<view>
		<uni-section title="发布委托" titleFontSize="30rpx" class="uniSection">
			<template v-slot:decoration>
				<view class="decoration"></view>
			</template>
			<uni-notice-bar show-icon scrollable text="本平台只提供双方联系方式,谨防上当受骗!" />
			<view class="example">
				<!-- 自定义表单校验 -->
				<uni-forms ref="customForm" :rules="customRules" :modelValue="customFormData">
					<uni-forms-item label="苑区" required name="hall">
						<uni-easyinput v-model="customFormData.hall" placeholder="例如 : 昌明苑"
							placeholderStyle="font-size: 16px!important;" />
					</uni-forms-item>

					<uni-forms-item label="方式" required name="way">
						<uni-data-checkbox v-model="customFormData.way" :localdata="way" />
					</uni-forms-item>
					<uni-forms-item label="号码" required name="number">
						<uni-easyinput v-model="customFormData.number" placeholder="对应联系方式的号码"
							placeholderStyle="font-size: 16px;" />
					</uni-forms-item>
					<uni-forms-item label="委托类型" required>
						<view class="pickerBox">
							<picker class="picker" :range="array" :value="0" range-key="name" selector-type="select"
								@change="changePcikerVal">
								{{ array[index].name }}
							</picker>
						</view>
					</uni-forms-item>
					<uni-forms-item label="截止时间" required>
						<uni-datetime-picker type="datetime" return-type="timestamp" @maskClick="maskClick"
							v-model="customFormData.datetimesingle" />
					</uni-forms-item>
					<uni-forms-item label='委托酬金' required name="money">
						<uni-easyinput v-model="customFormData.money" type="text" placeholder-style="font-size: 16px;color:#999"
							placeholder="请输入委托酬金" />
					</uni-forms-item>
				</uni-forms>
				<button type="primary" @click="submit('customForm')">发布</button>
			</view>
		</uni-section>


	</view>
</template>
<script>
	export default {
		data() {
			return {

				openid: '',
				index: 0,
				array: [{
						id: 1,
						name: '校内代拿'
					},
					{
						id: 2,
						name: '岭师饭堂'
					},
					{
						id: 3,
						name: '东门代买'
					},
					{
						id: 4,
						name: '南门代买'
					},
					{
						id: 5,
						name: '北门代买'
					},
					{
						id: 5,
						name: '岭师快递'
					}
				],
				classes: '',

				//
				show: true,
				selector: [1, 2, 3],
				// 单选数据源
				way: [{
					text: 'QQ',
					value: 0
				}, {
					text: '微信',
					value: 1
				}, {
					text: '电话',
					value: 2
				}],

				// 自定义表单数据
				customFormData: {
					hall: '',
					number: '',
					maskClike: 0,
					way: 1,
					title: "岭师快递",
					datetimesingle: Date.now(),
					money: null
				},
				// 自定义表单校验规则
				customRules: {

					way: {
						rules: [{
							required: true,
							errorMessage: '联系方式不能为空'
						}]
					},
					hall: {
						rules: [{
							required: true,
							errorMessage: '苑区不能为空'
						}]
					},
					money: {
						rules: [{
								required: true,
								errorMessage: '委托酬金不能为空'
							},

							{
								format: 'number',
								errorMessage: "金额只能输入为数字",
							}
						]
					},
					number: {
						rules: [{
							required: true,
							errorMessage: '号码不能为空'
						}]
					}
				}
			}
		},

		onLoad() {
			this.openid = uni.getStorageSync('openid')
			// console.log(this.openid)
		},
		onReady() {
			// 设置自定义表单校验规则，必须在节点渲染完毕后执行
			this.$refs.customForm.setRules(this.customRules)
		},
		methods: {
			changePcikerVal(e) {
				this.index = e.detail.value;
				this.customFormData.title = this.array[this.index].name
				// console.log(this.array[this.index].name) 
			},
			onnodeclick(e) {
				console.log(e);
			},
			onpopupopened(e) {
				console.log('popupopened');
			},
			onpopupclosed(e) {
				console.log('popupclosed');
			},
			onchange(e) {
				console.log('onchange:', e);
			},
			maskClick(e) {
				console.log('123123');
			},

			onClickItem(e) {
				console.log(e);
				this.current = e.currentIndex
			},
			submit(ref) {
				this.$refs[ref].validate().then(res => {
				
					if(this.openid){
					uniCloud.callFunction({
						name: 'addtask',
						data: {
							way: this.customFormData.way,
							number: this.customFormData.number,
							datetimesingle: this.customFormData.datetimesingle,
							hall: this.customFormData.hall,
							money: Number(this.customFormData.money),
							title: this.customFormData.title,
							userid: this.openid
						}
					}).then(res => {
						console.log(res)


						let a = uni.getStorageSync('openid')
						console.log(a)
					})
					uni.showToast({
						title: `发布成功！`
					})
					// 清空表单
					this.customFormData = {}
				}
				else {
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
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	$uni-success: #18bc37 !default;

	.example {
		background-color: #fff;
		padding: 10px;
	}

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

	.data-pickerview {
		height: 400px;
		border: 1px #e5e5e5 solid;
	}

	.popper__arrow {
		top: -6px;
		left: 50%;
		margin-right: 3px;
		border-top-width: 0;
		border-bottom-color: #EBEEF5;
	}

	.popper__arrow {
		top: -6px;
		left: 50%;
		margin-right: 3px;
		border-top-width: 0;
		border-bottom-color: #EBEEF5;
	}

	.pickerBox {
		border: 1px solid #e5e5e5;
		border-radius: 5px;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: left;
	}

	.picker {
		padding-left: 10px;
		width: 100%;
	}

	.blackBox {
		height: 10px;
	}

	/deep/.uni-forms-item__label {
		width: 100px !important;
		font-size: 16px;
	}

	/deep/.uni-easyinput__content-input {
		font-size: 16px;

		::-ms-input-placeholder {
			font-size: 16px;
		}
	}

	/deep/.checklist-group {
		font-size: 16px;
	}

	/deep/.checklist-text {
		font-size: 16px !important;
	}

	/deep/.uni-date__x-input {
		font-size: 16px !important;
	}

	/deep/.pickerBox {
		font-size: 16px;
		color: #18bc37;
	}
</style>