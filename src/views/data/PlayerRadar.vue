<template>
<div style="text-align: center">
<el-form :inline="true">
<player-select ref="player1"></player-select>
  <player-select ref="player2"></player-select>
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
import {playerSearch} from "@/api/api";
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
      data:[],
      players:[],
      player1:'',
      player2:''
    }
  },
  methods:{
    confirm(){
      if (this.$refs.player1.form.player===''||this.$refs.player2.form.player===''){
        this.$message.error('Two players must be selected')
        return
      }
      let path='http://127.0.0.1:6325/player/season/avg'
      let params={
        players:[this.$refs.player1.form.player,this.$refs.player2.form.player],
      }
      axios.post(path,params).then(res=>{
          this.data=res.data.data
          this.data[0].name=this.$refs.player1.players.find(item => item.PLAYER_ID === this.$refs.player1.form.player).PLAYER;
          this.data[1].name=this.$refs.player2.players.find(item => item.PLAYER_ID === this.$refs.player2.form.player).PLAYER;
          drawRadarChart(this.data)
          console.log(this.data)
      })
    }
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>
