export default async function({url, method = 'GET', data = {}} = {}) {
	const promise = await new Promise((resolve, reject) => {
		uni.request({
			url: url,
			method: method,
			data: data,
			success: res => {
				resolve(res)
			},
			fail: () => {
				reject(new Error('获取数据失败'))
			}
		})
	})
	return promise
}