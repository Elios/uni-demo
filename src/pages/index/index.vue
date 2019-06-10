<template>
	<view class="content">
		<uni-nav-bar :left-icon="navIcon" title="主页" @click-left="onClickLeft"></uni-nav-bar>
		<uni-drawer :visible="showDrawer" @close="closeDrawer" mode="left">
			<view style="padding:30upx;">
				<uni-list>
					<uni-list-item title="我的主页" note="myHome"></uni-list-item>
					<uni-list-item title="我的收藏" note="fav"></uni-list-item>
					<uni-list-item title="我的关注" note="sub"></uni-list-item>
					<uni-list-item title="设置" note="setting"></uni-list-item>
					<uni-list-item title="关于" note="about"></uni-list-item>
					<uni-list-item title="登出" note="logout" v-if="login"></uni-list-item>
					<uni-list-item title="登录" note="login" v-else @tap="toLogin"></uni-list-item>
					<uni-list-item title="退出" note="exit"></uni-list-item>
				</uni-list>
			</view>
		</uni-drawer>
		<view class="uni-page-head">
			<uni-swiper-dot :info="bannerInfo" :current="current" :mode="mode" :dotsStyles="dotsStyles">
				<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" @change="change" @tap="tapImg">
					<swiper-item v-for="item of bannerInfo" :key="item.vid">
						<view class="swiper-item">
							<image :src="item.imageUrl" mode="" :data-vid="item.vid"></image>
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		</view>
		<view class="vlist" @tap="tapImg">
			<Preview v-for="(item, index) of vPreview" :key="index" :data-vid="item.vid" :imageUrl="item.imageUrl" :title="item.title" :uname="item.uname" :c_time="item.c_time" class="preview"></Preview>
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
	let _this
	export default {
		components: {Preview, uniSwiperDot, uniNavBar, uniDrawer, uniList, uniListItem},
		data() {
			return {
				showDrawer: false,
				navIcon: 'bars',
				vPreview: [],
				mode: 'long',
				bannerInfo: [],
				current: 0,
				dotsStyles: {
					backgroundColor: 'transparent',
					border: 'none'
				},
				login: false
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
			},
			toLogin(){
				this.showDrawer = false
				this.checkLogin('../index/index')
			},
			closeDrawer(){
				this.showDrawer = false
			},
			getVResource(){
				const p1 = myAxios({
					url: _this.apiServer + 'video/banner/',
					method: 'GET',
					data: {}
				}).then((res) => {
					_this.bannerInfo = res.data
				}).catch((e) => {
					console.log(e)
				})
				const p2 = myAxios({
					url: _this.apiServer + 'video/list/',
					method: 'GET',
					data: {}
				}).then((res) => {
					_this.vPreview = res.data
				}).catch((e) => {
					console.log(e)
				})
				return Promise.all([p1, p2])
			}
		},
		onPullDownRefresh: () => {
			// 下拉刷新时获取视频信息
			_this.getVResource()
				.then((res) => {
					console.log("获取成功")
				})
				.catch((e) => {
					console.log("失败")
				})
				.finally(() => {
					uni.stopPullDownRefresh()
				})
		},
		onBackPress: () => {
			// 按下返回键时
			if(_this.showDrawer){
				_this.showDrawer = false
				return true
			}
		},
		onLoad() {
			_this = this
			// 获取用户登录信息
			const uid = uni.getStorageSync('uid')
			const signature = uni.getStorageSync('signature')
			const uname = uni.getStorageSync('uname')
			if(uid && signature && uname){
				this.login = true
			}
			_this.getVResource()
				.then((res) => {
					console.log("获取成功")
				})
				.catch((e) => {
					console.log("失败")
				})
		},
		onShow() {
			
		}
	}
</script>

<style scoped lang="less">
	@import '../../less/index';
</style>
