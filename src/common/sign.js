import crypto from 'crypto'
import Axios from 'axios'
export default {
	sign(apiServer){
		Axios({
			url: apiServer+'/signature',
			data: '',
			method: 'GET'
		}).then((res) => {
			const md5 = crypto.createHash('md5')
			return md5.update(res.data.token).digest('hex')
		}).catch((e) => {
			console.log('jhf')
		})
	}
}