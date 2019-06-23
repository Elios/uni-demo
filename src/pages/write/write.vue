<template>
	<view class="container">
		<view class="write-content">
			<textarea v-model="formData.content" placeholder="随便写点什么...." />
		</view>
		<view class="write-radio">
			<radio-group @change="onChangeRadio">
				<label class="radio">
					<radio value="0" checked/>所有人可见
				</label>
				<label class="radio">
					<radio value="1"/>仅自己可见
				</label>
			</radio-group>
		</view>
		<view class="write-checkbox">
			<checkbox-group @change="onChangeCheckbox">
				<label class="checkbox">
					<checkbox value="1" checked/>同步到动态
				</label>
			</checkbox-group>
		</view>
		<uni-fab direction="horizontal" horizontal="right" vertical="bottom" :content="menuContent" :pattern="pattern" @trigger="onTrigger"></uni-fab>
	</view>
</template>

<script>
	import uniFab from '../../components/uni-fab/uni-fab'
	import myAxios from '../../common/myAxios.js'
	import validateForm from '../../common/validateForm.js'
	export default {
		components: {uniFab},
		data() {
			return {
				formData: {
					content: '',
					private: 0,
					sync: true
				},
				menuContent: [
					{
						text: '发表',
						active: false
					},
					{
						text: '重置',
						active: false
					}
				],
				pattern: {
					color: '#5b5b5b',
					backgroundColor: '#fff',
					selectedColor: '#ffd9e6',
					buttonColor: '#ffd9e6'
				}
			}
		},
		methods: {
			onChangeRadio(e){
				this.formData.private = e.detail.value
			},
			onChangeCheckbox(e){
				if(e.detail.value === 1){
					this.formData.sync = e.detail.value
				}else{
					this.formData.sync = 0
				}
			},
			onTrigger(e){
				const index = e.index
				if(index === 0){
					if(!validateForm.validate(this.formData)){
						plus.nativeUI.toast('内容不能为空哦')
						return
					}
					this.upload(this.formData)
						.then((res) => {
							if(res.statusCode === 200){
								plus.nativeUI.toast('发表成功')
							}else{
								plus.nativeUI.toast('发表失败')
							}
						})
						.catch((e) => {
							plus.nativeUI.toast('发表失败')
							console.log(e)
						})
				}else if(index === 1){
					this.reset()
				}
			},
			upload(data){
				const uid = uni.getStorageSync('uid')
				let date = new Date()
				date = date.toLocaleDateString()
				data = Object.assign(data, {uid: uid}, {date: date})
				console.log(data)
				return myAxios({
					url: this.apiServer + 'write',
					method: 'POST',
					data: data
				})
			},
			reset(){
				this.formData.content = ''
			}
		}
	}
</script>

<style lang="less" scoped>
	@import '../../less/write';
</style>
