<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<!-- <el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getAdmins">查询</el-button>
				</el-form-item> -->
				<el-form-item>
					<el-button @click="getMember">Refresh List</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="members" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="phone" label="Phone" sortable/>
			<el-table-column label="Recipients" width="180">
				<template scope ="scope">
					<div class="grid-content bg-purple">
						<span>{{ onAddress(scope.row.address, scope.row.def).recipients}}</span>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="Address">
				<template scope ="scope">
					<div class="grid-content bg-purple">
						<span>{{ onAddress(scope.row.address, scope.row.def).address}}</span>
					</div>
				</template>
			</el-table-column>
			
		</el-table>
	</section>
</template>

<script>
	import Vue from 'vue';
	import util from '../../common/js/util'
	import querystring from 'querystring';
	import {mapState, mapActions} from 'vuex'
	//import NProgress from 'nprogress'

	export default {
		data() {
			return {
				filters     : {},
				members      : [],
				total       : 0,
				page        : 1,
				sels        : [],//列表选中列
				listLoading : false,
				addLoading  : false,
			}
		},
		computed : mapState({
			token   : state => state.User.token
		}),
		methods: {
			handleCurrentChange(val) {
				this.page = val;
				this.getMember();
			},
			onAddress(address, def) {
				if(address && address.length > 0) {
					return address[def];
				} else return {}
			},
			//获取管理员列表
			getMember() {
				this.listLoading = true;
				fetch(Vue.config.apiUrl + '/member?page='+this.page +'&per_page=1000',{
			        method : 'get',
			        headers : {
						'Content-Type' : 'application/x-www-form-urlencoded',
						'token'        : this.token
			        }
			      })
			      .then(response => response.json())
			      .then(result => {
			      	console.log('result', result);
					return new Promise((resolve, reject) => {
						this.total       = result.total;
						this.members      = result.data;
						this.listLoading = false;
					}, 1000);
			      })
			      .catch(err => {});
			},
			selsChange: function (sels) {
				this.sels = sels;
			}
		},
		beforeMount() {
			this.getMember();
		}
	}

</script>

<style scoped>

</style>