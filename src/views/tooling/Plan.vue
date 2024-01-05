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
  <el-table :data="table" v-if="tag" >
    <el-table-column label="item_number" prop="tooling_no" width="150"></el-table-column>
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
        <el-button type="primary" @click="submit">save</el-button>
        <el-button type="danger" @click="del">delete</el-button>
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
      work_name_table:[],
      work_procedure_table:[],
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

    del(){
      MessageBox.confirm('确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
          .then(() => {
            let path='http://127.0.0.1:6325/tooling_process/del'
            let parmas={
              work_number:this.table[0].work_number
            }
            axios.get(path,{params:parmas}).then(res=>{
              if (res.data.code===200){
                this.$message.success('删除成功')
                this.tag=false
                this.work_number=''
              }
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });

    },
    add() {
      if (this.item === '') {
        this.$message.error('Please fill in the name of the project')
        return
      }
      let path = 'http://127.0.0.1:6325/to_do_list/create/submit'
      let params = {
        item: this.item,
        remark: this.remark
      }
      axios.post(path, params).then(res => {
        this.$message.success('添加成功')
      })
      this.tag = true

    },
    search(){
      if (this.work_number === ''&this.table[0].work_number==='') {
        this.$message.error('工单号未填')
      }else {
        let path = 'http://127.0.0.1:6325/tooling_process/plan/search'
        let paramas = {
          work_number:this.work_number
        }
        axios.get(path, {
          params: paramas
        }).then(res => {
          this.table[0].tooling_no = res.data.tooling_no
          this.table[0].tooling_name = res.data.tooling_name
          this.table[0].tooling_map = res.data.tooling_map
          this.table[0].process_num=res.data.process_num
          this.table[0].work_order_memo=res.data.work_order_memo
          this.table[0].oa_id=res.data.oa_id
          this.data = res.data.data

          this.tag = true
          this.$set(this.table[0], 'work_number', this.work_number)

        })
      }
    },
    submit(){
      let path='http://127.0.0.1:6325/tooling_process/create/submit'

      let params={header:this.table}
      axios.post(path,params).then(res=>{
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
