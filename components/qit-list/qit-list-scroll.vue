<template>
	<!-- swiper中的transfrom会使fixed失效,此时用height固定高度 -->
	<!-- mescroll写在了子组件也无法使用mescroll-body, 只能用mescroll-uni ,因为在子组件中无法触发mescroll-mixins.js的onPageScroll和onReachBottom方法 -->
	<mescroll-uni 
		ref="mescrollRef" 
		@init="mescrollInit" top="0" 
		class="scorll-produnct"
		:down="downOption" @down="downCallback" 
		:up="upOption" @up="upCallback"
		@emptyclick="emptyClick">
		<!--自己扩充组件-->
		<slot></slot>
		<!--数据列表展示-->
		<qit-list 
			:filterCondition="filterCondition" 
			:listType="listType" 
			:list="courseList"></qit-list>
	</mescroll-uni>
</template>

<script>
	import downFlash from "@/pages/config/downFlash.js";
	import qitList from './qit-list.vue';
	
	export default {
		mixins: [downFlash], // 使用mixin (在main.js注册全局组件)
		components: {
			qitList
		},
		props: {
			filterCondition: {
				type: Boolean,
				default: false
			},
			listType: {
				type: Number,
				default: 2
			},
			courseList: {
				type: Array,
				default () {
					return [];
				}
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				var curPageData = this.courseList || []
				curPageData.forEach(item => {
					item.discountPrice = (item.discountPrice / 100).toFixed(2)
					item.salePrice = (item.salePrice / 100).toFixed(2)
				})
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
	.scorll-produnct {
		width: 100%;
	}
</style>
