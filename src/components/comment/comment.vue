<template>
	<view class="content"  :data-commentid="comment.commentid" :data-uid="comment.uid">
		<view class="author">
			<view class="avatar">
				<image :src="comment.avatar" mode="" size="mini"></image>
			</view>
			<view class="a-name">
				{{comment.uname}}
			</view>
		</view>
		<view class="comment">
			{{comment.content}}
		</view>
		<view class="op-comment">
			<fa-icon :type="thumbsUpIcon[thumbsUpIconIndex]" size="50upx" color="#c0c0c0" @tap="thumbsUp"></fa-icon>
			<fa-icon :type="thumbsDownIcon[thumbsDownIconIndex]" size="50upx" color="#c0c0c0" @tap="thumbsDown"></fa-icon>
			<fa-icon :type="commenting-o" size="50upx" color="#c0c0c0" @tap="comm"></fa-icon>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'comment',
		data() {
			return {
				thumbsUpIcon: ['thumbs-o-up', 'thumbs-up'], //点赞图片
				thumbsDownIcon: ['thumbs-o-down', 'thumbs-down'], //踩
				thumbsDownIconIndex: 0, //点赞图片索引
				thumbsUpIconIndex: 0 //踩
			}
		},
		props: {
			comment: {
				required: true
			}
		},
		methods: {
			thumbsUp(){ //点赞
				this.thumbsUpIconIndex = this.thumbsUpIconIndex === 0 ? 1 : 0
			},
			thumbsDown(){ //踩
				this.thumbsDownIconIndex = this.thumbsDownIconIndex === 0 ? 1 : 0
			},
			comm(){
				
			}
		},
	}
</script>

<style scoped lang="less">
	@import '../../less/comment';
</style>
