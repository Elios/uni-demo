<template>
	<view class="container">
		<view class="list-item" v-for="(item, index) of listItem" :key="index">
			<view class="title">{{item.title}}</view>
			<view class="content">{{item.content}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'horizontalList',
		props: {
			listItem: {
				type: Array,
				default(){
					return []
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.container{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		.list-item{
			display: flex;
			flex-direction: column;
			align-items: center;
		}
	}
</style>
