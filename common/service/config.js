/**
 * 网络请求地址配置
 */
let url_config = "";

if (process.env.NODE_ENV === 'development') {
	// 开发环境
	url_config = 'http://39.97.231.147:8080/'
} else {
	// 生产环境
	url_config = 'http://39.97.231.147:8080/'
}

export default url_config;