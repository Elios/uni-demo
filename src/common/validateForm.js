const validate = (...formData) => {
	const data = [...formData]
	if(!data) return false
	for(let d of data){
		console.log(Object.prototype.toString.call(d), d)
		if(Object.prototype.toString.call(d) === '[object Object]' || Array.isArray(d)){
			const keys = Object.keys(d)
			for(let key of keys){
				const value = d[key]
				console.log(key, value)
				if(Object.prototype.toString.call(value) === '[object Object]' || Array.isArray(value)){
					return validate(value)
				}
				console.log(value)
				if(value.toString().trim() === ''){
					return false
				}
			}
		}
		if(d.toString().trim() === ''){
			return false
		}
	}
	return true
}
export default {
	validate
}