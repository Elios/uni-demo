<template>
	<view class="container">
		<view class="content">
			<view class="title">{{title}}</view>
			<view class="au-date">
				<fa-icon type="address-card" size="10upx" color="#c0c0c0">{{uname}}</fa-icon>
				<fa-icon type="calendar" size="10upx" color="#c0c0c0">{{cDate}}</fa-icon>
			</view>
			<view class="des">{{des}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'video-info',
		data() {
			return {
				
			}
		},
		props:{
			title: {
				required: true
			},
			des: {
				required: true
			},
			uname: {
				required: true
			},
			cDate: {
				required: true
			}
		}
	}
</script>

<style scoped lang="less">
	.content{
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		font-size: 20upx;
	}
	.title,.au-date,.des{
		width: 100%;
		margin-bottom: 10upx;
	}
	.title{
		margin-top: 10upx;
		font-size: 35upx;
		color: #2a3a4a;
	}
	.au-date{
		display: flex;
		color: #7b7b7b;
	}
	.au-date fa-icon{
		flex: auto;
	}
	.des{
		color: #4e4e4e;
	}
</style>
