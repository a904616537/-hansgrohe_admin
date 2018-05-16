<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-button @click="getRegistered">Refresh List</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="buyproduct" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column type="expand" label="Details">
				<template scope="props">

					<!--列表-->
					<el-table :data="[props.row]" highlight-current-row style="width: 100%;">
						<el-table-column type="index" width="60">
						</el-table-column>
						<el-table-column prop="size" label="Household Size" width="150"/>
						<el-table-column prop="water" label="Hardness" width="100"/>
						<el-table-column prop="life" label="Lifespan" width="100"/>
						<el-table-column label="Install Ation Date">
							<template scope ="scope">
								<div class="grid-content bg-purple">
									<span>{{ moment(scope.row.setdate) }}</span>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="Replacement Date">
							<template scope ="scope">
								<div class="grid-content bg-purple">
									<span>{{ moment(scope.row.setdate) }}</span>
								</div>
							</template>
						</el-table-column>
					</el-table>

				</template>
			</el-table-column>
			<el-table-column prop="number" label="Product Number" sortable/>
			<el-table-column prop="person.name" label="Person" width="150" sortable/>
			<el-table-column prop="phone" label="Phone" width="150"/>
			<el-table-column prop="person.postcode" label="Post Code" width="120" />
			
			<el-table-column label="Address" min-width="180">
				<template scope ="scope">
					<div class="grid-content bg-purple">
						<span>{{ scope.row.person.province + ' , ' + scope.row.person.city + ' , ' + scope.row.person.address }}</span>
					</div>
				</template>
			</el-table-column>
			
			<!-- <el-table-column label="Action" width="300">
				<template scope="scope">
					<el-button type="danger" size="small" :disabled="scope.row.audit" @click="handleDel(scope.$index, scope.row)">Delete</el-button>
				</template>
			</el-table-column> -->
		</el-table>

	</section>
</template>

<script>
	import Vue         from 'vue';
	import util        from '../../common/js/util';
	import moment      from 'moment';
	import querystring from 'querystring';
	import {
		mapState,
		mapActions
	} from 'vuex'
	//import NProgress from 'nprogress'

	export default {
		data() {
			return {
				filters     : {},
				buyproduct       : [],
				total       : 0,
				page        : 1,
				sels        : [],//列表选中列
				listLoading : false,
				addLoading: false,
			}
		},
		computed : mapState({
			token   : state => state.User.token
		}),
		methods: {
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			moment(date) {
				return moment().format('YYYY-MM-DD  h:mm:ss a');
			},
			getRegistered() {
				this.listLoading = true;
				console.log('this.token', this.token)
				fetch(Vue.config.apiUrl + '/buyproduct?page='+this.page +'&per_page=1000',{
					method  : 'get',
					headers : {
						'Content-Type' : 'application/x-www-form-urlencoded',
						'token'        : this.token
			        }
			      })
			      .then(response => response.json())
			      .then(result => {
					return new Promise((resolve, reject) => {
						console.log('result user', result)
						this.total       = result.total;
						this.buyproduct  = result.data;
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
			this.getRegistered();
		}
	}

</script>

<style scoped>

</style>