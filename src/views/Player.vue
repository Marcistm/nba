<template>
  <div>
    <el-form :inline="true">
      <el-form-item label="team">
        <el-select v-model="team" @change="getPlayers">
          <el-option v-for="i in teams" :label="i.full_name" :key="i.id" :value="i.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-table :data="data" max-height="700">
      <el-table-column
          v-for="column in tableColumns"
          :key="column"
          :prop="column"
          :label="column"
      ></el-table-column>
    </el-table>
  </div>

</template>

<script>
import {getTeams} from "@/api/api";
import axios from "axios";

export default {
  name: "Player",
  data(){
    return{
      tableColumns: [
        'PLAYER',  'NUM', 'POSITION',
        'HEIGHT', 'WEIGHT', 'BIRTH_DATE', 'AGE', 'EXP', 'SCHOOL', 'HOW_ACQUIRED'
      ],
      teams:[],
      team:'',
      data:[]
    }
  },
  methods:{
    getPlayers(){
      let path='http://127.0.0.1:6325/player/search/by/team'
      let params={
        team_id:this.team
      }
      axios.get(path,{params:params}).then(res=>{
        this.data=res.data.data
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
