<template>
<div>
  <el-form :inline="true">
    <el-form-item label="category">
      <el-select v-model="category">
        <el-option v-for="i in options" :label="i.name" :value="i.name" :key="i.name"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getTop10">confirm</el-button>
    </el-form-item>
  </el-form>

</div>
</template>

<script>
import axios from "axios";

export default {
  name: "TOP10",
  data(){
    return{
      category:'',
      options:[
        { name: 'AST' },
        { name: 'BLK' },
        { name: 'PTS' },
        { name: 'REB' },
        { name: 'STL' }
      ]
    }
  },
  methods:{
    getTop10(){
      if (this.category===''){
        this.$message.error('must select category')
        return
      }
      let path='http://127.0.0.1:6325/player/top/10'
      let params={
        category:this.category
      }
      axios.get(path,{params:params}).then(res=>{
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>

</style>
