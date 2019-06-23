<template>
	<view class="container">
		<view class="title">
			<label for="title">视频标题</label>
			<input type="text" v-model="formData.title" placeholder="请输入视频标题" id="title"/>
		</view>
		<view class="des">
			<label for="des">视频简介</label>
			<textarea v-model="formData.des" id="des" auto-height="true"/>
		</view>
		<view class="tags">
			<label for="tag">视频标签</label>
			<input type="text" v-model="tag" @confirm="addTags" placeholder="视频标签回车添加" confirm-hold="true" id="tag"/>
			<dynamic-tags :tags="formData.tags" removable="true" @delTag="delTag"></dynamic-tags>
		</view>
		<view class="poster">
			<label>视频封面</label>
			<image-list @add="choosePoster" @del="removePoster" :imgList="imgSrc"></image-list>
		</view>
		<view class="video">
			<button type="primary" @tap="chooseVideo">拍摄或选择视频</button>
			<view>{{vPath}}</view>
		</view>
		<uni-fab horizontal="right" vertical="bottom" :content="menuContent" @trigger="onTrigger" :pattern="pattern"></uni-fab>
	</view>
</template>

<script>
	import dynamicTags from '../../components/dynamic-tags/dynamic-tags'
	import imageList from '../../components/image-list/image-list'
	import uniFab from '../../components//uni-fab/uni-fab'
	import {deepCopy} from '../../common/util.js'
	import validateForm from '../../common/validateForm.js'
	let _this
	export default {
		name: 'uploadVideo',
		components: {dynamicTags, imageList, uniFab},
		data() {
			return {
				user: {},
				formData: {
					title: '',
					des: '',
					tags: []
				},
				tag: '',
				imgSrc: [],
				vPath: '',
				files: [],
				menuContent: [
					{
						text: '上传',
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
			chooseVideo(){
				uni.chooseVideo({
					success(res) {
						console.log(res.tempFilePath, res.size)
						const size = res.size / 1024 / 1024
						if(size > 500){
							plus.nativeUI.toast('文件大小不能超过500M')
							return
						}
						_this.vPath = res.tempFilePath
						const date = new Date()
						// const name = uni.getStorageSync('uid') + date.getFullYear() + date.getMonth() + date.getDay() + date.getHours() + date.getMinutes()
						// const name = 1 + date.getFullYear().toString() + (date.getMonth()+1).toString() + date.getDate().toString() + date.getHours().toString() + date.getMinutes().toString() + date.getSeconds().toString() + Math.floor(Math.random() * 1000)
						const file = Object.assign({name: 'video'},{uri: res.tempFilePath})
						console.log(file)
						_this.files.push(file)
					},
					fail(e) {
						plus.nativeUI.toast('视频选择失败')
					}
				})
			},
			choosePoster(){
				if(this.imgSrc.length === 1) return
				uni.chooseImage({
					count: 1,
					sizeType: 'compressed',
					success(res) {
						console.log(res.tempFilePaths[0], res.tempFiles[0])
						_this.imgSrc.push(res.tempFilePaths[0]) 
						const file = Object.assign({uri: res.tempFilePaths[0]}, {name: 'poster'})
						_this.files.push(file)
					},
					fail(e) {
						plus.nativeUI.toast('封面选择失败')
					}
				})
			},
			removePoster(id){
				this.imgSrc.splice(id, 1)
			},
			addTags(){
				if(!this.tag.trim()){
					this.tag = ''
					return
				}
				this.formData.tags.push(this.tag)
				this.tag = ''
			},
			delTag(id){
				this.formData.tags.splice(id, 1)
			},
			onTrigger(e){
				const index = e.index
				e.item.active = !e.item.active
				if(index === 0){
					this.submit()
				}else{
					this.reset()
				}
			},
			reset(){
				this.formData.title = ''
				this.formData.des = ''
				this.formData.tags = []
				this.imgSrc = []
				this.vPath = ''
			},
			submit(){
				let formData = deepCopy(this.formData)
				formData = Object.assign(formData, {uid: this.user.uid, uname: this.user.uname})
				console.log(formData)
				if(!validateForm.validate(this.files, formData)){
					plus.nativeUI.toast('请检查是否有漏填的哦')
					return
				}
				formData.tags = formData.tags.join(',')
				this.upload(this.files, formData)
					.then((data) => {
						if(data.statusCode === 200){
							plus.nativeUI.toast('上传成功')
							console.log('上传成功')
						}
					})
					.catch((e) => {
						plus.nativeUI.toast('上传失败')
						console.log(e)
					})
			},
			upload(files, formData){
				return new Promise((resolve, reject) => {
					uni.uploadFile({
						url: _this.apiServer + 'upload/',
						files: files,
						formData: formData,
						success(data) {
							resolve(data)
						},
						fail(e) {
							reject(e)
						}
					})
				})
			}
		},
		onLoad(res) {
			_this = this
			console.log(uni.getStorageSync('uid'))
			this.user = this.checkLogin()
		},
		onBackPress() {
			
		}
	}
</script>

<style lang="less" scoped>
	@import '../../less/upload';
</style>
