<template>
	<view>
		<qit-list-scroll :listType="1">
			<view class="cu-card case" :class="isCard?'no-card': ''">
				<view class="cu-item shadow">
					<view class="image">
						<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
						 mode="widthFix"></image>
						<view class="cu-tag bg-blue">史诗</view>
						<view class="cu-bar bg-shadeBottom"> <text class="text-cut">我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。</text></view>
					</view>
					<view class="cu-list menu-avatar">
						<view class="cu-item">
							<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
							<view class="content flex-sub">
								<view class="text-grey">正义天使 凯尔</view>
								<view class="text-gray text-sm flex justify-between">
									十天前
									<view class="text-gray text-sm">
										<text class="cuIcon-attentionfill margin-lr-xs"></text> 10
										<text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
										<text class="cuIcon-messagefill margin-lr-xs"></text> 30
									</view>
								</view>
							</view>
						</view>
					</view>
					<!--添加进度条-->
					<view class="bg-white padding">
						<view class="cu-steps">
							<view class="cu-item" :class="index>num?'':'text-blue'" v-for="(item,index) in numList" :key="index">
								<text class="num" :class="index==2?'err':''" :data-index="index + 1"></text> {{item.name}}
							</view>
						</view>
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
				isCard: true,
				numList: [{
					name: '开始'
				}, {
					name: '等待'
				}, {
					name: '错误'
				}, {
					name: '完成'
				}, ],
				num: 0,
			}
		},
		components: {
			qitListScroll
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
