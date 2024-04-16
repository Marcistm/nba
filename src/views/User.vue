<template>
<el-table :data="data">
<el-table-column label="username" prop="username"></el-table-column>
  <el-table-column label="name" prop="name"></el-table-column>
</el-table>
</template>

<script>
export default {
  name: "User",
  data(){
    return{
      data:[]
    }
  }
}
</script>

<style scoped>

</style>
