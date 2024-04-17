<template>
<el-dialog :visible.sync="tag">
  <el-table :data="data">
    <el-table-column label="name" prop="name"></el-table-column>
    <el-table-column label="comment" prop="comment"></el-table-column>
    <el-table-column label="username" prop="username"></el-table-column>
    <el-table-column label="time" prop="time"></el-table-column>
    <el-table-column label="like" prop="like">
      <template slot-scope="scope">
        <el-button>like</el-button>
      </template>
    </el-table-column>
    <el-table-column label="dislike" prop="dislike">
      <template slot-scope="scope">
        <el-button>dislike</el-button>
      </template>
    </el-table-column>
    <el-table-column label="report" prop="report">
      <template slot-scope="scope">
        <el-button>report</el-button>
      </template>
    </el-table-column>
  </el-table>
</el-dialog>
</template>

<script>
import axios from "axios";

export default {
  name: "PlayerComments",
  data(){
    return{
      gameId:'',
      player:'',
      tag:false,
      data:[]
    }
  },

  methods:{
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
