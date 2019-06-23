<template>
	<view class="content">
		<uni-nav-bar left-icon="bars" title="主页" @click-left="onClickLeft" right-icon="upload" @click-right="onClickRight"></uni-nav-bar>
		<uni-drawer :visible="showDrawer" @close="closeDrawer" mode="left">
			<view style="padding:30upx;">
				<uni-list>
					<uni-list-item title="我的主页" note="myHome"></uni-list-item>
					<uni-list-item title="我的收藏" note="fav"></uni-list-item>
					<uni-list-item title="我的关注" note="sub"></uni-list-item>
					<uni-list-item title="设置" note="setting"></uni-list-item>
					<uni-list-item title="关于" note="about"></uni-list-item>
					<uni-list-item title="登出" note="logout" v-if="login" @tap="toLogout"></uni-list-item>
					<uni-list-item title="登录" note="login" v-else @tap="toLogin"></uni-list-item>
					<uni-list-item title="退出" note="exit"></uni-list-item>
				</uni-list>
			</view>
		</uni-drawer>
		<view class="uni-page-head" :class="{'blur': blur}">
			<uni-swiper-dot :info="bannerInfo" :current="current" :mode="mode" :dotsStyles="dotsStyles">
				<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" @change="change" @tap="tapImg" circular>
					<swiper-item v-for="item of bannerInfo" :key="item.vid">
						<view class="swiper-item">
							<image :src="item.poster" mode="" :data-vid="item.vid"></image>
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		</view>
		<view class="vlist" @tap="tapImg" :class="{'blur': blur}">
			<Preview v-for="(item, index) of vPreview" :key="index" :data-vid="item.vid" :imageUrl="item.poster" :title="item.title" :uname="item.uname" :c_time="item.c_time" class="preview"></Preview>
			<uni-load-more :status="status" :content-text="contentText"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import Preview from '../../components/preview/Preview'
	import uniSwiperDot from '../../components/uni-swiper-dot/uni-swiper-dot'
	import uniNavBar from '../../components/uni-nav-bar/uni-nav-bar'
	import uniDrawer from '../../components/uni-drawer/uni-drawer'
	import uniList from '../../components/uni-list/uni-list'
	import uniListItem from '../../components/uni-list-item/uni-list-item'
	import myAxios from '../../common/myAxios.js'
	import uniLoadMore from '../../components/uni-load-more/uni-load-more'
	let _this
	export default {
		components: {Preview, uniSwiperDot, uniNavBar, uniDrawer, uniList, uniListItem, uniLoadMore},
		data() {
			return {
				showDrawer: false,
				vPreview: [],
				mode: 'long',
				bannerInfo: [],
				current: 0,
				dotsStyles: {
					backgroundColor: 'transparent',
					border: 'none'
				},
				login: false,
				status: 'more',
				contentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '少女折寿中....',
					contentnomore: '再怎么加载也没有了'
				},
				pageSize: 10,
				reload: false,
				blur: false
			}
		},
		methods: {
			change(e){
				// 手动切换轮播图图片时改变当前图片id
				this.current = e.detail.current
			},
			tapImg(e){
				// 点击视频图片时
				uni.navigateTo({
					url: '../video/video?vid='+e.target.dataset.vid,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			onClickLeft(){
				this.showDrawer = true
				this.blur = true
			},
			onClickRight(){
				if(this.checkLogin('../index/index')){
					uni.navigateTo({
						url: '../upload-video/upload-video?uid' + uni.getStorageSync('uid'),
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				}
			},
			toLogin(){
				this.showDrawer = false
				this.blur = false
				this.checkLogin('../index/index')
			},
			closeDrawer(){
				this.showDrawer = false
				this.blur = false
			},
			getBanner(){
				const p = myAxios({
					url: _this.apiServer + 'video/banner/',
					method: 'GET',
					data: {}
				}).then((res) => {
					_this.bannerInfo = res.data.banner
				}).catch((e) => {
					throw e
				})
				return p
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
					const list = res.data.list
					_this.vPreview = _this.reload ? list : _this.vPreview.concat(list)
					_this.reload = false
				}).catch((e) => {
					throw e
				})
				return p
			},
			toLogout(){
				this.logout('./index')
			}
		},
		onPullDownRefresh: () => {
			// 下拉刷新时获取视频信息
			_this.reload = true
			Promise.all([_this.getBanner(), _this.getList()])
				.then((res) => {
					uni.stopPullDownRefresh()
					plus.nativeUI.toast('获取成功')
				})
				.catch((e) => {
					uni.stopPullDownRefresh()
					plus.nativeUI.toast('获取视频信息失败')
				})
		},
		onBackPress: () => {
			// 按下返回键时
			if(_this.showDrawer){
				_this.blur = false
				_this.showDrawer = false
				return true
			}
		},
		onLoad() {
			_this = this
			// 获取用户登录信息
			const uid = uni.getStorageSync('uid')
			const uname = uni.getStorageSync('uname')
			console.log(uid, uname)
			if(uid && uname){
				this.login = true
			}
			Promise.all([_this.getBanner(), _this.getList()])
				.then((res) => {
					plus.nativeUI.toast('获取成功')
				})
				.catch((e) => {
					_this.status = 'nomore'
					plus.nativeUI.toast('获取视频信息失败')
				})
		},
		onShow() {
			
		},
		onReachBottom(){
			this.status = 'more'
			this.getList()
		}
	}
</script>

<style scoped lang="less">
	@import '../../less/index';
</style>
