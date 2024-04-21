<template>
<el-dialog :visible.sync="tag" >
  <div style="display: flex; justify-content: center; align-items: center;">
    <el-card class="player-card">
      <div slot="header">
        <span>{{ row.name }}</span>
        <span class="player-score">{{ row.points }} Points</span>
      </div>
      <div class="card-content">
        <div class="card-item">
          <div class="item" v-for="(value, key) in row" :key="key" v-if="!['points','name','gameId'].includes(key)">
            <span class="item-label">{{ formatLabel(key) }}</span>
            <br>
            <span class="item-value">{{ formatValue(key, value) }}</span>
          </div>
        </div>
      </div>
    </el-card>
  </div>

  <el-form :inline="true">
    <el-form-item label="rate">
      <el-rate
          v-model="form.rate"
          :colors="$store.state.colors">
      </el-rate>
    </el-form-item>
    <br>
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
  name: "EvaluateDialog",
  data(){
    return{
      tag:false,
      row:{},
      form:{
        rate:null,
        comment:'',
      },

    }
  },
  methods:{
    formatLabel(key) {
      return key.replace(/([A-Z])/g, " $1").charAt(0).toUpperCase() + key.slice(1);
    },
    formatValue(key, value) {
      if (key === 'minutes') {
        return value.slice(2).replace('M', ' Minutes ').replace('S', ' Seconds');
      } else if (key === 'fieldGoalsPercentage' || key === 'freeThrowsPercentage' || key === 'threePointersPercentage' || key === 'twoPointersPercentage') {
        return (value * 100).toFixed(2) + '%';
      } else {
        return value;
      }
    },
    submit(){
      let path='http://127.0.0.1:6325/evaluate/submit'
      let params={
        username:getUserName(),
        gameId: this.row.gameId,
        name:this.row.name,
        rate:this.form.rate,
        comment:this.form.comment
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
.player-card {
  width: 600px;
  margin: 20px;
}

.player-card .card-content {
  padding: 20px;
}

.card-item {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.item {
  width: 45%;
  margin-bottom: 10px;
}

.item-label {
  font-weight: bold;
}

.player-score {
  margin-left: 10px;
  color: #67C23A;
}
</style>
