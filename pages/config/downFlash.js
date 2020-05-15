import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";

const downFlash = {
	mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
	data() {
		return {
			mescroll: null,
			downOption: {
				auto: false, // 不自动加载
				use: false
			},
			upOption: {
				auto: false, // 不自动加载
				noMoreSize: 1, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
				empty: {
					tip: '暂无相关数据' // 提示
				}
			},
			dataList: [], //列表数据
			isInit: false, // 列表是否已经初始化
			scrollY: 0,
		}
	},
	mounted() {
		this.mescroll.triggerDownScroll();
	},
	methods: {
		// mescroll组件初始化的回调,可获取到mescroll对象
		mescrollInit(mescroll) {
			this.mescroll = mescroll;
		},
		/*下拉刷新的回调 */
		downCallback() {
			// 这里加载你想下拉刷新的数据, 比如刷新轮播数据
			// loadSwiper();
			// 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
			this.dataList = []
			this.mescroll.resetUpScroll()
		},
		//点击空布局按钮的回调
		emptyClick() {
	
		},
		nativeto(item) {
			uni.setStorageSync("goods", item)
			uni.navigateTo({
				url: "../goodsDetail/goodsDetail?id=" + item.id
			})
		}
	}
}

export default downFlash;