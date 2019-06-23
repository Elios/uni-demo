<template>
	<scroll-view scroll-y class="scroll">
		<view class="container" @tap="onSelect" v-if="listItem.length > 0">
			<view class="live-list" v-for="(item, index) of listItem" :key="index">
				<view class="list-left">
					<view class="left-avatar">
						<image :src="item.avatar" mode="" class="avatar"></image>
					</view>
					<view class="left-uname">
						{{item.uname}}
					</view>
				</view>
				<view class="list-right">
					<view class="right-content">
						{{item.content}}
					</view>
					<view class="right-date">
						{{item.date}}
					</view>
				</view>
			</view>
		</view>
		<view v-else class="no-data">
			{{noDataText}}
		</view>
	</scroll-view>
</template>

<script>
	export default {
		name: 'userLiveList',
		props: {
			listItem: {
				type: Array,
				default(){
					return []
				}
			},
			noDataText: {
				type: String,
				default: '没有数据'
			}
		},
		methods: {
			onSelect(e){
				
			}
		}
	}
</script>

<style lang="less" scoped>
	.scroll{
		width: 100%;
		height: 100%;
	}
	.container{
		color: #5b5b5b;
		margin: 10upx;
		display: flex;
		flex-direction: column;
		width: 100%;
		.live-list{
			display: flex;
			flex-direction: row;
			width: 100%;
			border-bottom: 1upx solid rgba(0, 0, 0, .1);
			.list-left{
				display: flex;
				flex-direction: column;
				align-items: center;
				.left-avatar{
					.avatar{
						width: 80upx;
						height: 80upx;
						border-radius: 80upx;
						border: 1upx solid #e7e7e7;
					}
				}
				.left-uname{
					
				}
			}
			.list-right{
				display: flex;
				flex-direction: column;
				align-content: space-between;
				margin-left: 10upx;
				.right-content{
					word-break: break-all;
				}
				.right-date{
					margin-top: 5upx;
				}
			}
		}
	}
	.no-data{
		text-align: center;
		padding-top: 40upx;
	}
</style>
