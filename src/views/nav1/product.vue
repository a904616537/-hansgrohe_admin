<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<!-- <el-input v-model="filters.name" placeholder="姓名"></el-input> -->
					<el-button @click="getProduct">Refresh List</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="createProduct">Create Product</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<template>
			<el-table :data="products" highlight-current-row v-loading="loading" style="width: 100%;">
				<el-table-column type="index" width="60">
				</el-table-column>
				<el-table-column prop="product_no" label=".No" width="120">

				</el-table-column>
				<el-table-column prop="item" label="Product">
					<template scope ="scope">
						<div class="imgdiv" v-for="(item, index) in scope.row.item" :key="index">
							<el-row :gutter="20">
								<el-col :span="8">
									<img :src="item.img" style="height: 80px;margin: 5px;" />
								</el-col>
								<el-col :span="8">
									<p>{{item.name}}</p>
								</el-col>
								<el-col :span="8">
									<p>{{item.name}}</p>
								</el-col>
							</el-row>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="order" label="Order" width="100" sortable>
					<template scope ="scope">
						<el-select
						value-key="order"
						v-model="scope.row.order"
						placeholder="Please select a">
							<el-option
							v-for="item in orders"
							:key="item"
							:label="item"
							:value="item">
							</el-option>
						</el-select>
					</template>
				</el-table-column>
				<el-table-column label="Action" width="150">
					<template scope="scope">
						<el-button type="info" style="margin: 3px auto;" size="small" @click="onEditor(scope.$index, scope.row)">Editor</el-button>
						<el-button type="danger" style="margin: 3px auto;" size="small" :disabled="scope.row.audit" @click="handleDel(scope.$index, scope.row)">Delete</el-button>
					</template>
				</el-table-column>
			</el-table>

			<!--新增界面-->
			<el-dialog title="Edit Product Details" v-model="addFormVisible" :close-on-click-modal="false">
				<!-- 产品详情编辑 -->
				<el-row>
					<el-col :span="24"><div class="grid-content bg-purple"><h1>Product Details</h1></div></el-col>
				</el-row>
				<el-card class="box-card">
					<el-row>
						<el-col :span="4"><div class="grid-content bg-purple"><p>NO:</p></div></el-col>
						<el-col :span="8">
							<el-input v-model="form.product_no" placeholder="Please enter product no"></el-input>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="4"><div class="grid-content bg-purple"><p>Order:</p></div></el-col>
						<el-col :span="8">
							<el-select
							value-key="order"
							v-model="form.order"
							placeholder="Please select a">
								<el-option
								v-for="item in orders"
								:key="item"
								:label="item"
								:value="item">
								</el-option>
							</el-select>
						</el-col>
					</el-row>
				</el-card>

				<el-row>
					<el-col :span="24"><div class="grid-content bg-purple"><h1>Product Images</h1></div></el-col>
				</el-row>
				<v-upload v-for="(item, index) in form.item" :key="index" :index="index" :pro="item" :onSubmit="onSubmit"/>
				<el-card>
					<el-row>
						<el-col :span="24">
							<div @click="addProduct" class="grid-content bg-purple-dark">
								<i class="el-icon-plus">Add Product</i>
							</div>
						</el-col>
					</el-row>
				</el-card>
				<el-card>
					<v-editor
					id      = "editor"
					v-model = "form.content"
					></v-editor>
				</el-card>
				
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="addFormVisible = false">Cancel</el-button>
					<el-button type="primary" @click.native="addSubmit" :loading="addLoading">Submit</el-button>
				</div>
			</el-dialog>

		</template>

	</section>
</template>
<script>
	import Vue         from 'vue';
	import querystring from 'querystring';
	import {VueEditor} from 'vue2-editor';
	import {mapState, mapActions} from 'vuex'
	import Upload from '../../components/product_upload'
	export default {
		data() {
			return {
				_id : null,
				form : {
					content    : '',
					product_no : '',
					order      : 10,
					item       : [{
						name  : '',
						desc  : '',
						img   : '',
						price : 0,
						order : 10
					}]
				},
				uploadUrl      : Vue.config.uploadUrl,
				loading        : false,
				total          : 0,
				addFormVisible : false,
				addLoading     : false,
				filters        : {},
				fileList       : [],
				products       : [],
				orders         : [0, 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
			}
		},
		components: {
			'v-upload' : Upload,
			'v-editor' : VueEditor
		},
		computed : mapState({
			token : state => state.User.token
		}),
		methods: {
			onSubmit(index, data) {
				this.form.item.splice(index, 1, data);
			},
			addProduct() {
				this.form.item.push({
					name  : '',
					desc  : '',
					img   : '',
					price : 0,
					order : 10
				})
			},
			onSeletct(_id, key, value) {
				if(this.loading) return;
				let body = querystring.stringify({_id, value, key});
				fetch(Vue.config.apiUrl + '/product',{
						method         : 'put',
						headers        : {
						'Content-Type' : 'application/x-www-form-urlencoded'
					},
					body
				})
				.then(response     => response.json())
				.then(result       => {
					console.log('result', result)
					if(result.status) {
						this.$message({
							type    : 'success',
							message : 'Success'
						});
						// this.getPicture();
					} else {
						this.$message({
							type    : 'error',
							message : 'Failure'
						});
					}
				})
				.catch(err => {});
			},
			getProduct() {
				let para = {
					page: this.page
				};
				this.loading = true;
				fetch(Vue.config.apiUrl + '/product',{
			        method : 'get',
			        headers : {
			          'Content-Type' : 'application/x-www-form-urlencoded'
			        }
			      })
			      .then(response => response.json())
			      .then(result => {
					return new Promise((resolve, reject) => {
						this.total    = result.total;
						this.products = result.data;
						this.loading  = false;
					}, 5000);
			      })
			      .catch(err => {
			      	this.loading  = false;
			      	console.log('获取商品出错', err)
			      });
			},
			editProduct(obj, method) {

				this.addLoading = true;
				const body = querystring.stringify(obj);
				fetch(Vue.config.apiUrl + '/product',{
			        method : method,
			        headers : {
			          'Content-Type' : 'application/x-www-form-urlencoded'
			        },
			        body : body
				})
				.then(response => response.json())
				.then(result => {
					this.addLoading = false;
					this.$message({
						type    : 'success',
						message : 'Success'
					});
					this._id = null;
					this.addFormVisible = false;
					this.getProduct();
				})
				.catch(err => {
					this.loading  = false;
					this.$message({
						type    : 'error',
						message : 'Failure'
					});
				})
			},
			addSubmit() {
				let method = 'post';
				let data = {
					content    : this.form.content,
					product_no : this.form.product_no,
					order      : this.form.order
				};
				if(this._id) {
					data._id = this._id;
					method = 'put';
				};
				data.item = JSON.stringify(this.form.item);

				this.editProduct(data, method)
			},
			onEditor(index, row) {
				this._id = row._id;
				console.log('row', row)
				this.form = row;
				this.addFormVisible = true;
			},
			handleDel(index, row) {
				this.loading = true;
				const body = querystring.stringify({_id : row._id});
				fetch(Vue.config.apiUrl + '/product',{
			        method : 'delete',
			        headers : {
			          'Content-Type' : 'application/x-www-form-urlencoded'
			        },
			        body : body
				})
				.then(response => response.json())
				.then(result => {
					this.$message({
						type    : 'success',
						message : 'Success'
					});
					this.getProduct();
				})
				.catch(err => {
					console.log('err', err)
					this.loading = false;
					this.$message({
						type    : 'error',
						message : 'Failure'
					});
				})
			},
			handleRemove(file, fileList) {
				this.fileList = fileList;
			},
			createProduct() {
				this.addFormVisible = true;
				this._id = null;
				this.form = {
					content    : '',
					product_no : '',
					order      : 10,
					item       : [{
						name  : '',
						desc  : '',
						img   : '',
						price : 0,
						order : 10
					}]
				};
			}
		},
		mounted() {
			this.getProduct();
		}
	};

</script>

<style scoped>
.imgdiv{
	position : relative;
	overflow : hidden;
}
.defimg {
	position      : absolute;
	right         : -15px;
	top           : -6px;
	width         : 40px;
	height        : 24px;
	background    : #13ce66;
	text-align    : center;
	-ms-transform : rotate(45deg);
	transform     : rotate(45deg);
	box-shadow    : 0 0 1pc 1px rgba(0,0,0,.2);
}
.defimg i {
	color         : #fff;
	font-size     : 11px;
	margin-top    : 11px;
	-ms-transform : rotate(-45deg) scale(.8);
	transform     : rotate(-45deg) scale(.8);
}
.add_dev{border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;}
.add_icon{
	font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
</style>

