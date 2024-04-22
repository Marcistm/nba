<template>
<div>
  <el-form :inline="true">
    <el-form-item label="category">
      <el-select v-model="category">
        <el-option v-for="i in options" :label="i.name" :value="i.name" :key="i.name"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="num">
      <el-input-number v-model="num"  :min="1"  ></el-input-number>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getTop10">confirm</el-button>
    </el-form-item>
  </el-form>
  <div v-loading="loading" style="display: flex; justify-content: center; align-items: center;">
<div id="horizontal-bar-chart" style="width: 1000px;height: 700px"></div>
</div>
</div>
</template>

<script>
import axios from "axios";
import * as echarts from "echarts";
function drawHorizontalBarChart(data, dataType) {
  const chartDom = document.getElementById('horizontal-bar-chart');
  const myChart = echarts.init(chartDom);

  const playerNames = data.map(item => item.PLAYER);
  const dataValues = data.map(item => item[dataType]);

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '10%',   // 调整左边距
      right: '10%',  // 调整右边距
      top: '5%',     // 调整上边距
      bottom: '5%',  // 调整下边距
      containLabel: true
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01]
    },
    yAxis: {
      type: 'category',
      data: playerNames,
      axisLabel: {
        interval: 0,
        formatter: function (value) {
          return value;  // 不进行截断，显示所有名字
        }
      }
    },
    series: [
      {
        type: 'bar',
        data: dataValues,
        itemStyle: {
          color: function (params) {
            const colorList = [
              '#FF0000', '#FF4500', '#FF8C00', '#FFD700', '#ADFF2F',
              '#32CD32', '#008000', '#008080', '#0000FF', '#4B0082',
              '#800080', '#FF00FF', '#800000', '#A52A2A', '#000000'
            ];
            return colorList[params.dataIndex % colorList.length];
          }
        }
      }
    ]
  };

  option && myChart.setOption(option);
}
export default {
  name: "TOP10",
  data(){
    return{
      loading:false,
      num:10,
      category:'PTS',
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
      this.loading=true
      let path='http://127.0.0.1:6325/player/top'
      let params={
        category:this.category,
        num:this.num
      }
      axios.get(path,{params:params}).then(res=>{
        if (res.data.code===200){
          drawHorizontalBarChart(res.data.data,this.category)
          this.loading=false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
