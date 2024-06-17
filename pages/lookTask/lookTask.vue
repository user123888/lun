<template>
	<view>
		<uni-section title="查看帮忙" titleFontSize="30rpx" class="uniSection">
			<template v-slot:decoration>
				<view class="decoration"></view>
			</template>
			<view class="blackBox">

			</view>
			<view class="example">
				<!-- 自定义表单校验 -->
				<uni-forms ref="customForm" :rules="customRules" :modelValue="customFormData">
					<uni-forms-item label="苑区" required>
						<uni-easyinput v-model="customFormData.hall" disabled placeholderStyle="font-size: 16px;" />
					</uni-forms-item>

					<uni-forms-item label="方式" required>
						<uni-data-checkbox disabled v-model="customFormData.way" :localdata="way" />
					</uni-forms-item>
					<uni-forms-item label="号码" required>
						<uni-easyinput v-model="customFormData.number" disabled placeholderStyle="font-size: 16px;" />
					</uni-forms-item>
					<uni-forms-item label="委托类型" required>
						<view class="pickerBox">
							<picker disabled class="picker" :range="array" :value="0" range-key="name"
								selector-type="select" @change="changePcikerVal">
								{{ array[index].name }}
							</picker>
						</view>
					</uni-forms-item>
					<uni-forms-item label="截止时间" required>
						<uni-datetime-picker disabled type="datetime" return-type="timestamp" @maskClick="maskClick"
							v-model="customFormData.datetimesingle" />
					</uni-forms-item>
					<uni-forms-item label='委托酬金' required>
						<uni-easyinput disabled v-model="customFormData.money" placeholderStyle="font-size: 16px;" />
					</uni-forms-item>
				</uni-forms>
				<button type="primary" @click="submit()">{{btnText}}</button>
			</view>
		</uni-section>


	</view>
</template>
<script>
	export default {
		data() {
			return {
				btnText:'完成帮忙',
				id: '',
				index: 0,
				array: [{
						id: '1',
						name: '楼下'
					},
					{
						id: '2',
						name: '饭堂'
					},
					{
						id: '3',
						name: '南门'
					},
					{
						id: '4',
						name: '其他'
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
					way: null,
					datetimesingle: null,

				},
				// 自定义表单校验规则

			}
		},

		onLoad: function(option) {
			this.id = option.id
			uniCloud.callFunction({
				name: 'searchtaskid',
				data: {
					id: option.id
				}
			}).then(res => {
				// console.log(res.result.data)
				
				this.customFormData = res.result.data[0]
				if(this.customFormData.datetimesingle==0){
					this.btnText='已完成 / 不可重复'
					uni.showToast({
						title:'帮忙已完成！',
						duration:2000
					})
					
				}

			})
		},
		onReady() {
			// 设置自定义表单校验规则，必须在节点渲染完毕后执行
			this.$refs.customForm.setRules(this.customRules)
		},
		methods: {
			changePcikerVal(e) {
				this.index = e.detail.value;
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

			onClickItem(e) {
				console.log(e);
				this.current = e.currentIndex
			},
			submit() {
				uniCloud.callFunction({
					name: 'confirmhelp',
					data: {
						id: this.id
					}
				}).then(res => {
					uni.showToast({
						title: `确定成功！`
					})
					uni.navigateTo({
						url:'/pages/myHelp/myHelp'
					})
				})

			}
		},
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

	::-webkit-input-placeholder {
		/*Webkit browsers*/
		color: #999;
		font-size: 16px;
	}

	:-moz-placeholder {
		/*Mozilla Firefox 4 to 8*/
		color: #999;
		font-size: 16px;
	}

	::moz-placeholder {
		/*Mozilla Firefox 19+*/
		color: #999;
		font-size: 16px;
	}

	:-ms-input-placeholder {
		/*Internet Explorer 10+*/
		color: #999;
		font-size: 16px;
	}

	/deep/.checklist-group {
		font-size: 16px;
	}

	/deep/.checklist-text {
		font-size: 16px !important;
	}

	/deep/.uni-date__x-input {
		font-size: 16px;
	}

	/deep/.pickerBox {
		font-size: 16px;
		color: #18bc37;
	}

	/deep/.uni-input-input:disabled {
		-webkit-text-fill-color: #666;
	}

	/deep/.uni-textarea-textarea:disabled {
		-webkit-text-fill-color: #666;
	}

	/deep/.uni-date-editor--x__disabled[data-v-6e13d7e2] {
		opacity: 1;
	}

	/deep/ .is-disabled {
		color: #666 !important;
	}

	/deep/.uni-date-editor--x,
	.uni-date-editor--x__disabled,
	.uni-date-x--border {
		opacity: 1;
	}
</style>