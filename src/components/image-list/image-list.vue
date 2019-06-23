<template>
	<view class="container">
		<view class="add" @tap="add">
			+
		</view>
		<view class="img" v-for="(val, index) of getList" :key="index">
			<image :src="val" mode="" @tap="show" :data-imgid="index"></image>
			<view class="del" @tap="del" :data-imgid="index">
				x
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'imageList',
		props:{
			imgList:{
				type: Array,
				default(){
					return []
				}
			}
		},
		computed:{
			getList(){
				return this.imgList
			}
		},
		methods:{
			add(){
				this.$emit('add')
			},
			show(e){
				const imgid = e.currentTarget.dataset.imgid
				const src = this.imgList[imgid]
				uni.previewImage({
					urls: [src]
				})
			},
			del(e){
				const imgid = e.currentTarget.dataset.imgid
				this.$emit('del', imgid)
			}
		}
	}
</script>

<style lang="less" scoped>
	.container{
		display: flex;
		flex-wrap: wrap;
	}
	.add,.img{
		width: 200upx;
		height: 200upx;
		border-radius: 40upx;
	}
	.add{
		text-align: center;
		font-size: 100upx;
		border: 1upx solid #ffd9e6;
		color: #ffd9e6;
	}
	.img{
		position: relative;
		image{
			width: 100%;
			height: 100%;
			border-radius: 40upx;
		}
	}
	.del{
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		width: 50upx;
		height: 50upx;
		top: -15upx;
		right: -15upx;
		background-color: #ccc;
		border-radius: 50%;
		font-size: 40upx;
	}
</style>
