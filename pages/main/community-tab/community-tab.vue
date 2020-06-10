<template>
	<view class="index-page">
		<mescroll-uni
			ref="mescrollRef" 
			@init="mescrollInit" 
			top="0" 
			:down="downOption" @down="downCallback" 
			:up="upOption" @up="upCallback" 
			@emptyclick="emptyClick"
			v-if="articleData[0]">
			<!--标题文章-->
			<view class="cu-card dynamic" :class="isCard?'no-card':''" v-if="hotPost">
				<view class="cu-item shadow">
					<view class="cu-list menu-avatar">
						<view class="cu-item">
							<view class="cu-avatar round lg" :style="'background-image:url(' + hotPost.head_icon + ');'" />
							<view class="content flex-sub">
								<view>{{hotPost.username}}</view>
								<view class="text-gray text-sm flex justify-between">
									{{hotPost.public_time}}
								</view>
							</view>
						</view>
					</view>
					<view class="text-content">
						{{hotPost.post_content}}
					</view>
					<view class="grid flex-sub padding-lr" :class="isCard?'col-3 grid-square':'col-1'">
						<view class="bg-img" :class="isCard?'':'only-img'" :style="'background-image:url(' + hotPost.post_images[0] + ');'"
							v-for="(item,index) in isCard?9:1" :key="index">
						</view>
					</view>
					<view class="text-gray text-sm text-right padding">
						<text class="cuIcon-attentionfill margin-lr-xs"></text> 10
						<text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
						<text class="cuIcon-messagefill margin-lr-xs"></text> 30
					</view>
			
					<view class="cu-list menu-avatar comment solids-top">
						<view class="cu-item">
							<view class="cu-avatar round" style="background-image:url(https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png);"></view>
							<view class="content">
								<view class="text-grey">莫甘娜</view>
								<view class="text-gray text-content text-df">
									凯尔，你被自己的光芒变的盲目。
								</view>
								<view class="bg-grey padding-sm radius margin-top-sm  text-sm">
									<view class="flex">
										<view>凯尔：</view>
										<view class="flex-sub">妹妹，你在帮他们给黑暗找借口吗?</view>
									</view>
								</view>
								<view class="margin-top-sm flex justify-between">
									<view class="text-gray text-df">2018年12月4日</view>
									<view>
										<text class="cuIcon-appreciatefill text-red"></text>
										<text class="cuIcon-messagefill text-gray margin-left-sm"></text>
									</view>
								</view>
							</view>
						</view>
			
						<view class="cu-item">
							<view class="cu-avatar round" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
							<view class="content">
								<view class="text-grey">凯尔</view>
								<view class="text-gray text-content text-df">
									妹妹，如果不是为了飞翔，我们要这翅膀有什么用?
								</view>
								<view class="bg-grey padding-sm radius margin-top-sm  text-sm">
									<view class="flex">
										<view>莫甘娜：</view>
										<view class="flex-sub">如果不能立足于大地，要这双脚又有何用?</view>
									</view>
								</view>
								<view class="margin-top-sm flex justify-between">
									<view class="text-gray text-df">2018年12月4日</view>
									<view>
										<text class="cuIcon-appreciate text-gray"></text>
										<text class="cuIcon-messagefill text-gray margin-left-sm"></text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!--论坛文章-->
			<view class="cu-card article" :class="isCard?'no-card':''" v-if="articleData[0]" v-for="(item, index) in articleData" :key="index">
				<view class="cu-item shadow">
					<view class="title"><view class="text-cut">{{item.title}}</view></view>
					<view class="content">
						<image :src="item.imgUrl[0]" mode="aspectFill" />
						<view class="desc">
							<view class="text-content">{{item.post_content}}</view>
							<view>
								<view :class="'cu-tag bg-green light sm round'" v-for="(tag, index) in item.tags" :key="index">
									{{tag}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</mescroll-uni>
	</view>
</template>

<script>
	import downFlash from "@/pages/config/downFlash.js";
	
	export default {
		mixins: [downFlash], // 使用mixin (在main.js注册全局组件)
		data() {
			return {
				isCard: true,
				hotPost: null,
				articleData: []
			}
		},
		async created() {
			await this.getStoragePageData();
		},
		methods: {
			/**
			 * 页面加载数据
			 */
			async initPageData() {
				// 初始化社区交流信息模块
				await this.$request.sendResuest({
					url: "education/communityTab",
					method: "GET",
					data: {
						"pageDataSize": 10
					},
					hideLoading: true,
					success: (data) => {
						let pageData = data;
						uni.setStorage({
							key: 'education/communityTab?token=community',
							data: pageData,
							success: () => {
								console.log("社区交流模块数据存储成功!");
							}
						});
					}
				}, "/pages/main/main.vue");
			},
			async getStoragePageData() {
				var isExistKey = uni.getStorageSync("education/communityTab?token=community");
				if (isExistKey == "") {
					await this.initPageData();
				}
				// 从本地获取缓存数据
				uni.getStorage({
					key: "education/communityTab?token=community",
					success: res => {
						// 封装数据
						this.hotPost = res.data.hotPost,
						this.articleData = res.data.posts
					}
				});
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				var curPageData = this.articleData || [];
				curPageData.forEach(item => {
					// 单独处理代码
				});
				this.mescroll.endByPage(curPageData.length, curPageData.pages);
				this.dataList = this.dataList.concat(curPageData);
				if (this.dataList.length < 1) {
					this.mescroll.showEmpty()
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
