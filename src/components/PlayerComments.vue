<template>
  <div>
<el-dialog :visible.sync="tag">
  <el-table :data="data">
    <el-table-column label="name" prop="name"></el-table-column>
    <el-table-column label="comment" prop="comment"></el-table-column>
    <el-table-column label="username" prop="username"></el-table-column>
    <el-table-column label="time" prop="time"></el-table-column>
    <el-table-column label="like" prop="like">
      <template slot-scope="scope">
        <el-button @click="commentJudge('like',scope.row.id)">like {{scope.row.like}}</el-button>
      </template>
    </el-table-column>
    <el-table-column label="dislike" prop="dislike">
      <template slot-scope="scope">
        <el-button @click="commentJudge('dislike',scope.row.id)">dislike {{scope.row.dislike}}</el-button>
      </template>
    </el-table-column>
    <el-table-column label="report" prop="report">
      <template slot-scope="scope">
        <el-button @click="ReportDialog(scope.row.id)">report {{scope.row.report}}</el-button>
      </template>
    </el-table-column>
  </el-table>
</el-dialog>
  <report-dialog ref="reportDialog"></report-dialog>
  </div>
</template>

<script>
import axios from "axios";
import {getUserName} from "@/utils/auth";
import ReportDialog from "@/components/ReportDialog";

export default {
  name: "PlayerComments",
  components: {ReportDialog},
  data(){
    return{
      gameId:'',
      player:'',
      tag:false,
      data:[]
    }
  },

  methods:{
    ReportDialog(id){
      this.$refs.reportDialog.evaluateId=id
      this.$refs.reportDialog.tag=true
    },
    commentJudge(category,id){
      let path='http://127.0.0.1:6325/write'
      let params={
        data:[
          {
            username:getUserName(),
            category:category,
            evaluateId:id
          }
        ],
        table:'evaluate_stats'

      }
      axios.post(path,params).then(res=>{
        if (res.data.code===200){
          this.$message.success(category+' success')
        }
      })
    },
    get(gameId,name){
      let path='http://127.0.0.1:6325/evaluate/player/comment/search'
      let params={
        gameId:gameId,
        player:name
      }
      axios.get(path,{params:params}).then(res=>{
        if (res.data.code===200){
          this.data=res.data.data
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
