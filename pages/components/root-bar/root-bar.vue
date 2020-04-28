<template>
	<!-- 底部导航栏 -->
	<view class="pro-navbar cu-bar tabbar bg-black">
		<view :class="'action ' + (homeSelected ? 'text-green' : 'text-gray')" @click="showTab(0)">
			<view class="cuIcon-homefill"></view> 
			<text>首页</text>
		</view>
		<view :class="'action ' + (cateSelected ? 'text-green' : 'text-gray')" @click="showTab(1)">
			<view class="cuIcon-community"></view>
			<text>社区</text>
		</view>
		<view class="action text-gray add-action">
			<button class="cu-btn cuIcon-add bg-green shadow"></button>
			<text>发布</text>
		</view>
		<view :class="'action ' + (carSelected ? 'text-green' : 'text-gray')" @click="showTab(2)">
			<view class="cuIcon-record">
				<view class="cu-tag badge">99</view>
			</view>
			<text>我的课程</text>
		</view>
		<view :class="'action ' + (mineSelected ? 'text-green' : 'text-gray')" @click="showTab(3)">
			<view class="cuIcon-my">
				<view class="cu-tag badge"></view>
			</view>
			<text>个人中心</text>
		</view>
	</view>
</template>

<script>
	const selectedStatus = ['homeSelected', 'cateSelected', 'carSelected', 'mineSelected'];
	
	export default {
		props: {
			currentIndex: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				homeSelected: true,
				cateSelected: false,
				carSelected: false,
				mineSelected: false
			}
		},
		watch: {
			currentIndex() {
				this.setSelectStatus(this.currentIndex);
			}
		},
		methods: {
			showTab: function(index) {
				this.setSelectStatus(index);
				this.$emit('changePage', index);
			},
			setSelectStatus(index) {
				selectedStatus.map((item, i) => {
					if (i == index) {
						this[selectedStatus[index]] = true;
					} else {
						this[selectedStatus[i]] = false;
					}
				});
			}
		}
	}
</script>

<style>
	.pro-navbar {
		position: fixed;
		width:100%;
		bottom:0;
		left: 0;
		right: 0;
		z-index: 999;
	}
</style>
