<template>
<div>
  <el-form :inline="true">
    <el-form-item>
      <el-date-picker
          v-model="time"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="to"
          start-placeholder="start"
          end-placeholder="end">
      </el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="search('user')">search</el-button>
    </el-form-item>
    <el-form-item>
      <el-button v-permission="['admin']" type="primary" @click="search('admin')">admin search</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="data" v-if="tag">
    <el-table-column v-if="type==='admin'" label="username" prop="username"></el-table-column>
    <el-table-column label="comment" prop="comment">
      <template slot-scope="scope">
        <el-input v-if="type==='user'" type="textarea" autosize v-model="scope.row.comment"></el-input>
        <span v-else>{{scope.row.comment}}</span>
      </template>
    </el-table-column>
    <el-table-column label="time" prop="time"></el-table-column>
    <el-table-column label="operation">
      <template slot-scope="scope">
      <el-button type="primary" v-if="type==='user'" @click="save(scope.row)">change</el-button>
      <el-button type="danger" @click="del(scope.row.id,scope.$index)">delete</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import {del, save} from "@/api/api";
import {getUserName} from "@/utils/auth";
import axios from "axios";
import { convertColsToNumber} from "@/utils/util";

export default {
  name: "Rating",
  data(){
    return{
      type:'',
      tag:false,
      data:[],
      time:[]
    }
  },
  methods:{
    save(row){
      save(row,'evaluate_report')
      this.$message.success('change success')
    },
    search(type){
      this.type=type
      this.tag=false
      let path='http://127.0.0.1:6325/report/search'
      let params={
        username:getUserName()
      }
      if (this.time){
        params['start']=this.time[0]
        params['end']=this.time[1]
      }
      if (type==='admin'){
        params['username']=''
      }
      axios.get(path,{params:params}).then(res=>{
        if (res.data.code===200){
          this.data=res.data.data
          this.tag=true
        }
      }).catch(error => {
        this.$message.error('no data')
        console.log(error)
      })
    },
    del(id,index){
      this.$confirm('Are you sure you want to delete it', 'tip', {
        cancelButtonText: 'cancel',
        confirmButtonText: 'confirm',
        type: 'warning'
      }).then(() => {
        del(id,index,'evaluate_report',this.data)
        this.$notify({
          title: 'success',
          message: 'delete success',
          type: 'success',
          duration: 2000
        })
      }).catch(() => {
        // 取消执行
      });
    },
  }
}
</script>

<style scoped>

</style>
