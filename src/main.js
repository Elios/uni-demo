import Vue from 'vue'
import App from './App'
import faicon from './components/fa-icon/fa-icon'
import Axios from 'axios'

Vue.config.productionTip = false
Vue.component('fa-icon', faicon)

Vue.prototype.$axios = Axios

Vue.prototype.checkLogin = (backPage) => {
	const uid = uni.getStorageSync('uid')
	const signature = uni.getStorageSync('signature')
	const uname = uni.getStorageSync('uname')
	if(uid === '' || signature === '' || uname === ''){
		uni.navigateTo({
			url: '../../pages/login/login?backPage='+backPage,
			success: res => {},
			fail: () => {},
			complete: () => {}
		})
		return false
	}
	return {uid}
}

Vue.prototype.apiServer = 'http://39.86.250.123:3000/api/'
Vue.prototype.staticServer = 'http://39.86.250.123:3000'

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
