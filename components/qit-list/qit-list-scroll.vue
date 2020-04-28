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
			
		}
	}
</script>

<style lang="scss" scoped>
	.scorll-produnct {
		width: 100%;
	}
</style>
