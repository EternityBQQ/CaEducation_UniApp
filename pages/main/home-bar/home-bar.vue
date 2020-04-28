<template>
	<view class="index-page">
		<!--课程列表-->
		<qit-list-scroll class="pageScroll" :filterCondition="false" :courseList="courseList">
			<view class="action">
				<!--轮播图-->
				<view class="a-swiper-dot-active">
					<swiper class="card-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
					 :autoplay="true" interval="5000" duration="500" @change="cardSwiper" indicator-color="#8799a3"
					 indicator-active-color="#0081ff">
						<swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
							<view class="swiper-item">
								<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
								<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
							</view>
						</swiper-item>
					</swiper>
				</view>
				<!--分类页签-->
				<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
					<view class="cu-item" v-for="(item,index) in cuIconList" :key="index" v-if="index<gridCol*2">
						<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
							<view class="cu-tag badge" v-if="item.badge!=0">
								<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
							</view>
						</view>
						<text>{{item.name}}</text>
					</view>
				</view>
			</view>
		</qit-list-scroll>
	</view>
</template>

<script>
	import qitListScroll from '@/components/qit-list/qit-list-scroll.vue'
	
	export default {
		data() {
			return {
				// 分类标签
				cardCur: 0,
				cuIconList: [],
				modalName: null,
				gridCol: 4,
				gridBorder: false,
				menuBorder: false,
				menuArrow: false,
				menuCard: false,
				skin: false,
				listTouchStart: 0,
				listTouchDirection: null,
				// 轮播图
				swiperList: [],
				dotStyle: false,
				towerStart: 0,
				direction: '',
				// 课程列表
				courseList: []
			};
		},
		components: {
			qitListScroll
		},
		created() {
			// 初始化towerSwiper 传已有的数组名即可
			this.TowerSwiper('swiperList');
			// 初始化轮播图列表
			this.$request.sendResuest({
				url: "education/mediaOutPut",
				method: "GET",
				data: {
					token: ''
				},
				hideLoading: true,
				success: data => {
					let list = data;
					uni.setStorage({
						key:'education/mediaOutPut?token=home',
						data: list,
						success:() => {
							console.log("首页数据存取成功");
						}
					});
				}
			}, "/pages/main/main.vue");
			uni.getStorage({
				key: 'education/mediaOutPut?token=home',
				success: res => {
					// 封装数据
					this.swiperList = res.data.carouselList;
					this.cuIconList = res.data.categoryTag;
					this.courseList = res.data.courseList;
				}
			})
		},
		methods: {
			DotStyle(e) {
				this.dotStyle = e.detail.value
			},
			// cardSwiper
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			// towerSwiper
			// 初始化towerSwiper
			TowerSwiper(name) {
				let list = this[name];
				for (let i = 0; i < list.length; i++) {
					list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
					list[i].mLeft = i - parseInt(list.length / 2)
				}
				this.swiperList = list
			},
		
			// towerSwiper触摸开始
			TowerStart(e) {
				this.towerStart = e.touches[0].pageX
			},
		
			// towerSwiper计算方向
			TowerMove(e) {
				this.direction = e.touches[0].pageX - this.towerStart > 0 ? 'right' : 'left'
			},
		
			// towerSwiper计算滚动
			TowerEnd(e) {
				let direction = this.direction;
				let list = this.swiperList;
				console.log(list);
				if (direction == 'right') {
					let mLeft = list[0].mLeft;
					let zIndex = list[0].zIndex;
					for (let i = 1; i < this.swiperList.length; i++) {
						this.swiperList[i - 1].mLeft = this.swiperList[i].mLeft
						this.swiperList[i - 1].zIndex = this.swiperList[i].zIndex
					}
					this.swiperList[list.length - 1].mLeft = mLeft;
					this.swiperList[list.length - 1].zIndex = zIndex;
				} else {
					let mLeft = list[list.length - 1].mLeft;
					let zIndex = list[list.length - 1].zIndex;
					for (let i = this.swiperList.length - 1; i > 0; i--) {
						this.swiperList[i].mLeft = this.swiperList[i - 1].mLeft
						this.swiperList[i].zIndex = this.swiperList[i - 1].zIndex
					}
					this.swiperList[0].mLeft = mLeft;
					this.swiperList[0].zIndex = zIndex;
				}
				this.direction = ""
				this.swiperList = this.swiperList
			},
		}
	}
</script>

<style>
	.index-page {
		width: 100%;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
	.pageScroll {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
</style>
