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
					<uni-forms-item label="昵称" required name="name">
						<uni-easyinput v-model="customFormData.name" disabled  placeholderStyle="font-size: 16px;" />
					</uni-forms-item>

					<uni-forms-item label="方式" required name="way">
						<uni-data-checkbox disabled v-model="customFormData.way" :localdata="way" />
					</uni-forms-item>
					<uni-forms-item label="号码" required name="number">
						<uni-easyinput v-model="customFormData.number" disabled placeholderStyle="font-size: 16px;" />
					</uni-forms-item>
					<uni-forms-item label="委托类型" required>
						<view class="pickerBox">
							<picker disabled  class="picker" :range="array" :value="0" range-key="name" selector-type="select"
								@change="changePcikerVal">
								{{ array[index].name }}
							</picker>
						</view>
					</uni-forms-item>
					<uni-forms-item label="截止时间" required>
						<uni-datetime-picker disabled type="datetime" return-type="timestamp" 
							v-model="customFormData.datetimesingle" />
					</uni-forms-item>
					<uni-forms-item label='*委托备注'>
						<uni-easyinput disabled type="textarea" v-model="customFormData.note"  placeholderStyle="font-size: 16px;"/>
					</uni-forms-item>
				</uni-forms>
				<button type="primary" @click="submit">确定帮忙</button>
			</view>
		</uni-section>


	</view>
</template>
<script>
	export default {
		data() {
			return {
				index: 0,
				array: [{
						id: '1',
						name: '岭师快递'
					},
					{
						id: '2',
						name: '岭师饭堂'
					},
					{
						id: '3',
						name: '校外小吃'
					},
					{
						id: '4',
						name: '其他委托'
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
				},{
					text: '电话',
					value: 2
				}],

				// 自定义表单数据
				customFormData: {
					name: '南端',
					number: '1647239181',
					maskClike: 0,
					way: 2,
					datetimesingle: 1698529992399,
					note:'哈哈哈哈哈哈哈'
				}
			}
		},

		onLoad() {},
		onReady() {
			
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
			maskClick(e) {
				console.log('123123');
			},

			onClickItem(e) {
				console.log(e);
				this.current = e.currentIndex
			},
			submit() {
				//发请求
					uni.showToast({
						title: `确定成功！`
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
/deep/.uni-easyinput__content-input{
	font-size: 16px;
	::-ms-input-placeholder {
		font-size: 16px;
	}
}
::-webkit-input-placeholder{/*Webkit browsers*/
	color:#999;
	font-size:16px;
}
:-moz-placeholder{/*Mozilla Firefox 4 to 8*/
	color:#999;
	font-size:16px;
}
::moz-placeholder{/*Mozilla Firefox 19+*/
	color:#999;
	font-size:16px;
}
:-ms-input-placeholder{/*Internet Explorer 10+*/
    color:#999;
    font-size:16px;
}
/deep/.checklist-group{
	font-size: 16px;
}
/deep/.checklist-text{
	font-size: 16px!important;
}
/deep/.uni-date__x-input{
	font-size:16px;
}
/deep/.pickerBox{
	font-size: 16px;
	color: #18bc37;
}
/deep/ .is-disabled {
	color: #666 !important;
}
/deep/.uni-date-editor--x,.uni-date-editor--x__disabled, .uni-date-x--border{
	opacity: 1;
}
</style>