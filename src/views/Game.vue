<template>
  <div class="schedule">
    <el-card  v-for="(game, index) in data" :key="index" class="game">
      <div slot="header" class="game-header">
        <div class="team-button" @click="detail(game.gameId,'home')">{{ game.homeTeam }}</div>
        <span class="vs">vs</span>
        <div class="team-button" @click="detail(game.gameId,'away')">{{ game.awayTeam }}</div>
      </div>
      <div class="game-content">
        <p class="score">{{ game.homeTeamScore }} - {{ game.awayTeamScore }}</p>
        <p class="time">{{ game.gameTimeLTZ }}</p>
      </div>
    </el-card>
    <el-dialog :visible.sync="tag">
      <el-table :data="table">
        <el-table-column label="name" prop="name"></el-table-column>
        <el-table-column label="points" prop="points"></el-table-column>
        <el-table-column label="reboundsTotal" prop="reboundsTotal"></el-table-column>
        <el-table-column label="assists" prop="assists"></el-table-column>
        <el-table-column label="blocks" prop="blocks"></el-table-column>
        <el-table-column label="steals" prop="steals"></el-table-column>
        <el-table-column label="rate">
          <template slot-scope="scope">
            <el-rate
                v-model="scope.row.rate"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}">
            </el-rate>
          </template>
        </el-table-column>
        <el-table-column label="operation">
          <template slot-scope="scope">
          <el-button type="primary" @click="evaluate(scope.row)">evaluate</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <evaluate-dialog ref="EvaluateDialog" ></evaluate-dialog>
  </div>
</template>

<script>
import axios from "axios";
import {getUserName, removeToken} from "@/utils/auth";
import {getCurrentDate} from "@/utils/util";
import game from "@/data/game";
import EvaluateDialog from "@/components/EvaluateDialog";
export default {
  name: "Report",
  components: {EvaluateDialog},
  data(){
    return{
      date:'',
      gameId:'',
      table:[],
      tag:false,
      data:[],
      work_number:'',
      work_procedure:'',
      work_name_table:[],
    }
  },
  methods:{
    evaluate(row){
      this.$refs.EvaluateDialog.row=row
      console.log(row)
      this.$refs.EvaluateDialog.tag=true
    },
    detail(gameId,type){
      let path='http://127.0.0.1:6325/game/detail'
      let params={
        gameId:gameId,
        type:type
      }
      axios.get(path,{params:params}).then(res=>{
        if (res.data.code===200){
          this.tag=true
          this.gameId=gameId
          this.table=res.data.data
        }
      })
    },
    search(){
      let path='http://127.0.0.1:6325/game/search'
      axios.get(path).then(res=>{
        this.data=res.data.data
      })
    },

  },
  mounted() {
    this.search()
    // this.data=game
  }
}
</script>

<style scoped>
.schedule {
  text-align: center;
  display: flex;
  flex-wrap: wrap;
}

.game {
  width: 100%; /* 两列布局 */
  margin: 10px;
}

.game-header {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
}

.team-button {
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 4px;
  background-color: #f0f0f0;
  transition: background-color 0.3s;
}

.team-button:hover {
  background-color: #e0e0e0;
}

.vs {
  margin: 0 10px;
  color: #666;
}

.game-content {
  padding: 10px;
}

.score {
  font-size: 16px;
  color: #333;
}

.time {
  font-size: 14px;
  color: #666;
}
</style>
