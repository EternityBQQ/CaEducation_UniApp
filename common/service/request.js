import configUrl from './config.js'
const baseUrl = configUrl;

/**
 * 异步请求
 */
const sendResuest = (params, backPage) => {
	// 拼接完整请求地址
	var requestUrl = baseUrl + params.url;
	var method = params.method;
	var header = {};
	var data = params.data || {};
	var token = "";
	var hideLoading = params.hideLoading || false;
	
	//固定参数:仅仅在小程序绑定页面通过code获取token的接口默认传递了参数token = login
	if (!data.token) {	// 其他业务接口传递过来的参数中无token
		// 参数中无token时在本地缓存中获取
		token = uni.getStorageSync("token");
		console.log("当前无token: " + token);
		if (!token) {
			// 本地无token需重新登录(退出时清缓存token
			/* uni.navigateTo({
				url: backPage
			})
			return; */
		} else {
			data.token = token;
		}
	}
	
	var timestamp = Date.parse(new Date());//时间戳
	data["timestamp"] = timestamp;
	// #ifdef MP-WEIXIN
	data["device"] = "uniapp";
	data["ver"] = "1.0.0";
	// #endif
	// #ifdef APP-PLUS || H5
	data["device"] = "iosapp";
	data["ver"] = "1.0.0";
	// #endif
	
	//请求方式:GET或POST(POST需配置
	// header: {'content-type' : "application/x-www-form-urlencoded"}
	if (method) {
		method = method.toUpperCase(); // 全部大写
		if (method == 'POST') {
			header = {'content-type' : "application/x-www-form-urlencoded"};
		} else {
			header = {'content-type' : "application/json"};
		}
	} else {
		method = 'GET';
		header = {'content-type' : "application/json"};
	}
	return new Promise(function(resolve, reject) {
		uni.request({
			url: requestUrl,
			method: method,
			header:header,
			data:data,
			success: res => {
				if (res.statusCode && res.statusCode != 200) {
					// 请求出错
					uni.showModal({
						content:"请求失败,错误码:" + res.statusCode
					});
					return;
				}
				
				// 返回结果码code判断:0成功,1错误,-1未登录(未绑定/失效/被解绑)
				if (!res.data.status) {
					let code = res.data.status;
					if (code == '-1') {
						// 重新登录
						/* uni.navigateTo({
							url: backPage
						}) */
						return;
					} else if (code != '0') {
						uni.showModal({
							showCancel:false,
							content:"" + res.data.msg
						});
						return;
					}
				} else {
					uni.showModal({
						showCancel:false,
						content: "No resultCode: " + res.data.msg
					});
					return;
				}
				resolve(res.data.responseData);
				typeof params.success == "function" && params.success(res.data.responseData);
			},
			fail: (e) => {
				uni.showModal({
					content:"" + e.errMsg
				});
				reject(e.data);
				typeof params.fail == "function" && params.fail(e.data);
			},
			complete: () => {
				if (!hideLoading) {
					uni.hideLoading();
				}
				typeof params.complete == "function" && params.complete();
				return;
			}
		});
	});
}

export default {sendResuest};