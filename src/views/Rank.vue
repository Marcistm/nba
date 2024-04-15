<template>
<div>
  <el-tabs v-model="region">
    <el-tab-pane label="East" name="East"></el-tab-pane>
    <el-tab-pane label="West" name="West"></el-tab-pane>
  </el-tabs>
  <el-table :data="data">
    <el-table-column label="team"></el-table-column>
    <el-table-column label="W"></el-table-column>
    <el-table-column label="L"></el-table-column>
  </el-table>
</div>
</template>

<script>
export default {
  name: "Rank",
  mounted() {

  },
  data(){
    return{
      region:'',
      data:[]
    }
  },
  methods:{

  }
}
</script>

<style scoped>

</style>
