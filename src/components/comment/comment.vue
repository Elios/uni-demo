<template>
	<view class="content" :data-commentid="comment.commentid" :data-uid="comment.uid">
		<view>
			<view class="wrap-avatar">
				<image :src="comment.avatar" mode="" size="mini" class="avatar"></image>
				<view class="a-name">{{comment.uname}}</view>
			</view>
		</view>
		<view class="comment">
			{{comment.content}}
		</view>
		<view class="bottom">
			<view class="c-date">
				{{comment.c_date}}
			</view>
			<view class="op-comment">
				<view class="">
					<fa-icon :type="thumbsUpIcon[thumbsUpIconIndex]" size="18" color="#c0c0c0" @tap="thumbsUp"></fa-icon>
				</view>
				<view class="">
					<fa-icon :type="thumbsDownIcon[thumbsDownIconIndex]" size="18" color="#c0c0c0" @tap="thumbsDown"></fa-icon>
				</view>
				<view class="">
					<fa-icon type="commenting-o" size="18" color="#c0c0c0" @tap="comm"></fa-icon>
				</view>
			</view>
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
		}
	}
</script>

<style scoped lang="less">
	@import '../../less/comment';
</style>
