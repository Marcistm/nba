<template>
<div>
  <el-form :inline="true" style="margin-top: 10px">
    <el-form-item label="item" >
      <el-input v-model="item"></el-input>
    </el-form-item>
    <el-form-item label="remark">
      <el-input v-model="remark" type="textarea" ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="success" @click="add">add</el-button>
    </el-form-item>
    <el-form-item label="item_number">
      <el-input v-model="work_number"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="search">search</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="data" v-if="tag" >
    <el-table-column label="item_number" prop="item_number" width="150"></el-table-column>
    <el-table-column label="item" prop="item">
      <template slot-scope="scope">
        <el-input v-model="scope.row.item" type="textarea" ></el-input>
      </template>
    </el-table-column>
    <el-table-column label="remark">
      <template slot-scope="scope">
        <el-input v-model="scope.row.remark" type="textarea" ></el-input>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="primary" @click="submit(scope.row)">save</el-button>
        <el-button type="danger" @click="del(scope.row.item_number)">delete</el-button>
      </template>

    </el-table-column>
  </el-table>
</div>
</template>

<script>
import axios from "axios";
import {MessageBox} from "element-ui";

export default {
  name: "Plan",
  data(){
    return{
      remark:'',
      item:'',
      edit_tag:false,
      dialog:false,
      work_number:'',
      tag:false,
      tooling_no:'',
      data:[],
      table:[{tooling_no: '',tooling_name:'',tooling_map:'',process_num:'',work_number:'',work_order_memo:'',oa_id:''}],
      dialog_form:{
        work_row_item:'',
        sub_map:'',
        comp_numbers:'',
        work_row_memo:''
      },
      options:[],
      map_options:[],

    }
  },
  methods:{

    del(number){
      MessageBox.confirm('Are you sure you want to delete it？', 'tip', {
        confirmButtonText: 'yes',
        cancelButtonText: 'no',
        type: 'warning'
      })
          .then(() => {
            let path='http://127.0.0.1:6325/del'
            let parmas={
              work_number:number
            }
            axios.get(path,{params:parmas}).then(res=>{
              if (res.data.code===200){
                this.$message.success('delete success')
                this.search()
              }
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: 'cancel'
            });
          });

    },
    add() {
      if (this.item === '') {
        this.$message.error('Please fill in the name of the item')
        return
      }
      let path = 'http://127.0.0.1:6325/create'
      let params = {
        item: this.item,
        remark: this.remark
      }
      axios.get(path,{params:params}).then(res => {
        this.$message.success('添加成功')
      })


    },
    search(){

        let path = 'http://127.0.0.1:6325/search'
        let paramas = {
          work_number:this.work_number
        }
        axios.get(path, {
          params: paramas
        }).then(res => {
          if (res.data.code===200){
            this.data = res.data.data
            this.tag = true
          }else {
            this.$message.error('not found')
          }

        })

    },
    submit(row){
      let path='http://127.0.0.1:6325/update'

      let params={item_number:row.item_number,item:row.item,remark:row.remark}
      axios.get(path,{params:params}).then(res=>{
        if (res.data.code===200){
            this.$message.success('save success')
        }
      })
    }

  },
}
</script>

<style scoped>

</style>
