<template>
	<view class="uni-column">
		<view class="content" id="content" :style="{height:style.contentViewHeight+'px'}">
			<scroll-view id="scrollview" scroll-y="true" :style="{height:style.contentViewHeight+'px'}" :scroll-with-animation="true"
			    :scroll-top="scrollTop">
				<page-foot :name="name"></page-foot>
				<chat-message v-for="(message,index) in messages" :key="index" :message="message" :cid="index"></chat-message>
				<view id="bottom"></view>
			</scroll-view>
		</view>
		<view class="foot">
			<bottom-input @send-message="getInputMessage" :show-mic="true" :emoji="true" @show="setScrollH" @foc="setScrollH">
			</bottom-input>
		</view>
	</view>
</template>

<script>
	import bottomInput from '../../components/bottom-input/bottom-input';
	import chatMessage from '../../components/chat-message/chat-message';
	import myAxios from '../../common/myAxios.js'
	import io from 'weapp.socket.io'
	let _this, socket
	export default {
		data() {
			return {
				name:'xcecd@qq.com',
				style: {
					pageHeight: 0,
					contentViewHeight: 0,
					footViewHeight: 90,
					mitemHeight: 0,
				},
				scrollTop: 0,
				messages: [],
				uInfo: {}
			}
		},
		components: {
			bottomInput,
			chatMessage
		},
		onLoad: function (data) {
			_this = this
			socket = io('http://192.168.42.43:3000')
			socket.on('connect', () => {
				console.log('connected')
			})
			socket.on('connect_error', (err) => {
				console.log(err)
			})
			socket.on('connect_timeout', (timeout) => {
				console.log(timeout)
			})
			socket.on('error', (err) => {
				console.log(err)
			})
			socket.on('disconnect', (reason) => {
				console.log(reason)
			})
			socket.on('new message', (data) => {
				console.log(data)
				_this.addMessage('home', data.message, {uname: data.username})
			})
			this.getUserInfo(data.uid)
			const res = uni.getSystemInfoSync();
			this.style.pageHeight = res.windowHeight;
			this.style.contentViewHeight = res.windowHeight - uni.getSystemInfoSync().screenWidth / 750 * (100); //像素
		},
		methods: {
			getInputMessage: function (message) { //获取子组件的输入数据
				// console.log(message);
				this.addMessage('customer', message.content, _this.uInfo);
				this.to({message: message.content});
				this.setScrollH();
			},
			addMessage: function (user, content, uInfo) {
				console.log(uInfo)
				var that = this;
				that.messages.push({
					user: user,
					content: content,
					uInfo: uInfo
				});
			},
			scrollToBottom: function () {
				var that = this;
				var query = uni.createSelectorQuery();
				query.selectAll('.m-item').boundingClientRect();
				query.select('#scrollview').boundingClientRect();

				query.exec(function (res) {
					that.style.mitemHeight = 0;
					res[0].forEach(function (rect) {
						// console.info(rect.height);
						that.style.mitemHeight = that.style.mitemHeight + rect.height + 20;
					});

					if (that.style.mitemHeight > that.style.contentViewHeight) {
						that.scrollTop = that.style.mitemHeight - that.style.contentViewHeight;
					}
				});
			},
			to: function (msg) {
				socket.emit('new message', msg)
			},
			getUserInfo(uid){
				myAxios({
					url: _this.apiServer + 'users/' + uid,
					method: 'GET'
				}).then((res) => {
					console.log(res.data.uInfo)
					_this.uInfo = res.data.uInfo
					socket.emit('add user', _this.uInfo.uname)
				}).catch((e) => {
					plus.nativeUI.toast('获取用户信息失败')
				})
			},
			// 设置高度 用emit辅助
			setScrollH: function(){
				var query = uni.createSelectorQuery();
				let footh = query.select('.foot');
				//console.log('fh',footh);
				const res = uni.getSystemInfoSync();
				this.style.pageHeight = res.windowHeight;
				this.$nextTick(function(){
					footh.fields({
						size: true
					}, data => {
						footh = data.height;
						this.style.contentViewHeight = res.windowHeight -footh ; //像素
					}).exec();	
				})	
			}
		},
		onBackPress() {
			socket.close()
		}
	}
</script>

<style lang="less">
	@import '../../less/chat';
</style>
