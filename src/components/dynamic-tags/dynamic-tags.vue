<template>
	<view class="container">
		<view class="tag" v-for="(value, index) of getTags" :key="index">
			<uni-tag :text="value" type="pink" circle="true"></uni-tag>
			<view class="remove" v-if="removable" @tap="remove" :data-tagid="index">x</view>
		</view>
	</view>
</template>

<script>
	import uniTag from '../uni-tag/uni-tag'
	export default {
		name: 'dynamicTags',
		components: {uniTag},
		data(){
			return {
			}
		},
		props:{
			tags: {
				type: Array,
				default(){
					return []
				}
			},
			removable: {
				type: [Boolean, String],
				default: false
			}
		},
		computed:{
			getTags(){
				return this.tags
			}
		},
		methods:{
			remove(e){
				const tagid = e.currentTarget.dataset.tagid
				this.tags.splice(tagid, 1)
				this.$emit('delTag', tagid)
			}
		}
	}
</script>

<style lang="less">
	.tag{
		position: relative;
		display: inline-block;
		margin: 10upx;
	}
	.remove{
		color: #ffffff;
		position: absolute;
		right: 12upx;
		top: 5upx;
	}
</style>
