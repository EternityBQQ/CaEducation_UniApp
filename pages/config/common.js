/**
 * 获取组件
 */
function getComponentRect(ref) {
	var view = uni.createSelectorQuery().select("." + ref);
	return view.boundingClientRect(data => {
		console(data.width);
	}).exec();
}

export {
	getComponentRect
}