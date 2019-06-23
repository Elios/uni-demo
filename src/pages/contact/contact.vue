<template>
	<view>
		<uni-nav-bar left-icon="bars" right-icon="scan">
			<view class="input">
				<input type="text" v-model="query" placeholder="请输入要查找的好友的名称" @input="inputHandler"/>
				<uni-icon type="search" class="search"></uni-icon>
			</view>
		</uni-nav-bar>
		<view class="">
			<button type="primary" @tap="toHall">大厅</button>
			<uni-collapse accordion="true">
				<uni-collapse-item v-for="item of cata" :title="item.name" :name="item.cid" :key="item.cid" @tap="clickCata(item.cid)">
					<view class="uni-list">
						<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in item.contacts" :key="index">
							<view class="uni-media-list">
								<image class="uni-media-list-logo" :src="item.avatar"></image>
								<view class="">
									<view class="uni-media-list-text-top">{{item.uname}}</view>
								</view>
							</view>
						</view>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '../../components/uni-nav-bar/uni-nav-bar'
	import uniIcon from '../../components/uni-icon/uni-icon'
	import myAxios from '../../common/myAxios.js'
	import uniCollapse from '../../components/uni-collapse/uni-collapse'
	import uniCollapseItem from '../../components/uni-collapse-item/uni-collapse-item'
	let _this
	export default {
		name: 'contact',
		components: {uniNavBar, uniIcon, uniCollapse, uniCollapseItem},
		data() {
			return {
				query: '',
				cata: []
			}
		},
		methods: {
			inputHandler(e){
				
			},
			clickCata(cid){
				
			},
			toHall(){
				// const uid = uni.getStorageSync('uid')
				const uid = 1
				uni.navigateTo({
					url: '../chat/chat?uid=' + uid,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		},
		onLoad() {
			_this = this
			// this.checkLogin()
			// const uid = uni.getStorageSync('uid')
			const uid = 1
			myAxios({
				url: _this.apiServer + 'contacts/' + uid,
				method: 'GET'
			}).then((res) => {
				_this.cata = res.data.cata
			}).catch((e) => {
				plus.nativeUI.toast('获取好友列表失败')
			})
		}
	}
</script>

<style scoped lang="less">
	@import '../../less/contact';
</style>
