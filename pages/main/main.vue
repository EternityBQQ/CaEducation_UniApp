<template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<top-bar class="top-bar" pageContent="main" :isMineCenter="mineFlag"></top-bar>
		<!-- 内容渲染区 -->
		<view class="main-content">
			<swiper class="page-content" :style="{height: pageContentHeight + 'px'}" :disable-touch="disableTouch" @change="bindChange"
			 @touchstart="touchStart" :current="currentIndex">
				<swiper-item @touchmove="touchToPrevent">
					<home-bar v-if="showHome" ref="homeBar"></home-bar>
				</swiper-item>
				<swiper-item>
					<cate-tab v-if="showCate"></cate-tab>
				</swiper-item>
				<swiper-item>
					<car-tab v-if="showShopCar"></car-tab>
				</swiper-item>
				<swiper-item @touchmove="touchToPrevent">
					<mine-center v-if="showMine"></mine-center>
				</swiper-item>
			</swiper>
		</view>
		<view class="cu-modal" :class="modalName=='Image'?'show':''">
			<view class="cu-dialog">
				<view class="bg-img" style="background-image: url('https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg');height:200px;">
					<view class="cu-bar justify-end text-white">
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close "></text>
						</view>
					</view>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub  solid-left" @tap="hideModal">我知道了</view>
				</view>
			</view>
		</view>
		<!-- 底部导航栏 -->
		<view class="root-view" ref="root-bar">
			<root-bar class="root-bar" :currentIndex="currentIndex" @changePage="changePage"></root-bar>
		</view>
		<back-mask v-if="showMask"></back-mask>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import topBar from '../components/top-bar/top-bar.vue';
	import rootBar from '../components/root-bar/root-bar.vue';
	import homeBar from './home-bar/home-bar.vue';
	import cateTab from './community-tab/community-tab.vue';
	import carTab from './course-tab/course-tab.vue';
	import mineCenter from './mine-center/mine-center.vue';
	import backMask from '../components/back-mask/back-mask.vue';

	const pageHeight = uni.getSystemInfoSync().windowHeight;
	const pageSwitch = ['showHome', 'showCate', 'showShopCar', 'showMine'];

	export default {
		data() {
			return {
				showHome: true,
				showCate: false,
				showShopCar: false,
				showMine: false,
				mineFlag: true,
				disableTouch: false,

				currentIndex: 0,
				tabBarHeight: 0,
				topBarHeight: 0,
				showMask: false,
				modalName: null,

				// 判断滑动
				listTouchStart: 0,
				listTouchDirection: null
			}
		},
		mounted() {
			this.$nextTick(async function() {
				let _this = this;
				const selector = uni.createSelectorQuery().in(this);
				selector.select('.root-bar').fields({
					size: true
				});
				selector.exec(data => {
					this.tabBarHeight = data[0].height;
				});
				
				const topBarinfo = uni.createSelectorQuery().select(".top-bar");
				topBarinfo.boundingClientRect(function (data) {
					_this.topBarHeight = data.height;
				}).exec();
			});
		},
		onBackPress() {
			if (this.showMask) {
				this.showMask = false;
				return true;
			} else {
				// 弹框是否退出
				uni.showModal({
					title: '提示',
					content: '是否退出极光？',
					success: function(res) {
						if (res.confirm) {
							// 退出当前应用，改方法只在App中生效  
							plus.runtime.quit();
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				return true
			}
		},
		components: {
			homeBar,
			topBar,
			rootBar,
			cateTab,
			carTab,
			mineCenter,
			backMask
		},
		computed: {
			pageContentHeight() {
				return pageHeight - this.tabBarHeight - this.topBarHeight;
			}
		},
		methods: {
			touchStart(e) {
				this.listTouchStart = e.touches[0].pageX;
			},
			touchToPrevent(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left';
				var flag = false;
				var direction = null;
				// TODO 禁止首页和末页的滑动穿透
				if (this.currentIndex == 0) {
					direction = "right";
				} else if (this.currentIndex == 3) {
					direction = "left";
				}
				if (this.listTouchDirection == direction) {
					flag = true;
				} else {
					flag = false;
				}
				this.disableTouch = flag;
			},
			// 监听手势滑动切换页面
			bindChange(e) {
				console.log(this.$refs.homeBar.swiperList)
				this.currentIndex = e.detail.current;
				this.changePage(this.currentIndex);
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			changePage(index) {
				this.currentIndex = index;
				this[pageSwitch[this.currentIndex]] = true;
				// 如果是个人中心就不显示搜素框
				if (index == 3) {
					this.mineFlag = false;
				} else {
					this.mineFlag = true;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}

	.page-content {
		position: relative;
	}

	.root-view {
		height: auto;
	}
	
	.top-bar {
		height: auto;
	}
</style>
