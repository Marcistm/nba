<template>
<div>
  <el-tabs v-model="region" @tab-click="search">
    <el-tab-pane label="East" name="East"></el-tab-pane>
    <el-tab-pane label="West" name="West"></el-tab-pane>
  </el-tabs>
  <el-table :data="data">
    <el-table-column label="team" prop="team"></el-table-column>
    <el-table-column label="W" prop="W"></el-table-column>
    <el-table-column label="L" prop="L"></el-table-column>
    <el-table-column label="rate" prop="rate"></el-table-column>
  </el-table>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "Rank",
  mounted() {
    this.search()
  },
  data(){
    return{
      region:'East',
      data:[]
    }
  },
  methods:{
    search(){
      let path='http://127.0.0.1:6325/rank/search'
      let params={
        region:this.region
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
