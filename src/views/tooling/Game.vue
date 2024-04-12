<template>
  <div class="schedule">
    <el-card  v-for="(game, index) in data" :key="index" class="game"
    >
      <div slot="header" class="game-header">{{ game.homeTeam }} vs {{ game.awayTeam }}</div>
      <div class="game-content">
        <p class="score">{{ game.homeTeamScore }} - {{ game.awayTeamScore }}</p>
        <p class="time">{{ game.gameTimeLTZ }}</p>
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
import {getUserName, removeToken} from "@/utils/auth";
import {getCurrentDate} from "@/utils/util";
import game from "@/data/game";
export default {
  name: "Report",
  data(){
    return{
      date:'',
      row:'',
      num_table:[{num:'',finish_num:"",scrap_num:''}],
      num_tag:false,
      data:[],
      work_number:'',
      work_procedure:'',
      work_name_table:[],
    }
  },
  methods:{


    search(){
      let path='http://127.0.0.1:6325/game/search'
      axios.get(path).then(res=>{
        this.data=res.data.data
      })
    },

  },
  mounted() {
    this.search()
    this.data=game

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
  font-size: 18px;
  font-weight: bold;
  padding: 10px;
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
