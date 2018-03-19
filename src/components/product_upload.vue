<template>
	<el-card>
		<el-row>
			<el-col :span="8">
			<el-upload
			class     = "upload-demo"
			list-type = "picture-card"
			:limit     = "1"
			:action    = "uploadUrl"
			:multiple  = "false"
  			:show-file-list="false"
			:on-success= "onSuccess">
				<img v-if="data.img" :src="data.img" class="avatar">
				<i v-else class="el-icon-plus add_icon"></i>
			</el-upload>
			</el-col>
			<el-col :span="16">
				<el-row>
					<el-col :span="4"><div class="grid-content bg-purple"><p>Name:</p></div></el-col>
					<el-col :span="8">
						<el-input v-model="data.name" @change="disabled = false" placeholder="Please enter product name"></el-input>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="4"><div class="grid-content bg-purple"><p>Price:</p></div></el-col>
					<el-col :span="8">
						<el-input-number @change="disabled = false" v-model="data.price" :min="0" label="Please enter price"></el-input-number>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="4"><div class="grid-content bg-purple"><p>Describe:</p></div></el-col>
					<el-col :span="8">
						<el-input @change="disabled = false" v-model="data.desc" placeholder="Please enter product describe"></el-input>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-button type="primary" @click.native="onDetermine" :disabled="disabled" :loading="addLoading">Determine</el-button>
					</el-col>
				</el-row>
			</el-col>
		</el-row>
	</el-card>
</template>
<script>
	import Vue from 'vue';
	export default {
		data() {
			return {
				disabled   : false,
				addLoading : false,
				uploadUrl  : Vue.config.uploadUrl,
				data : {
					name       : this.pro.name,
					desc       : this.pro.desc,
					img        : this.pro.img,
					price      : this.pro.price,
				},
				backup : {}
			}
		},
		props : {
			index : {
				type    : Number,
				default : 0
			},
			pro : {
				type    : Object,
				default : () =>{return {}}
			},
			onRemove : {
				type    : Function,
				default : () => {console.log('delete')}
			},
			onSubmit : {
				type : Function,
				default : () => {console.log('on submit')}
			}
		},
		methods: {
			onSuccess(data, file) {
				this.disabled = false;
				this.data.img = data.msg
			},
			onDetermine() {
				this.disabled = true;
				this.onSubmit(this.index, this.data)
			}
		},
		watch: {
			pro(val, oldval) {
				console.log('created')
				this.data = {
					name  : this.pro.name,
					desc  : this.pro.desc,
					img   : this.pro.img,
					price : this.pro.price,
				}
			}
		}
	};

</script>

<style scoped>
.add_dev{border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;}
.add_icon{
	font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
}
.avatar {
	width: 150px;
    height: 150px;
    display: block;
}
</style>

