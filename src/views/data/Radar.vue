<template>
<div>
<el-form :inline="true">
  <player-select></player-select>
</el-form>
</div>
</template>

<script>
import PlayerSelect from "@/components/PlayerSelect";
export default {
  name: "Radar",
  components: {PlayerSelect}
}
</script>

<style scoped>

</style>
