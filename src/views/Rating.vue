<template>
<div>
  <el-form :inline="true">
    <el-form-item>
      <el-date-picker></el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">search</el-button>
    </el-form-item>
  </el-form>
  <el-table>

  </el-table>
</div>
</template>

<script>
export default {
  name: "Rating"
}
</script>

<style scoped>

</style>
