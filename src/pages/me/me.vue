<template>
	<view class="content">
		<uni-nav-bar :left-icon="navIcon" title="我" @click-left="onClickLeft"></uni-nav-bar>
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
		</uni-drawer>
		<view class="">
			llll
		</view>
	</view>
</template>

<script>
	import uniNavBar from '../../components/uni-nav-bar/uni-nav-bar'
	import uniDrawer from '../../components/uni-drawer/uni-drawer'
	import uniList from '../../components/uni-list/uni-list'
	import uniListItem from '../../components/uni-list-item/uni-list-item'
	export default {
		components: {uniNavBar, uniDrawer, uniList, uniListItem},
		data() {
			return {
				navIcon: 'bars',
				showDrawer: false,
				login: false
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
				});
			},
			closeDrawer(){
				this.showDrawer = false
			}
		},
		onBackPress() {
			if(this.showDrawer){
				this.showDrawer = false
				return true
			}
		},
		onLoad() {
			const uid = uni.getStorageInfoSync('uid')
			const signature = uni.getStorageInfoSync('signature')
			if(uid && signature){
				// this.login = true
			}
		}
	}
</script>

<style>

</style>
