<template>
	<view>
		<view class="header">
			<view class="bg">
				<view class="box">
					<view class="box-hd">
						<view class="avator">
							<img :src="avatorItem.imgUrl">
						</view>
						<view class="phone-number">{{avatorItem.phoneNumber}}</view>
					</view>
					<view class="box-bd">
						<view class="item" v-for="(item, index) in boxItems" :key="index">
							<view class="icon"><img :src="item.url" /></view>
							<view class="text">{{item.title}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="list-content">
			<view class="list" v-for="(menuGroup, index) in menuItems" :key="index">
				<view :class="'li ' + (index==0 || index==menuItems.length ? 'noborder': '')" v-for="(item, i) in menuGroup.items" :key="i">
					<view class="icon">
						<img :src="item.iconUrl"/>
					</view>
					<view class="text">{{item.title}}</view>
					<img class="to" :src="toIconUrl"/>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				avatorItem: {
					phoneNumber: "我是芋头",
					imgUrl: "static/user/face.jpg"
				},
				boxItems: [
					{
						id: 0,
						title: "我的通知",
						url: "static/user/message.png"
					},
					{
						id: 1,
						title: "我的收藏",
						url: "static/user/favorite.png"
					},
					{
						id: 2,
						title: "我的客服",
						url: "static/user/service.png"
					}
				],
				menuItems: [
					{
						id: 0,
						items: [
							{
								id: 0,
								title: "我的名片",
								iconUrl: "static/user/card.png",
							}
						],
					},
					{
						id: 1,
						items: [
							{
								id: 0,
								title: "主题切换",
								iconUrl: "static/user/skin.png",
							},
							{
								id: 1,
								title: "帮助中心",
								iconUrl: "static/user/help.png",
							},
							{
								id: 2,
								title: "关于我们",
								iconUrl: "static/user/about.png",
							},
							{
								id: 3,
								title: "意见反馈",
								iconUrl: "static/user/opinion.png",
							}
						]
					},
					{
						id: 2,
						items: [
							{
								id: 0,
								title: "系统设置",
								iconUrl: "static/user/set.png",
							}
						],
					},
				],
				toIconUrl: "static/user/to.png"
			};
		},
		onLoad() {
		},
		methods: {
			changeSkin(){
				uni.navigateTo({
						url: '../skin-change/skin-change'
				});
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color:#f1f1f1;
	font-size: 30upx;
}
.header{
	background: #fff;
	height: 290upx;
	padding-bottom: 110upx;
	.bg{
		width: 100%;
		height:200upx;
		padding-top:100upx;
		background-color:#4191ea;
	}
}
.box{
	width: 650upx;
	height: 280upx;
	position: relative;
	border-radius: 20upx;
	margin: 0 auto;
	background: #fff;
	box-shadow: 0 5upx 20upx 0upx rgba(0, 0, 150, .2); 
	.box-hd{
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: center;
		.avator{
			width: 160upx;
			height: 160upx;
			background: #fff;
			border: 5upx solid #fff;
			border-radius: 50%;
			margin-top: -80upx;
			overflow: hidden;
			img{
				width: 100%;
				height: 100%;
			}
		}
		.phone-number{
			width: 100%;
			text-align: center;
		}
	}
	.box-bd{
		display: flex;
		flex-wrap: nowrap;
		flex-direction: row;
		justify-content: center;
		.item{
			flex: 1 1 auto;
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
			justify-content: center;
			border-right: 1px solid #f1f1f1;
			margin: 15upx 0;
			&:last-child{
				border: none;
			}
			.icon{
				width: 60upx;
				height: 60upx;
				img{
					width: 100%;
					height: 100%;
				}
			}
			.text{
				width: 100%;
				text-align: center;
				margin-top: 10upx;
			}
		}
	}
}
.list-content{
	background: #fff;
	padding-top: 100rpx;
}
.list{
	width:100%;
	border-bottom:15upx solid  #f1f1f1;
	background: #fff;
	&:last-child{
		border: none;
	}
	.li{
		width:92%;
		height:100upx;
		padding:0 4%;
		border-bottom:1px solid rgb(243,243,243);
		display:flex;
		align-items:center;
	&.noborder{
		border-bottom:0
		}
		.icon{
			flex-shrink:0;
			width:50upx;
			height:50upx;
			img{
				width:50upx;
				height:50upx;
			}
		}
		.text{
			padding-left:20upx;
			width:100%;
			color:#666;
		}
		.to{
			flex-shrink:0;
			width:40upx;
			height:40upx;
		}
	}
}
</style>
