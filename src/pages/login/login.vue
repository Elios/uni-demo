<template>
	<view class="page_login">
		<!-- 头部logo -->
		<view class="head">
			<view class="head_bg">
				<view class="head_inner_bg">
					<image style="width: 55px;height: 65px;" :src="imgInfo.head" class="head_logo" />
				</view>
			</view>
		</view>
		<!-- 登录form -->
		<view class="login_form">
			<view class="input">
				<view class="img">
					<image style="width:27px;height: 27px;" :src="imgInfo.icon_user" />
				</view>
				<input type="text" v-model="formData.uname" placeholder="请输入用户账号">
				<view class="img">
					<image @tap="delUser" class="img_del" :src="imgInfo.icon_del" />
				</view>
			</view>
			<view class="line" />
			<view class="input">
				<view class="img">
					<image style="width:20px;height: 25px;" :src="imgInfo.icon_pwd" />
				</view>
				<input :type="pwdType" v-model="formData.pwd" placeholder="请输入密码">
				<view class="img" @tap="switchPwd">
					<image class="img_pwd_switch" :src="imgInfo.icon_pwd_switch" />
				</view>
			</view>
		</view>
		<!-- 登录提交 -->
		<button class="submit" type="primary" @tap="login">登录</button>
		<view class="opts">
			<text @tap="goReg" class="text">立即注册</text>
			<text @tap="findPwd" class="text">忘记密码？</text>
		</view>
		<view class="quick_login_line">
			<view class="line" />
			<text class="text">快速登录</text>
			<view class="line" />
		</view>
		<view class="quick_login_list">
			<image @tap="thirdLogin('qq')" class="item" :src="imgInfo.qq" />
			<image @tap="thirdLogin('wechat')" class="item" :src="imgInfo.wechat" />
			<image @tap="thirdLogin('weibo')" class="item" :src="imgInfo.weibo" />
		</view>
	</view>
</template>
<script>
	import Sign from '../../common/sign.js'
	import myAxios from '../../common/myAxios.js'
	let _this
	export default {
		data() {
			return {
				formData:{
					uname: '',
					pwd: ''
				},
				pwdType: 'password',
				imgInfo: {
					head: require('@/static/head.png'),
					icon_user: require('@/static/icon_user.png'),
					icon_del: require('@/static/icon_del.png'),
					icon_pwd: require('@/static/icon_pwd.png'),
					icon_pwd_switch: require('@/static/icon_pwd_switch.png'),
					qq: require('@/static/qq.png'),
					wechat: require('@/static/wechat.png'),
					weibo: require('@/static/weibo.png')
				},
				backPage: ''
			}
		},
		methods: {
			delUser() {
				this.formData.uname = ''
			},
			switchPwd() {
				this.pwdType = this.pwdType === 'text' ? 'password' : 'text'
			},
			login() {
				myAxios({
					url: _this.apiServer+'users/login',
					method: 'POST',
					data: _this.formData
				}).then((res) => {
					if(res.statusCode === 200){
						console.log(res)
						uni.setStorageSync('uid', res.data.result.uid)
						uni.setStorageSync('uname', res.data.result.uname)
						uni.setStorageSync('avatar', res.data.result.avatar)
						plus.nativeUI.toast('登录成功')
						uni.reLaunch({
							url: '../index/index'
						})
					}else{
						plus.nativeUI.toast('请检查用户名和密码是否正确')
					}
				}).catch((e) => {
					plus.nativeUI.toast('登录失败，请稍后再试')
					console.log(e)
				})
			},
			findPwd() {
				uni.navigateTo({
					url:'/pages/find-pwd/find-pwd'
				})
			},
			goReg() {
				uni.navigateTo({
					url:'/pages/reg/reg'
				})
			},
			thirdLogin(type) {
				console.log(type)
			}
		},
		onLoad(res) {
			_this = this
			this.backPage = res.backPage
		},
		onBackPress(){
			uni.navigateTo({
				url: '../index/index',
				success: res => {},
				fail: () => {},
				complete: () => {}
			})
			return
		}
	}
</script>
<style>
	page {
		height: auto;
		min-height: 100%;
		background-color: #f5f6f8;
	}
</style>
<style lang="scss" scoped>
	$logo-padding: 20upx;
	$form-border-color: rgba(214, 214, 214, 1);
	$text-color: #B6B6B6;

	.page_login {
		padding: 10px;
	}

	.head {
		display: flex;
		align-items: center;
		justify-content: center;
		padding-top: $logo-padding;
		padding-bottom: $logo-padding;

		.head_bg {
			border: 1px solid #fbecf1;
			border-radius: 50px;
			width: 100px;
			height: 100px;
			display: flex;
			align-items: center;
			justify-content: center;

			.head_inner_bg {
				border-radius: 40px;
				width: 80px;
				height: 80px;
				display: flex;
				background-color: #fc2c5d;
				align-items: flex-end;
				justify-content: center;
				overflow: hidden;
			}
		}
	}

	.login_form {
		display: flex;
		margin: 20px;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border: 1px solid $form-border-color;
		border-radius: 10px;

		.line {
			width: 100%;
			height: 1px;
			background-color: $form-border-color;
		}

		.input {
			width: 100%;
			max-height: 45px;
			display: flex;
			padding: 3px;
			flex-direction: row;
			align-items: center;
			justify-content: center;

			.img {
				min-width: 40px;
				min-height: 40px;
				margin: 5px;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.img_del {
				width: 21px;
				height: 21px;
			}

			.img_pwd_switch {
				width: 28px;
				height: 12px;
			}

			input {
				outline: none;
				height: 30px;
				width: 100%;

				&:focus {
					outline: none;
				}
			}
		}
	}

	.submit {
		margin-top: 30px;
		margin-left: 20px;
		margin-right: 20px;
		color: white;
		background-color: rgba(252, 44, 93, 1.0);
		-webkit-tap-highlight-color: rgba(252, 44, 93, 1.0);

		&:active {
			color: #B6B6B6;
			background-color: rgba(252, 44, 93, 0.8);
		}
	}

	.opts {
		margin-top: 5px;
		margin-left: 25px;
		margin-right: 25px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;

		.text {
			font-size: 13px;
			color: $text-color;
		}
	}

	.quick_login_line {
		margin-top: 40px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

		.line {
			height: 1px;
			width: 38%;
			background-color: rgba(211, 211, 213, 1);
		}

		.text {
			font-size: 13px;
			color: rgba(200, 200, 200, 1);
			margin: 2px;
		}
	}

	.quick_login_list {
		margin-top: 30px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

		.item {
			width: 50px;
			height: 50px;
			margin: 20px;
		}
	}
</style>
