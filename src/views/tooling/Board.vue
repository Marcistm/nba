<template>
<div>
  <el-form :model="formInline" :inline="true">
    <el-form-item label="日期">
      <el-date-picker
          clearable
          v-model="formInline.date"
          type="daterange"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="工单号">
      <el-input v-model="formInline.work_number"></el-input>
    </el-form-item>
    <el-form-item label="料号">
      <el-select v-model="formInline.tooling_no" filterable clearable>
        <el-option v-for="i in list" :key="i.tooling_no" :label="i.tooling_no" :value="i.tooling_no"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="型号" >
      <el-select v-model="formInline.tooling_map" filterable  clearable>
        <el-option v-for="i in list" :key="i.tooling_map" :label="i.tooling_map" :value="i.tooling_map"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="工单状态">
      <el-select v-model="formInline.condition" clearable>
        <el-option label="完成" value="完成"></el-option>
        <el-option label="未完成" value="未完成"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="success" @click="search">search</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="temp" max-height="780">
    <el-table-column label="工单创建时间" prop="create_time"></el-table-column>
    <el-table-column label="工单号" prop="work_number">
      <template slot-scope="scope">
        <el-button type="text" @click="open_work(scope.row.work_number)">{{scope.row.work_number}}</el-button>
      </template>
    </el-table-column>
    <el-table-column label="工单备注" prop="work_order_memo"></el-table-column>
    <el-table-column label="工装物料" prop="tooling_no"></el-table-column>
    <el-table-column label="物料描述" prop="tooling_name"></el-table-column>
    <el-table-column label="工单数量" prop="process_num"></el-table-column>
    <el-table-column label="完成时间" prop="finish_time"></el-table-column>
  </el-table>
  <el-dialog :visible.sync="work_tag">
    <el-table :data="work_dialog" max-height="500">
      <el-table-column label="子工单" prop="work_row_item">
      </el-table-column>
      <el-table-column label="子工单备注" prop="work_row_memo"></el-table-column>
      <el-table-column label="工装图纸" prop="sub_map"></el-table-column>
      <el-table-column label="加工数量" prop="process_comp_numbers"></el-table-column>
      <el-table-column label="当前工序" prop="work_procedure"></el-table-column>
      <el-table-column label="合格数量" prop="qualified_num"></el-table-column>
      <el-table-column label="不合格数量" prop="unqualified_num"></el-table-column>
    </el-table>
  </el-dialog>
</div>
</template>

<script>
import axios from "axios";
function compare(a, b) {
  var numA = parseInt(a.work_row_item.split('-')[1]);
  var numB = parseInt(b.work_row_item.split('-')[1]);
  return numA - numB;
}
export default {
  name: "Board",
  data(){
    return{
      filter:(condition,data)=>{
        return data.filter(item => {
          return Object.keys( condition ).every( key => {
            return String( item[ key ] ).toLowerCase().includes(
                String( condition[ key ] ).trim().toLowerCase() )
          } )
        } )
      },
      tag:false,
      formInline: {
        work_number:'',
        tooling_no:'',
        tooling_map:'',
        date: [],
        condition: '',
      },
      temp:[],
      data:[],
      dialog:[],
      work_dialog:[],
      work_tag:false,
      list:[]
    }
  },
  methods:{
    get_no_map(){
      let path='http://127.0.0.1:6325/tooling_process/no_map'
      axios.get(path).then(res=>{
        this.list=res.data.data
      })
    },
    search(){
      let path='http://127.0.0.1:6325/tooling_process/search'
      let params = {
        work_number: this.formInline.work_number,
        start: this.formInline.date[0],
        end: this.formInline.date[1],
        condition:this.formInline.condition,
        tooling_map: this.formInline.tooling_map,
        tooling_no: this.formInline.tooling_no
      }
      axios.get(path,{params:params}).then(res=>{
        this.data=res.data.data
        this.temp=[]
        const seen = new Set();
        this.data.forEach(item=>{
          item['create_time']=this.$store.state.formatGMTTime(item['create_time'])
          item['finish_time']=this.$store.state.formatGMTTime(item['finish_time'])
          if (!seen.has(item.work_number)) {
            this.temp.push(item);
            seen.add(item.work_number);
          }
        })


      })
    },
    open_work(work_number){
      this.work_tag=true
      this.work_dialog=this.filter({work_number:work_number},this.data)
      this.work_dialog.sort(compare)
    }
  },
  mounted() {
    this.get_no_map()
  }
}
</script>

<style scoped>

</style>
