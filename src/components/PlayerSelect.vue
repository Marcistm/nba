<template>
<div>
  <el-form-item label="team">
    <el-select v-model="form.team" @change="getPlayers">
      <el-option v-for="i in teams" :label="i.full_name" :key="i.id" :value="i.id"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item v-if="form.team!==''" label="player">
    <el-select v-model="form.player">
      <el-option v-for="i in players" :label="i.PLAYER" :key="i.PLAYER_ID" :value="i.PLAYER_ID"></el-option>
    </el-select>
  </el-form-item>
</div>
</template>

<script>
import axios from "axios";
import {getTeams} from "@/api/api";

export default {
  name: "PlayerSelect",
  data(){
    return{
      teams:[],
      players:[],
      form:{
        team:'',
        player:''
      }
    }
  },
  methods:{
    getPlayers(){
      let path='http://127.0.0.1:6325/player/search/by/team'
      let params={
        team_id:this.form.team
      }
      axios.get(path,{params:params}).then(res=>{
        this.players=res.data.data
      })
    },
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
