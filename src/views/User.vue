<template>
<el-table :data="data">
<el-table-column label="username" prop="username"></el-table-column>
  <el-table-column label="name" prop="name"></el-table-column>
  <el-table-column label="privilege" prop="privilege">
    <template slot-scope="scope">
      <span v-if="scope.row.privilege===0">ban</span>
      <span v-if="scope.row.privilege===1">user</span>
      <span v-if="scope.row.privilege===2">admin</span>
    </template>
  </el-table-column>
  <el-table-column label="like" prop="like"></el-table-column>
  <el-table-column label="dislike" prop="dislike"></el-table-column>
  <el-table-column label="report" prop="report"></el-table-column>
  <el-table-column label="operation" width="350">
    <template slot-scope="scope">
      <el-button type="danger" @click="resetPassword(scope.row.id)">reset password</el-button>
      <el-button type="danger" @click="del(scope.row.id,scope.$index)">delete</el-button>
      <el-button type="danger" v-if="scope.row.privilege!==0" @click="ban(scope.row,'ban')">ban</el-button>
      <el-button type="danger" v-else @click="ban(scope.row,'unlock')">unlock</el-button>
    </template>
  </el-table-column>
</el-table>
</template>

<script>
import axios from "axios";
import {del, save} from "@/api/api";

export default {
  name: "User",
  data(){
    return{
      data:[]
    }
  },
  methods:{
    resetPassword(id){
      this.$confirm('Are you sure you want to reset password for this user', 'tip', {
        cancelButtonText: 'cancel',
        confirmButtonText: 'confirm',
        type: 'warning'
      }).then(() => {
        save({ id: id, password:'2b2786d75fe0463ed7a764532695dae0',has_login:0}, 'sys_user')
        this.$message.success('success')
      }).catch(() => {
        // 取消执行
      });
    },
    ban(row, type) {
        this.$confirm('Are you sure you want to ' + type + ' this user', 'tip', {
          cancelButtonText: 'cancel',
          confirmButtonText: 'confirm',
          type: 'warning'
        }).then(() => {
        row.privilege = type === 'ban' ? 0 : 1
        save({ id: row.id, privilege:row.privilege}, 'sys_user')
        this.$message.success('change success')
        }).catch(() => {
          // 取消执行
        });
    },
    search(){
      let path='http://127.0.0.1:6325/user/search'
      axios.get(path).then(res=>{
        if (res.data.code===200){
          this.data=res.data.data
          console.table(this.data)
        }
      })
    },
    del(id,index){
      this.$confirm('Are you sure you want to delete this user', 'tip', {
        cancelButtonText: 'cancel',
        confirmButtonText: 'confirm',
        type: 'warning'
      }).then(() => {
        del(id,index,'sys_user',this.data)
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
  },
  mounted() {
    this.search()
  }
}
</script>

<style scoped>

</style>
