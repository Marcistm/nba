<template>
<div>
  <el-form :inline="true" style="margin-top: 10px">

    <el-form-item label="工装料号">
      <el-input v-model="tooling_no" @blur="search_version"></el-input>
    </el-form-item>
    <el-form-item label="版本" >
      <el-select v-model="file" filterable @change="handleChange" clearable>
        <el-option
            v-for="item in options"
            :key="item"
            :label="item"
            :value="item">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="工单号">
      <el-input v-model="work_number" @blur="work_number_search"></el-input>
    </el-form-item>
  </el-form>
  <el-table  :data="data"   :header-cell-style="{textAlign: 'center', borderColor: 'black'}"
            :cell-style="{textAlign: 'center', borderColor: 'black'}">

  </el-table>
</div>
</template>

<script>
import axios from "axios";
export default {
  name: "SearchMap",
  data() {
    return {
      work_number:'',
      type:'正式图纸',
      file:'',
      tooling_no:'',
      options:[],
      data:[]
    }
  },
  methods:{
    typeChange(){
      this.search_version()
      this.tooling_no=''
      this.file=''
    },
    work_number_search(){
      let path = 'http://127.0.0.1:6325/tooling_process/create'
      let paramas = {
        work_number:this.work_number.substring(0,9),
      }
      axios.get(path, {
        params: paramas
      }).then(res => {
        if (res.data.sub_map!==undefined){
          this.data=[{sub_map:res.data.sub_map}]
        }else {

          this.data = res.data.data
          this.index = this.data.findIndex(item => item.sub_map.endsWith("-000"));
          if (this.index !== -1) {
            // 从数组中移除找到的元素
            const itemWith000 = this.data.splice(this.index, 1)[0];
            // 截取'-000'之前的所有内容
            const itemBefore000 = itemWith000.sub_map.split("-000").join("");
            // 将元素添加到数组的第一个位置
            this.data.unshift({ sub_map: itemBefore000 });
          }
        }

      })
    },
    handleChange(){
      if (this.file !== '') {
        if (this.type==='正式图纸'){
          this.tooling_no=this.file.split('-')[0];
          let path = 'http://127.0.0.1:6325/tooling_process/create'
          let paramas = {
            file:this.file,
          }
          axios.get(path, {
            params: paramas
          }).then(res => {

            this.data = res.data.data
            this.index = this.data.findIndex(item => item.sub_map.endsWith("-000"));
            if (this.index !== -1) {
              // 从数组中移除找到的元素
              const itemWith000 = this.data.splice(this.index, 1)[0];
              // 截取'-000'之前的所有内容
              const itemBefore000 = itemWith000.sub_map.split("-000").join("");
              // 将元素添加到数组的第一个位置
              this.data.unshift({ sub_map: itemBefore000 });
            }
          })
        }else {
          this.data=[{sub_map:this.file}]
        }

      }
    },
    search_version(){
      let path = 'http://127.0.0.1:6325/tooling_process/search_version'
      let paramas = {
        type: this.type
      }
      axios.get(path,{params:paramas}).then(res=>{
        this.options=res.data.data
      })
    },
  },
  mounted() {
    this.search_version()

  }
}
</script>

<style scoped>

</style>
