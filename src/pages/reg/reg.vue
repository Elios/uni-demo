<template>
	<view class="container">
		<view class="reg-avatar">
			<avatar :avatarSrc="file.uri" selHeight="500upx" selWidth="500upx" @upload="upload" inner="true" avatarStyle="width: 200upx; height: 200upx"></avatar>
		</view>
		<view class="reg">
			<view class="reg-uname">
				<label>用户名</label>
				<input type="text" v-model="formData.uname" placeholder="请输入用户名"/>
			</view>
			<view class="reg-pwd">
				<label>密码</label>
				<input type="text" password="true" v-model="formData.pwd" placeholder="请输入密码"/>
			</view>
			<view class="reg-repwd">
				<label>确认密码</label>
				<input type="text" password="true" v-model="formData.repwd" placeholder="请再次输入密码"/>
			</view>
			<view class="reg-gender">
				<radio-group @change="onChangeRadio">
					<label class="radio">
						<radio value="0" color="#ffd9e6"/>男
					</label>
					<label class="radio">
						<radio value="1" color="#ffd9e6"/>女
					</label>
					<label class="radio">
						<radio value="2" color="#ffd9e6" checked/>你猜
					</label>
				</radio-group>
			</view>
			<view class="reg-phone">
				<label>手机号码</label>
				<input type="number" v-model="formData.phone" placeholder="请输入手机号码"/>
			</view>
			<view class="reg-email">
				<label>邮箱</label>
				<input type="text" v-model="formData.email" placeholder="请输入邮箱"/>
			</view>
			<view class="reg-button">
				<button type="primary" @tap="submit">注册</button>
				<button type="primary" @tap="reset">重置</button>
			</view>
		</view>
	</view>
</template>

<script>
	import avatar from '../../components/yq-avatar/yq-avatar'
	import validateForm from '../../common/validateForm.js'
	export default {
		components: {avatar},
		data() {
			return {
				formData: {
					uname: '',
					pwd: '',
					repwd: '',
					phone: '',
					email: '',
					gender: 2,
					upVideo: 0,
					upArticle: 0
				},
				file: {
					name: 'avatar',
					uri: '../../static/avatar/avatar.jpg'
				}
			};
		},
		methods: {
			submit(){
				if(validateForm.validate(this.formData)){
					if(!/^[\w]{3,10}$/.test(this.formData.uname)){
						plus.nativeUI.toast('用户名长度必须在3-10位之间，不能有特殊字符')
						return
					}
					if(!/^[\w]{6,16}$/.test(this.formData.pwd)){
						plus.nativeUI.toast('密码长度必须在6-16位之间，不能有特殊字符')
						return
					}
					if(this.formData.pwd != this.formData.repwd){
						plus.nativeUI.toast('两次密码要一样')
						return
					} 
					if(!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.formData.phone)){
						plus.nativeUI.toast('手机号码不正确')
						return
					} 
					if(!/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(this.formData.email)){
						plus.nativeUI.toast('邮箱不正确')
						return
					} 
					uni.uploadFile({
						url: this.apiServer + 'users/logon',
						files: [this.file],
						formData: this.formData,
						success(res) {
							console.log(res)
							if(res.statusCode === 200){
								plus.nativeUI.toast('注册成功')
								uni.navigateTo({
									url: '../login/login'
								})
							}else{
								plus.nativeUI.toast('用户名已存在')
							}
						},
						fail(e) {
							plus.nativeUI.toast('注册失败，请稍后再试')
						}
					})
				}else{
					plus.nativeUI.toast('请检查是否有遗漏的哦')
				}
			},
			reset(){
				
			},
			onChangeRadio(e){
				this.formData.gender = e.detail.value
			},
			upload(e){
				this.file.uri = e.path
			}
		},
	}
</script>

<style lang="less" scoped>
	@import '../../less/reg';
</style>

