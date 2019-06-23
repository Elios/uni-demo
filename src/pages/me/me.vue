<template>
	<view class="container">
		<!-- <uni-nav-bar :left-icon="navIcon" title="我" @click-left="onClickLeft"></uni-nav-bar>
		<uni-drawer :visible="showDrawer" @close="closeDrawer">
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
		</uni-drawer> -->
		<view class="me">
			<avatar :avatarSrc="bg" :selWidth="selWidth" :selHeight="selHeight" :circle="false" @upload="changeBg" :avatarStyle="avatarStyle" inner="true" stretch="longSel"></avatar>
			<view class="me-me">
				<view class="me-avatar" @tap="toSpace">
					<image :src="avatar" mode="" class="avatar"></image>
				</view>
				<view class="me-info">
					<view class="info-list">
						<horizontal-list :listItem="listItem"></horizontal-list>
					</view>
					<view class="info-live">
						<user-live-list :listItem="liveList" noDataText="暂无动态"></user-live-list>
					</view>
				</view>
			</view>
		</view>
		<uni-fab vertical="bottom" horizontal="right" @trigger="onTrigger" :content="menuContent" direction="vertical" :pattern="pattern"></uni-fab>
	</view>
</template>

<script>
	import uniNavBar from '../../components/uni-nav-bar/uni-nav-bar'
	import uniDrawer from '../../components/uni-drawer/uni-drawer'
	import uniList from '../../components/uni-list/uni-list'
	import uniListItem from '../../components/uni-list-item/uni-list-item'
	import uniFab from '../../components/uni-fab/uni-fab'
	import horizontalList from '../../components/horizontal-list/horizontal-list'
	import userLiveList from '../../components/user-live-list/user-live-list'
	import avatar from '../../components/yq-avatar/yq-avatar'
	import myAxios from '../../common/myAxios.js'
	let _this
	export default {
		components: {uniNavBar, uniDrawer, uniList, uniListItem, uniFab, horizontalList, userLiveList, avatar},
		data() {
			return {
				selWidth: '',
				selHeight: '',
				avatarStyle: 'height:' + uni.getSystemInfoSync().screenWidth / 16 * 9 + 'px;width:' + uni.getSystemInfoSync().screenWidth + 'px;filter:blur(1.1px)',
				navIcon: 'bars',
				showDrawer: false,
				login: false,
				avatar: '',
				bg: '../../static/bg/bg.jpg',
				menuContent: [
					{
						text: '创作视频',
						active: false
					},
					{
						text: '随笔',
						active: false
					},
					{
						text: '收藏夹',
						active: false
					}
				],
				pattern: {
					color: '#5b5b5b',
					backgroundColor: '#fff',
					selectedColor: '#ffd9e6',
					buttonColor: '#ffd9e6'
				},
				listItem: [
					{
						title: '投稿',
						content: 0
					},
					{
						title: '关注',
						content: 0
					},
					{
						title: '粉丝',
						content: 0
					},
					{
						title: '收藏',
						content: 0
					}
				],
				liveList: []
			}
		},
		methods: {
			onClickLeft(){
				this.showDrawer = true
			},
			toLogin(){
				this.showDrawer = false
				uni.navigateTo({
					url: '../login/login',
					success: res => {},
					fail: () => {},
					complete: () => {}
				})
			},
			closeDrawer(){
				this.showDrawer = false
			},
			onTrigger(e){
				if(this.checkLogin('../me/me')){
					const index = e.index
					if(index === 0){
						uni.navigateTo({
							url: '../upload-video/upload-video'
						})
					}else if(index === 1){
						uni.navigateTo({
							url: '../write/write'
						})
					}else if(index === 2){
						
					}
				}
			},
			changeBg(e){
				this.bg = e.path
				// uni.uploadFile({
				// 	url: _this.apiServer + 'upload/bg',
				// 	files: [file],
				// 	formData: {uid},
				// 	success(res) {
				// 		
				// 	},
				// 	fail(e) {
				// 		
				// 	}
				// })
			},
			toSpace(){
				
			}
		},
		onBackPress() {
			if(this.showDrawer){
				this.showDrawer = false
				return true
			}
		},
		onLoad() {
			this.selHeight = uni.getSystemInfoSync().screenWidth / 16 * 9 + 'px'
			this.selWidth = uni.getSystemInfoSync().screenWidth + 'px'
			console.log(this.selHeight, this.selWidth)
			_this = this
			const uid = uni.getStorageSync('uid')
			const uname = uni.getStorageSync('uname')
			const avatar = uni.getStorageSync('avatar')
			!avatar ? this.avatar = '../../static/avatar/avatar.jpg' : this.avatar = this.staticServer + avatar
			console.log(this.avatar)
			if(uid && uname){
				// this.login = true
			}
		},
		onShow(){
			const uid = uni.getStorageSync('uid')
			if(uid){
				myAxios({
					url: this.apiServer + 'user',
					methods: 'POST',
					data: {uid}
				}).then((res) => {
					console.log(res)
					this.listItem[0].content = res.data.result.upVideo
				}).catch((e) => {
					console.log(e)
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	@import '../../less/me';
</style>
