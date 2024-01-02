<template>
  <div>
    <el-form :inline="true">
      <el-form-item label="工单号码">
        <el-input v-model="work_number"></el-input>
      </el-form-item>
      <el-form-item label="工序">
        <el-select  v-model="work_procedure" placeholder="请选择"  clearable>
          <el-option
              v-for="item in work_name_table"
              :key="item.work_name"
              :label="item.work_name"
              :value="item.work_name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">search</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="data" max-height="780">
      <el-table-column label="工单行项目" prop="work_row_item">
        <template slot-scope="scope">
          <el-button type="text" @click="work_row_item=scope.row.work_row_item">{{scope.row.work_row_item}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="物料号" prop="tooling_no"></el-table-column>

      <el-table-column label="加工数量" prop="process_num"></el-table-column>
      <el-table-column label="工序名称" prop="work_procedure"></el-table-column>
      <el-table-column label="工序步骤" prop="number"></el-table-column>
      <el-table-column label="工序备注" prop="work_memo"></el-table-column>
      <el-table-column label="子工单备注" prop="work_row_memo"></el-table-column>
      <el-table-column label="工单备注" prop="work_order_memo"></el-table-column>
      <el-table-column label="加工人员" prop="worker">
      </el-table-column>
      <el-table-column label="开始时间" prop="start_time"></el-table-column>
      <el-table-column label="暂停时间" prop="end_time">
      </el-table-column>
      <el-table-column label="状态" prop="condition"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary"  @click="revoke(scope.row)">撤销</el-button>
        </template>
      </el-table-column>
    </el-table>
    <work-row-item :work_row_item="work_row_item"></work-row-item>
  </div>

</template>

<script>
import {getWorkNameTable, searchReportedData} from "@/api/api";
import axios from "axios";
import WorkRowItem from "@/components/WorkRowItem";


export default {
  name: "DelReport",
  components: {WorkRowItem},
  data(){
    return{
      work_row_item:'',
      data:[],
      work_name_table:[],
      work_number:'',
      work_procedure:'',
    }
  },
  methods:{
    revoke(row){
      this.$confirm('是否撤销报工', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        let path='http://127.0.0.1:6325/tooling_process/report/revoke'
        let params={
          work_row_item:row.work_row_item,number:row.number,condition:row.condition
        }
        axios.get(path,{params:params}).then(res=>{
          if (res.data.code===200){
            this.$message.success('撤销成功')
            this.search()
          }
        })
      }).catch(() => {
        // 取消执行
      });
    },
    search(){
      if(this.work_number===''){
        this.$message.error('请填写工单号')
        return
      }
      searchReportedData(this.work_number, this.work_procedure)
          .then((data) => {
            this.data = data;
          })
    },
  },
  mounted() {
    getWorkNameTable()
        .then((data) => {
          this.work_name_table = data;
        })
  }
}
</script>

<style scoped>

</style>
