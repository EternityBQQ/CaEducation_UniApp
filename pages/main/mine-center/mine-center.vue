<template>
	<view class="page">
		<login-user></login-user>
	</view>
</template>

<script>
	import loginUser from '@/pages/components/login-user/login-user.vue';
	
	export default {
		components: {
			loginUser
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
	.page {
		height: 100Vh;
		width: 100vw;
	}
	
</style>
