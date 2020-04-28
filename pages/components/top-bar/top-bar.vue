<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="back">
			<block slot="backText" v-if="back">返回</block>
			<block slot="content">长安教育</block>
		</cu-custom>
		<!-- 顶部导航栏 -->
		<view class="cu-bar search bg-white" v-if="isMineCenter">
			<view class="cu-avatar round" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big11010.jpg"></view>
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索图片、文章、视频" confirm-type="search"></input>
			</view>
			<view class="action">
				<text>广州</text>
				<text class="cuIcon-triangledownfill"></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				back: true
			}
		},
		props: {
			pageContent: {
				type: String
			},
			isMineCenter: {
				type: Boolean,
				default: true
			}
		},
		mounted() {
			if (this.pageContent == 'main') {
				this.back = false;
			}
		},
		methods: {
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			}
		}
	}
</script>

<style>

</style>
