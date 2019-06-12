<template>
	<view class="content">
		<view class="player">
			<video id="myVideo" :data-vid="vInfo.vid" :src="vInfo.src" controls :danmu-list="danmuList" :poster="vInfo.poster" enable-danmu danmu-btn @play="play"></video>
		</view>
		<view class="danmu-input">
			<view class="input">
				<input type="text" v-model="danmu" placeholder="请输入弹幕内容"/>
			</view>
			<view class="btn">
				<button type="primary" @click="send" size="mini">发送</button>
			</view>
		</view>
		<view class="vlist-and-comments">
			<wuc-tab :tab-list="tabList" :tabCur.sync="tabCur" @change="tabChange" textFlex></wuc-tab>
			<swiper :duration="300" :current="tabCur" @change="swiperChange" class="swiper">
				<swiper-item style="height: 1050px;">
					<view class="swiper-item">
						<view class="uname" style="height: 40px;">
							<view class="wrap-avatar">
								<image :src="vInfo.avatar" mode="" class="avatar"></image>
								<view class="a-name">{{vInfo.uname}}</view>
							</view>
							<view class="subscribe">
								<button type="primary" size="mini" @tap="subHandler" :data-uid="vInfo.uid">
									<template v-if="isSub">
										已关注
									</template>
									<template v-else>
										关注
									</template>
								</button>
							</view>
						</view>
						<view class="vinfo" style="height: 10%;">
							<video-info :uname="vInfo.uname" :c-date="vInfo.c_date" :des="vInfo.des" :title="vInfo.title"></video-info>
						</view>
						<view class="tags" style="height: 10%;">
							<view class="tag" v-for="(item, index) of tags" :key="index">
								<uni-tag :text="item" type="pink" :circle="true" :inverted="true"></uni-tag>
							</view>
						</view>
						<view class="video-op" style="height: 50px;">
							<view class="thumbs-up">
								<fa-icon :type="thumbsUpIcon[thumbsUpIconIndex]" size="31" color="#b85798" @tap="thumbsUp"></fa-icon>
								<view class="">赞</view>
							</view>
							<view class="thumbs-down">
								<fa-icon :type="thumbsDownIcon[thumbsDownIconIndex]" size="31" color="#b85798" @tap="thumbsDown"></fa-icon>
								<view class="">踩</view>
							</view>
							<view class="share">
								<fa-icon type="share" size="31" color="#b85798" @tap="share"></fa-icon>
								<view class="">分享</view>
							</view>
							<view class="heart">
								<fa-icon :type="heart[heartIndex]" size="31" color="#b85798" @tap="save"></fa-icon>
								<view class="">收藏</view>
							</view>
						</view>
						<view class="video-list" @tap="tapVImage">
							<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in vList" :key="index">
								<view class="uni-media-list" :data-vid="item.vid">
									<image class="uni-media-list-logo" :src="item.poster"></image>
									<view class="uni-media-list-body">
										<view class="uni-media-list-text-top">{{item.title}}</view>
										<view class="uni-media-list-text-bottom uni-ellipsis">{{item.uname}}</view>
									</view>
								</view>
							</view>
							<uni-load-more :status="status" :content-text="contentText"></uni-load-more>
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<view class="" v-for="(item, index) of comments" :key="index">
							<comment :comment="item"></comment>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<image-menu ref="share" :strShareUrl="strShareUrl" :strShareImageUrl="strShareImageUrl" :strShareSummary="strShareSummary" :strShareTitle="strShareTitle"></image-menu>
	</view>
</template>

<script>
	import WucTab from '../../components/wuc-tab/wuc-tab'
	import VideoInfo from '../../components/video-info/video-info'
	import ImageMenu from '../../components/image-menu/image-menu'
	import uniTag from '../../components/uni-tag/uni-tag'
	import comment from '../../components/comment/comment'
	import uniLoadMore from '../../components/uni-load-more/uni-load-more'
	import myAxios from '../../common/myAxios.js'
	let _this
	let inputView = new plus.nativeObj.View('inputView', {
		bottom: '0px',
		left: '0px',
		width: '100%',
		height: '40px',
		backgroundColor: 'rgb(255,255,255)'
	})
	inputView.drawInput({
		bottom: '0px',
		left: '0px',
		width: '80%',
		height: '100%'
	},{
		fontSize: '15px',
		placeholder: '河蟹评论',
		borderColor: '#ff69b4'
	}, 'input-comment')
	inputView.drawRect({
		color: '#ff69b4'
	}, {
		bottom: '0px',
		left: '80%',
		width: '20%',
		height: '100%'
	})
	inputView.drawText('评论', {
		bottom: '10px',
		left: '85%',
		width: '10%',
		height: '20px'
	}, {
		size: '20px',
		color: '#ffffff'
	})
	export default {
		components:{WucTab, VideoInfo, ImageMenu, uniTag, comment, uniLoadMore},
		data() {
			return {
				src: '', //视频资源地址
				danmuList: [], //弹幕列表
				danmu: '', //输入的弹幕内容
				tabList: [
					{name: '视频信息'},
					{name: '评论'}
				],
				tabCur: 0,
				vInfo: {}, //视频信息
				vList: [], //视频列表
				thumbsUpIcon: ['thumbs-o-up', 'thumbs-up'], //点赞图片
				thumbsDownIcon: ['thumbs-o-down', 'thumbs-down'], //踩
				heart: ['heart-o', 'heart'], //收藏
				thumbsDownIconIndex: 0, //点赞图片索引
				thumbsUpIconIndex: 0, //踩
				heartIndex: 0, //收藏
				strShareUrl: '', //分享地址
				strShareTitle: '', //分享标题
				strShareSummary: '', //分享简介
				strShareImageUrl: '', //分享图片地址
				tags: [], //视频标签
				isSub: false,
				comments: [],
				pageSize: 10,
				reload: false,
				status: 'more',
				contentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '少女折寿中....',
					contentnomore: '再怎么加载也没有了'
				}
			}
		},
		methods: {
			send(){ //发送弹幕
				this.videoContext.sendDanmu({
					text: _this.danmu,
					color: '#ffffff'
				})
				this.danmu = ''
			},
			tabChange(index){
				this.tabCur = index
			},
			swiperChange(e){
				this.tabCur = e.target.current
				if(this.tabCur === 1){
					inputView.show()
				}else{
					inputView.hide()
				}
				if(this.tabCur === 1 && this.comments.length < 1){
					console.log("swiperChange")
					this.getComments()
				}
			},
			getComments(){
				uni.createSelectorQuery().select('#myVideo').fields({
					dataset:true
				}, (res) => {
					const vid = res.dataset.vid
					myAxios({
						url: _this.apiServer + 'comment/' + vid,
						method: 'GET',
						data: {}
					}).then((res) => {
						_this.comments = res.data.comments
					}).catch((e) => {
						plus.nativeUI.toast('获取评论失败')
					})
				}).exec()
			},
			thumbsUp(){ //点赞
				this.thumbsUpIconIndex = this.thumbsUpIconIndex === 0 ? 1 : 0
			},
			thumbsDown(){ //踩
				this.thumbsDownIconIndex = this.thumbsDownIconIndex === 0 ? 1 : 0
			},
			share(){ //分享视频
				this.$refs['share'].show()
			},
			save(){ //收藏视频
				this.heartIndex = this.heartIndex === 0 ? 1 : 0
			},
			tapVImage(e){
				const vid = e.currentTarget.dataset.vid
				uni.navigateTo({
					url: './video?vid='+vid,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			subHandler(e){
				const uid = e.currentTarget.dataset.uid
				if(this.isSub){
					this.unsubscrible(uid)
				}else{
					this.subscribe(uid)
				}
			},
			subscribe(uid){
				this.isSub = true
			},
			unsubscrible(uid){
				this.isSub = false
			},
			play(){
				uni.createSelectorQuery().select('#myVideo').fields({
					dataset:true
				}, (res) => {
					const vid = res.dataset.vid
					myAxios({
						url: _this.apiServer + 'danmu/' + vid,
						method: 'GET'
					}).then((res) => {
						console.log(res.data.danmuList)
						if(res.statusCode === 200){
							_this.danmuList = res.data.danmuList
						}
					}).catch((e) => {
						console.log(e)
					})
				}).exec()
			},
			getList(){
				if(!this.reload){
					this.status = 'loading'
				}
				const p = myAxios({
					url: _this.apiServer + 'video/list/' + _this.pageSize,
					method: 'GET',
					data: {}
				}).then((res) => {
					if(res.statusCode === 200){
						const list = res.data.list
						_this.vList = _this.reload ? list : _this.vList.concat(list)
					}
					_this.reload = false
				}).catch((e) => {
					throw e
				})
				return p
			},
			getVideo(vid){
				const p = myAxios({
					url: _this.apiServer + 'video/' + vid,
					method: 'GET',
					data: {}
				}).then((res) => {
					if(res.statusCode === 200){
						_this.vInfo = res.data.vInfo
					}
				}).catch((e) => {
					throw e
				})
				return p
			},
			getTags(vid){
				myAxios({
					url: _this.apiServer + 'video/tags/' + vid,
					method: 'GET',
					data: {}
				}).then((res) => {
					if(res.statusCode === 200){
						_this.tags = res.data.tags
					}
				}).catch((e) => {
					throw e
				})
			}
		},
		onLoad(res) {
			_this = this
			const vid = res.vid
			Promise.all([_this.getList(), _this.getVideo(vid), _this.getTags(vid)])
				.then((res) => {
					plus.nativeUI.toast('获取信息成功')
				})
				.catch((e) => {
					console.log(e)
					plus.nativeUI.toast(e)
				})
		},
		onReady() {
			this.videoContext = uni.createVideoContext('myVideo')
		},
		onBackPress(options) {
			//防死循环
			if(options.from === 'navigateBack'){
				return false
			}
			inputView.hide()
			//返回上一级
			uni.navigateBack({
				delta: 1
			})
			return true
		},
		onReachBottom(){
			this.status = 'loading'
			this.getList()
		}
	}
</script>

<style scoped lang="less">
	@import '../../less/video';
</style>
