import Vue from 'vue'
import App from './App'
import faicon from './components/fa-icon/fa-icon'
import Axios from 'axios'

Vue.config.productionTip = false
Vue.component('fa-icon', faicon)

Vue.prototype.$axios = Axios

Vue.prototype.checkLogin = (backPage) => {
	const uid = uni.getStorageSync('uid')
	// const signature = uni.getStorageSync('signature')
	const uname = uni.getStorageSync('uname')
	if(uid === '' || uname === ''){
		uni.navigateTo({
			url: '../../pages/login/login?backPage='+backPage,
			success: res => {},
			fail: () => {},
			complete: () => {}
		})
		return false
	}
	return {uid, uname}
}

Vue.prototype.logout = (url) => {
	uni.clearStorageSync()
	uni.reLaunch({
		url: url
	})
}

Vue.prototype.apiServer = 'http://192.168.42.43:4000/api/'
Vue.prototype.staticServer = 'http://192.168.42.43:4000/'
Vue.prototype.chatServer = 'http://192.168.42.43:3000'

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
