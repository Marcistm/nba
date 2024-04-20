<template>
<div style="text-align: center">
<el-form :inline="true">
  <el-form-item label="team1">
    <el-select v-model="team1" >
      <el-option v-for="i in teams" :label="i.full_name" :key="i.id" :value="i.id"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="team2">
    <el-select v-model="team2" >
      <el-option v-for="i in teams" :label="i.full_name" :key="i.id" :value="i.id"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button @click="confirm">confirm</el-button>
  </el-form-item>
</el-form>
  <div style="display: flex; justify-content: center; align-items: center;">
    <div id="radar-chart" style="width:500px;height: 500px">
    </div>
  </div>
</div>
</template>

<script>
import PlayerSelect from "@/components/PlayerSelect";
import {getTeams, playerSearch} from "@/api/api";
import axios from "axios";
import * as echarts from "echarts"
function drawRadarChart(data) {
  // 初始化echarts实例
  var myChart = echarts.init(document.getElementById('radar-chart'));

  // 配置项
  var option = {
    tooltip: {},
    radar: {
      indicator: [
        { name: 'AST' },
        { name: 'BLK' },
        { name: 'PTS' },
        { name: 'REB' },
        { name: 'STL' }
      ]
    },
    series: [{
      type: 'radar',
      data: data.map(function (item) {
        return {
          value: [item.AST, item.BLK, item.PTS, item.REB, item.STL],
          name: item.name
        };
      })
    }]
  };

  // 使用刚指定的配置项和数据显示图表
  myChart.setOption(option);
}

export default {
  name: "Radar",
  components: {PlayerSelect},
  data(){
    return{
      teams:[],
      data:[],
      players:[],
      team1:'',
      team2:''
    }
  },
  methods:{
    confirm(){
      if (this.team1===''||this.team2===''){
        this.$message.error('Two teams must be selected')
        return
      }
      let path='http://127.0.0.1:6325/team/season/avg'
      let params={
        teams:[this.team1,this.team2],
      }
      axios.post(path,params).then(res=>{
          this.data=res.data.data
          this.data[0].name=this.teams.find(item => item.id === this.team1).full_name;
          this.data[1].name=this.teams.find(item => item.id === this.team2).full_name;
          drawRadarChart(this.data)
          console.log(this.data)
      })
    }
  },
  mounted() {
    getTeams().then((data) => {
      this.teams=data
    })
  }
}
</script>

<style scoped>

</style>
