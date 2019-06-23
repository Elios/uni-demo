<template>
	<view class="content">
		<view class="img">
			<image :src="imageUrl" lazy-load></image>
		</view>
		<view class="des">
			<view class="title">
				<fa-icon type="info-circle" size="10" color="#c0c0c0">{{title}}</fa-icon>
			</view>	
			<view class="info">
				<fa-icon type="address-card" size="10" color="#c0c0c0">{{uname}}</fa-icon>
				<fa-icon type="calendar" size="10" color="#c0c0c0">{{c_time}}</fa-icon>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'Preview',
		data() {
			return {
				
			};
		},
		props: {
			imageUrl: {
				required: true
			},
			title: {
				required: true
			},
			uname: {
				required: true
			},
			c_time: {
				required: true
			}
		}
	}
</script>

<style scoped>
	.content{
		border: 0.5upx solid #999999;
		border-radius: 15upx;
		box-shadow: 1.5upx 1.5upx 15upx #666666;
	}
	.title,.info{
		font-size: 10upx;
		color: #F76260;
	}
	image{
		will-change: transform;
		border-radius: 15upx;
		border-bottom: 0.2upx solid #999999;
	}
	.info{
		display: flex;
	}
	.info fa-icon{
		flex: auto;
	}
	.des{
		padding-left: 20upx;
	}
</style>
