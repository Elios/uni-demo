<template>
	<view>
		<view class="footer">
			<view class="footer-left">
				<view v-if="showMic" class="uni-icon uni-icon-mic" @longpress="startRecognize"></view>
			</view>
			<view class="footer-center">
				<input class="input-text" type="text" v-model="inputValue" @focus="foc" :focus="focus"></input>
			</view>
			<view class="footer-emotion" @tap="show" v-if="emoji">
				<i class="icon iconfont icon-face"></i>
			</view>
			<view class="footer-right" @tap="sendMessge">
				<view id='msg-type' >{{buttonText}}</view>
			</view>
		</view>
		<emotion @emotion="handleEmotion" :height="200" v-if="showPannel"></emotion>
	</view>
</template>

<script>
	import Emotion from './Emotion/index.vue'
	export default {
		name: "bottom-input",
		components: {Emotion},
		data() {
			return {
				inputValue: '',
				showPannel: false,
				focus: false
			}
		},
		props:{
			buttonText: {
				type: String,
				default: '发送'
			},
			showMic: {
				type: Boolean,
				default: false
			},
			emoji: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			startRecognize: function () {
				var options = {};
				var that = this;
				options.engine = 'iFly';
				that.inputValue = "";
				plus.speech.startRecognize(options, function (s) {
					console.log(s);
					that.inputValue += s;
				}, function (e) {
					console.log("语音识别失败：" + e.message);
				});
			},
			sendMessge: function () {
				var that = this;
				if (that.inputValue.trim() == '') {
					plus.nativeUI.toast('内容不能为空')
					that.inputValue = '';
				} else {

					//点击发送按钮时，通知父组件用户输入的内容
					this.$emit('send-message', {
						type: 'text',
						content: that.inputValue
					});
					that.inputValue = '';
				}
			},
			// 展示表情
			show() {
				this.showPannel = !this.showPannel;
				this.$emit('show')
			},
			// 光标触发隐藏表情
			foc() {
				this.showPannel = false
				this.$emit('foc')
			},
			emotion(res) {
				let word = res.replace(/\#|\;/gi, '')
				const list = ['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷',
					'冷汗', '抓狂', '吐', '偷笑', '可爱', '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂', '疑问', '嘘', '晕', '折磨', '衰',
					'骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜',
					'菜刀', '西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电', '炸弹', '刀', '足球', '瓢虫',
					'便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引', '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻', '跳跳',
					'发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '挥手', '激动', '街舞', '献吻', '左太极', '右太极'
				]
				let index = list.indexOf(word)
				return `<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif" align="middle">`
			},
			handleEmotion(i) {
				this.inputValue += i

			}
		}
	}
</script>

<style>
	.footer {
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 80upx;
		min-height: 80upx;
		border-top: solid 1px #bbb;
		overflow: hidden;
		padding: 5upx;
		background-color: #fafafa;
	}
	
	.footer-left {
	
		width: 80upx;
		height: 80upx;
	
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.footer-right {
		width: 100upx;
		height: 80upx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #1482D1;
	}
	
	.footer-emotion {
		width: 60upx;
		height: 80upx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		color: #1482D1;
	}
	
	.footer-center {
		flex: 1;
		height: 80upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.footer-center .input-text {
		flex: 1;
		background: #fff;
		border: solid 1upx #ddd;
		padding: 10upx !important;
		font-family: verdana !important;
		overflow: hidden;
		border-radius: 15upx;
	}
	
	@font-face {
		font-family: 'iconfont';
		/* project id 1134039 */
		src: url('http://at.alicdn.com/t/font_1134039_uait6xu86bf.eot');
		src: url('http://at.alicdn.com/t/font_1134039_uait6xu86bf.eot?#iefix') format('embedded-opentype'),
			url('http://at.alicdn.com/t/font_1134039_uait6xu86bf.woff2') format('woff2'),
			url('http://at.alicdn.com/t/font_1134039_uait6xu86bf.woff') format('woff'),
			url('http://at.alicdn.com/t/font_1134039_uait6xu86bf.ttf') format('truetype'),
			url('http://at.alicdn.com/t/font_1134039_uait6xu86bf.svg#iconfont') format('svg');
	}
	
	.iconfont {
		font-family: "iconfont" !important;
		font-size: 18px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	
	.icon-face:before {
		content: "\e71c";
		font-size: 50upx;
	}
</style>
