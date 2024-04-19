<template>
  <el-dialog :visible.sync="tag" >
    <el-form :inline="true">
      <el-form-item label="comment">
        <el-input type="textarea" autosize v-model="form.comment"></el-input>
      </el-form-item>
      <br>
      <el-form-item>
        <el-button type="primary" @click="submit">submit</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import {getUserName} from "@/utils/auth";
import axios from "axios";

export default {
  name: "ReportDialog",
  data(){
    return{
      evaluateId:'',
      tag:false,
      form:{
        comment:'',
      },
    }
  },
  methods:{
    submit(){
      let path='http://127.0.0.1:6325/write'
      let params={
        data:[
          {
            evaluateId:this.evaluateId,
            username:getUserName(),
            comment:this.form.comment
          }
        ],
        table:'evaluate_report',
      }
      axios.post(path,params).then(res=>{
        if (res.data.code===200){
          this.$message.success('success')
          this.tag=false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
