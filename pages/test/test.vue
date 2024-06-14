<template>
	<view class="u-page__item">
		<u-collapse accordion>
			<u-collapse-item title="众多利器">
				<text slot="value" class="u-page__item__title__slot-title"></text>
				<text class="u-collapse-content">众多的贴心小工具，是您开发过程中召之即来的利器，让您飞镖在手，百步穿杨</text>
			</u-collapse-item>
		</u-collapse>
	</view>
</template>

<style lang="scss">
	/deep/.u-collapse-item__content__text{
		width: 100%;
	}
	/deep/.u-collapse-item{
		width: 40%;
	}
	.u-page {
		padding: 0;

		&__item {

			&__title {
				color: $u-tips-color;
				background-color: $u-bg-color;
				padding: 15px;
				font-size: 15px;

				&__slot-title {
					color: $u-primary;
					font-size: 14px;
				}
			}
		}
	}

	.u-collapse-content {
		color: $u-tips-color;
		font-size: 14px;
	}
</style>