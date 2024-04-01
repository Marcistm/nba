<template>
<div>

  <el-form :inline="true" style="margin-top: 10px">
    <el-date-picker
        v-model="value1"
        type="date"
        placeholder="Date">
    </el-date-picker>
  </el-form>


</div>
</template>

<script>
import axios from "axios";
import {getUserName, removeToken} from "@/utils/auth";
import {getWorkNameTable} from "@/api/api";
export default {
  name: "Report",
  data(){
    return{
      row:'',
      num_table:[{num:'',finish_num:"",scrap_num:''}],
      num_tag:false,
      data:[],
      work_number:'',
      work_procedure:'',
      work_name_table:[],
    }
  },methods:{

    start(row){
      this.$confirm('是否开始加工', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        // 执行 "report" 函数
        let path='http://127.0.0.1:6325/tooling_process/report/start'
        let params={
          work_row_item:row.work_row_item,number:row.number,worker:row.worker,
        }

        axios.get(path,{params:params}).then(res=>{
          if (res.data.code===200){
            this.$message.success(res.data.msg)
            this.search()
          }
        })
      }).catch(() => {
        // 取消执行
      });

    },

    search(){
      if(this.work_number===''){
        this.$message.error('请填写工单号')
        return
      }
      let username=getUserName()
      let path='http://127.0.0.1:6325/tooling_process/report/search'
      let params={
        work_number:this.work_number,
        work_procedure:this.work_procedure,
        worker:username
      }
      axios.get(path,{params:params}).then(res=>{
        this.data=res.data.data
        this.data.forEach(item=>{
          item['worker']=username
        })
      })
    },
    end(row){
        const startPath = 'http://127.0.0.1:6325/tooling_process/report/end';
        const startParams = {
          work_row_item: row.work_row_item,
          number: row.number,
          worker: row.worker,
          work_procedure: row.work_procedure,
        };
        axios.get(startPath, {params:startParams}).then(res=>{
          if (res.data.code === 200) {
            this.$message.success(res.data.msg);
            this.search()
          }
        })
    },
  },
  mounted() {
    getWorkNameTable()
        .then((data) => {
          this.work_name_table = data;
        })
  }
}
</script>

<style scoped>

</style>
