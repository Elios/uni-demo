<template>
	<view class="uni-swiper__warp">
		<slot></slot>
		<view v-if="mode === 'default'" class="uni-swiper__dots-box" :style="{'bottom':dots.bottom + 'px'}">
			<view class="uni-swiper__dots-item" v-for="(item,index) in info" :style="{
				 'width': dots.width + 'px','height':dots.height +'px' ,'background-color':index !== current?dots.backgroundColor:dots.selectedBackgroundColor,'border':index !==current ? dots.border:dots.selectedBorder}"
			 :key="index"></view>
		</view>
		<view v-if="mode === 'long'" class="uni-swiper__dots-box" :style="{'bottom':dots.bottom + 'px'}">
			<view class="uni-swiper__dots-item " v-for="(item,index) in info" :class="[index === current&&'uni-swiper__dots-long']"
			 :style="{
				 'width':(index === current? dots.width*3:dots.width ) + 'px','height':dots.height +'px' ,'background-color':index !== current?dots.backgroundColor:dots.selectedBackgroundColor,'border':index !==current ? dots.border:dots.selectedBorder}"
			 :key="index"></view>
		</view>
		<view v-if="mode === 'nav'" class="uni-swiper__dots-box uni-swiper__dots-nav" :style="{'background-color':dotsStyles.backgroundColor}">
			<view class="uni-swiper__dots-nav-item" :style="{'color':dotsStyles.color}">{{(current+1)+"/"+info.length}}
				{{info[current][field]}}</view>
		</view>
		<view v-if="mode === 'indexes'" class="uni-swiper__dots-box" :style="{'bottom':dots.bottom + 'px'}">
			<view class="uni-swiper__dots-item uni-swiper__dots-indexes" v-for="(item,index) in info" :style="{
				 'width':dots.width + 'px','height':dots.height +'px' ,'color':index === current?dots.selectedColor:dots.color,'background-color':index !== current?dots.backgroundColor:dots.selectedBackgroundColor,'border':index !==current ? dots.border:dots.selectedBorder}"
			 :key="index">{{index+1}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'uni-swiper-dot',
		props: {
			info: {
				type: Array,
				default () {
					return []
				}
			},
			current: {
				info: Number,
				default: 0
			},
			dotsStyles: {
				type: Object,
				default () {
					return {}
				}
			},
			// 类型 ：default(默认) indexes long nav
			mode: {
				type: String,
				default: 'default'
			},
			// 只在 nav 模式下生效，变量名称
			field: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				dots: {
					width: 8,
					height: 8,
					bottom: 10,
					color: '#fff',
					backgroundColor: 'rgba(0, 0, 0, .3)',
					border: '1px rgba(0, 0, 0, .3) solid',
					selectedBackgroundColor: '#333',
					selectedBorder: '1px rgba(0, 0, 0, .9) solid'
				}
			};
		},
		created() {
			if (this.mode === 'indexes') {
				this.dots.width = 20
				this.dots.height = 20
			}
			this.dots = Object.assign(this.dots, this.dotsStyles)
		},
		watch: {
			dotsStyles(newVal) {
				this.dots = Object.assign(this.dots, this.dotsStyles)
			},
			mode(newVal) {
				if (newVal === 'indexes') {
					this.dots.width = 20
					this.dots.height = 20
				} else {
					this.dots.width = 8
					this.dots.height = 8
				}
			}

		}
	}
</script>

<style>
	.uni-swiper__warp {
		position: relative;
		width: 100%;
		box-sizing: border-box;
		overflow: hidden;
	}

	.uni-swiper__dots-box {
		position: absolute;
		bottom: 20upx;
		display: flex;
		justify-content: center;
		align-items: center;
		box-sizing: box-sizing;
		width: 100%;
	}

	.uni-swiper__dots-item {
		flex-shrink: 0;
		width: 16upx;
		border-radius: 50%;
		margin-left: 25upx;/*间距*/
		background: rgba(0, 0, 0, .3);
		transition: all 0.2s linear;
	}

	.uni-swiper__dots-item:first-child {
		margin: 0;
	}

	.uni-swiper__dots-default {
		border-radius: 50%;
	}

	.uni-swiper__dots-long {
		border-radius: 100upx;
	}

	.uni-swiper__dots-nav {
		bottom: 0;
		height: 80upx;
		justify-content: flex-start;
		background: rgba(0, 0, 0, 0.2);
		box-sizing: box-sizing;
		overflow: hidden;
	}

	.uni-swiper__dots-nav-item {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 28upx;
		color: #fff;
		box-sizing: box-sizing;
		margin: 0 30upx;
	}

	.uni-swiper__dots-indexes {
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
		font-size: 24upx;
	}
</style>
