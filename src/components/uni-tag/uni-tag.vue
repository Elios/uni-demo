<template>
	<view class="uni-tag" v-if="text" :class="[disabled === true || disabled === 'true' ? 'uni-tag--disabled' : '',inverted === true || inverted === 'true' ? 'uni-tag--inverted' : '',circle === true || circle === 'true' ? 'uni-tag--circle' : '','uni-tag--'+size,'uni-tag--'+type]"
	 @click="onClick()">{{text}}</view>
</template>

<script>
	export default {
		name: 'uni-tag',
		props: {
			type: { //标签类型default、primary、success、warning、danger、royal、pink
				type: String,
				default: 'default'
			},
			size: { //标签大小 normal, small
				type: String,
				default: 'normal'
			},
			text: String, //标签内容
			disabled: { //是否为禁用状态
				type: [String, Boolean],
				defalut: false
			},
			inverted: { //是否为空心
				type: [String, Boolean],
				defalut: false
			},
			circle: { //是否为圆角
				type: [String, Boolean],
				defalut: false
			}
		},
		methods: {
			onClick() {
				if (this.disabled === true || this.disabled === 'true') {
					return;
				}
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
	$tag-pd:0px 32upx;
	$tag-small-pd:0px 16upx;

	@mixin tag-disabled {
		opacity: 0.5;
	}

	.uni-tag {
		box-sizing: border-box;
		padding: $tag-pd;
		height: 60upx;
		line-height: calc(60upx - 2px);
		font-size: $uni-font-size-base;
		display: inline-block;
		color: $uni-text-color;
		border-radius: $uni-border-radius-base;
		background-color: $uni-bg-color-grey;
		border: 1px solid $uni-bg-color-grey;

		&--circle {
			border-radius: 30upx;
		}

		&--disabled {
			@include tag-disabled;
		}

		&--small {
			height: 40upx;
			padding: $tag-small-pd;
			line-height: calc(40upx - 2px);
			font-size: $uni-font-size-sm;
		}

		&--primary {
			color: $uni-text-color-inverse;
			background-color: $uni-color-primary;
			border: 1px solid $uni-color-primary;

			&.uni-tag--inverted {
				color: $uni-color-primary;
				background-color: $uni-bg-color;
				border: 1px solid $uni-color-primary;
			}

		}

		&--success {
			color: $uni-text-color-inverse;
			background-color: $uni-color-success;
			border: 1px solid $uni-color-success;

			&.uni-tag--inverted {
				color: $uni-color-success;
				background-color: $uni-bg-color;
				border: 1px solid $uni-color-success;
			}

		}

		&--warning {
			color: $uni-text-color-inverse;
			background-color: $uni-color-warning;
			border: 1px solid $uni-color-warning;

			&.uni-tag--inverted {
				color: $uni-color-warning;
				background-color: $uni-bg-color;
				border: 1px solid $uni-color-warning;
			}

		}

		&--error {
			color: $uni-text-color-inverse;
			background-color: $uni-color-error;
			border: 1px solid $uni-color-error;

			&.uni-tag--inverted {
				color: $uni-color-error;
				background-color: $uni-bg-color;
				border: 1px solid $uni-color-error;
			}

		}
		
		&--pink {
			color: $uni-text-color-inverse;
			background-color: $uni-color-pink;
			border: 1px solid $uni-color-pink;
		
			&.uni-tag--inverted {
				color: $uni-color-pink;
				background-color: $uni-bg-color;
				border: 1px solid $uni-color-pink;
			}
		
		}


		&--inverted {
			color: $uni-text-color;
			background-color: $uni-bg-color;
			border: 1px solid $uni-bg-color-grey;
		}
	}
</style>