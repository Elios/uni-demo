<template>
	<view class=""></view>
</template>

<script>
	let imgViewTop = 150, imgViewLeft = 10
	const res = uni.getSystemInfoSync()
	const windowWidth = res.windowWidth
	const screenHeight = res.screenHeight
	const maskView = new plus.nativeObj.View('maskView', {
		top: '0px',
		left: '0px',
		height: '100%',
		width: '100%',
		backgroundColor: 'rgba(0,0,0,0.3)'
	})
	const imgView = new plus.nativeObj.View('imgView', {
		top: imgViewTop + 'px',
		left: imgViewLeft + 'px',
		height: 'auto',
		width: windowWidth - 2 * imgViewLeft + 'px',
		backgroundColor: 'rgba(255,255,255)'
	})
	maskView.addEventListener('click', function(e){
		maskView.hide()
		imgView.hide()
	})
	export default {
		name: 'showImage',
		props:{
			imgSrc:{
				type: String,
				default: ''
			}
		},
		methods:{
			show(){
				maskView.show()
				imgView.show()
			},
			hide(){
				maskView.hide()
				imgView.hide()
			}
		},
		watch:{
			imgSrc(val){
				imgView.reset()
				imgView.draw([
					{
						tag: 'img',
						src: val,
						position: {
							top: '0px',
							left: '0px',
							height: 'auto',
							width: '100%'
						}
					}
				])
			}
		}
	}
</script>

<style>
</style>
