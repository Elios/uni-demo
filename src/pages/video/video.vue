<template>
	<view class="content">
		<view class="player">
			<video id="myVideo" :data-vid="vInfo.vid" :src="vInfo.src" controls :danmu-list="danmuList" :poster="vInfo.poster" enable-danmu danmu-btn></video>
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
			<swiper :duration="300" :current="tabCur" @change="swiperChange" class="swiper" :style="{height: swiperHeight+'px'}">
				<swiper-item>
					<view class="swiper-item">
						<view class="uname calcVHeight">
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
						<view class="vinfo">
							<video-info class="calcVHeight" :uname="vInfo.uname" :c-date="vInfo.c_date" :des="vInfo.des" :title="vInfo.title"></video-info>
						</view>
						<view class="tags calcVHeight">
							<view class="tag" v-for="(item, index) of tags" :key="index">
								<uni-tag :text="item" type="pink" :circle="true" :inverted="true"></uni-tag>
							</view>
						</view>
						<view class="video-op calcVHeight">
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
						<view class="video-list calcVHeight" @tap="tapVImage">
							<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in vList" :key="index">
								<view class="uni-media-list" :data-vid="item.vid">
									<image class="uni-media-list-logo" :src="item.poster"></image>
									<view class="uni-media-list-body">
										<view class="uni-media-list-text-top">{{item.title}}</view>
										<view class="uni-media-list-text-bottom uni-ellipsis">{{item.uname}}</view>
									</view>
								</view>
							</view>
							<uni-load-more :status="vStatus" :content-text="contentText" class="calcVHeight"></uni-load-more>
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<view v-for="(item, index) of comments" :key="index">
							<comment :comment="item" class="calcCHeight"></comment>
						</view>
						<uni-load-more :status="cStatus" :content-text="contentText" class="calcCHeight"></uni-load-more>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<image-menu ref="share" :strShareUrl="strShareUrl" :strShareImageUrl="strShareImageUrl" :strShareSummary="strShareSummary" :strShareTitle="strShareTitle"></image-menu>
		<view :class="{foot: true,hidden:hideInput,calcCHeight: true}">
			<bottom-input buttonText="评论" @send-message="comm"></bottom-input>
		</view>
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
	import bottomInput from '../../components/bottom-input/bottom-input'
	let _this
	export default {
		components:{WucTab, VideoInfo, ImageMenu, uniTag, comment, uniLoadMore, bottomInput},
		data() {
			return {
				src: '', //视频资源地址
				danmuList: [], //弹幕列表
				danmu: '', //输入的弹幕内容
				tabList: [
					{name: '视频信息'},
					{name: '评论'}
				],
				tabCur: 0, //当前选项卡
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
				isSub: false, //是否订阅
				comments: [], //评论列表
				pageSize: 10, //每次获取的信息数量，分页用
				vStatus: 'more',
				cStatus: 'more',
				contentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '少女折寿中....',
					contentnomore: '再怎么加载也没有了'
				},
				swiperHeight: 0, //swiper高度
				vHeight: 0, //视频swiper高度
				cHeight: 0, //评论swiper高度
				hideInput: true
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
				// 切换选项卡
				this.tabCur = index
			},
			swiperChange(e){
				// swiper改变处理函数
				this.tabCur = e.target.current
				if(this.tabCur === 1){
					// 评论swiper
					_this.swiperHeight = _this.cHeight
					_this.hideInput = false
				}else{
					// 视频信息swiper
					_this.swiperHeight = _this.vHeight
					_this.hideInput = true
				}
				if(this.tabCur === 1 && this.comments.length < 1){
					// 第一次切换到评论swiper
					this.getComments()
				}
			},
			getComments(){
				// 获取评论
				uni.createSelectorQuery().select('#myVideo').fields({
					dataset:true
				}, (res) => {
					const vid = res.dataset.vid
					myAxios({
						url: _this.apiServer + 'comment/' + vid,
						method: 'GET',
						data: {}
					}).then((res) => {
						if(res.data.statusCode === 200){
							_this.comments = _this.comments.concat(res.data.comments) 
							_this.$nextTick(() => {
								_this.calcSwiperHeight(1)
							})
						}
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
				// 点击视频列表项
				const vid = e.currentTarget.dataset.vid
				uni.navigateTo({
					url: './video?vid='+vid,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			subHandler(e){
				// 订阅处理
				const uid = e.currentTarget.dataset.uid
				if(this.isSub){
					this.unsubscrible(uid)
				}else{
					this.subscribe(uid)
				}
			},
			subscribe(uid){
				// 订阅
				this.isSub = true
			},
			unsubscrible(uid){
				// 取消订阅
				this.isSub = false
			},
			getDanmuList(vid){
				// 获取弹幕列表
				const p = myAxios({
					url: _this.apiServer + 'danmu/' + vid,
					method: 'GET'
				}).then((res) => {
					if(res.statusCode === 200){
						_this.danmuList = res.data.danmuList
					}
				}).catch((e) => {
					throw e
				})
				return p
			},
			getVList(){
				// 获取视频列表
				if(!this.reload){
					this.vStatus = 'loading'
				}
				const p = myAxios({
					url: _this.apiServer + 'video/list/' + _this.pageSize,
					method: 'GET',
					data: {}
				}).then((res) => {
					if(res.statusCode === 200){
						const list = res.data.list
						_this.vList =  _this.vList.concat(list)
					}
					_this.reload = false
				}).catch((e) => {
					throw e
				})
				return p
			},
			getVideo(vid){
				// 获取视频信息
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
				// 获取视频标签
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
			},
			comm(){
				
			},
			calcSwiperHeight(index){
				// 计算swiper高度
				if(index === 0){
					this.calcHeight(index, '.calcVHeight')
				}else{
					this.calcHeight(index, '.calcCHeight')
				}
			},
			calcHeight(index, selector){
				// 计算高度
				uni.createSelectorQuery().selectAll(selector).boundingClientRect((rects) => {
					let sum = 0
					for(let rect of rects){
						sum += rect.height
					}
					if(index === 0){
						_this.vHeight = _this.swiperHeight = sum
					}else{
						_this.cHeight = _this.swiperHeight = sum
					}
				}).exec()
			}
		},
		onLoad(res) {
			_this = this
			const vid = res.vid
			// 获取视频信息、视频标签、视频列表、弹幕列表
			Promise.all([_this.getVList(), _this.getVideo(vid), _this.getTags(vid), _this.getDanmuList()])
				.then((res) => {
					_this.calcSwiperHeight(0)
					plus.nativeUI.toast('获取信息成功')
				})
				.catch((e) => {
					console.log(e)
					plus.nativeUI.toast(e)
				})
		},
		onReady() {
			// 获取视频播放器
			this.videoContext = uni.createVideoContext('myVideo')
		},
		onBackPress(options) {
			//防死循环
			if(options.from === 'navigateBack'){
				return false
			}
			//返回上一级
			uni.navigateBack({
				delta: 1
			})
			return true
		},
		onReachBottom(){
			// 触底事件处理
			if(this.tabCur === 0){
				// 视频信息标签选中
				this.vStatus = 'loading'
				this.getVList()
					.then((res) => {
						_this.calcSwiperHeight(0)
					}).catch((e) => {
						plus.nativeUI.toast('获取视频列表失败')
					})
			}else{
				// 评论标签选中
				this.cStatus = 'loading'
				this.getComments()
			}
		}
	}
</script>

<style scoped lang="less">
	@import '../../less/video';
</style>
