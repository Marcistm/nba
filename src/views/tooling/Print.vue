<template>
  <div class="print-container">
    <el-table style="width: 100%" :data="table" :show-header="false"
              :cell-style="{textAlign: 'center', borderColor: 'black'}"

              :span-method="mergeCells">
      <el-table-column  prop="item2"></el-table-column>
      <el-table-column  prop="item3" width="100"></el-table-column>
      <el-table-column  prop="item4">
        <template slot-scope="scope">
          <svg v-if="scope.$index===0" height="50" width="50" ref="barcode"></svg>
          <span v-else>{{scope.row.item4}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-table
        :data="tableData"
        :header-cell-style="{textAlign: 'center', borderColor: 'black'}"
        :cell-style="{textAlign: 'center', borderColor: 'black'}"
        :row-style="{height: '50px'}"
        style="width: 100%;margin-top: 10px"
        border>
      <el-table-column
          label="序号"
          width="60"
      >
        <template slot-scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column
          prop="work_procedure"
          label="工序"
          width="80"
      >
      </el-table-column>
      <el-table-column
          prop="work_memo"
          label="工序备注"
      >
      </el-table-column>
      <el-table-column
          label="流入数量"
          width="60"
      >
      </el-table-column>
      <el-table-column
          label="合格"
          width="60"
      >
      </el-table-column>
      <el-table-column
          label="返工"
          width="60"
      >
      </el-table-column>
      <el-table-column
          label="回用"
          width="60"
      >
      </el-table-column>
      <el-table-column
          label="工废"
          width="60"
      >
      </el-table-column>
      <el-table-column
          label="料废"
          width="60"
      >
      </el-table-column>
      <el-table-column
          label="加工人员签名"
      width="120">
      </el-table-column>
      <el-table-column
          label="检验人员签名"
      width="120">
      </el-table-column>
    </el-table>
    <el-table
        v-if="tag"
        style="width: 100%;margin-top: 10px"
        :data="data"  ref="myTable"
              :header-cell-style="{textAlign: 'center', borderColor: 'black'}"
              :cell-style="{textAlign: 'center', borderColor: 'black'}">
      <el-table-column label="工单行项目" width="150" prop="work_row_item">
      </el-table-column>
      <el-table-column label="工装子图" prop="sub_map">
      </el-table-column>
      <el-table-column label="加工数量" width="120" prop="process_num"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
import JsBarcode from "jsbarcode";

export default {
  name: 'Print',
  props: {
    msg: String,
  },
  methods:{
    mergeCells({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        if (columnIndex === 0) {
          return {
            rowspan: 1,
            colspan: 2
          };
        }
        if (columnIndex === 1) {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
      if ([4,5].includes(rowIndex)){
        if (columnIndex === 1) {
          return {
            rowspan: 1,
            colspan: 3
          };
        }
      }
    }
  },
  data() {
    return {
      table:[
        {item1:'',item2:'',item3:"工单条码",item4:''},
        {item1:'工单号码',item2:'',item3:"创建时间",item4:''},
        {item1:'工装物料',item2:'',item3:"加工数量",item4:''},
        {item1:'工装名称',item2:'',item3:"工装图纸",item4:''},
        {item1:'工单备注',item2:''},
        {item1:'OAID',item2:''},
      ],
      tableData: [],
      data:[],
      tag:false,
    }
  },

  async mounted() {
    try {
      const work_row_item = this.$route.query.work_row_item;
      const [work_number, number] = work_row_item.split('-');

      const path = 'http://127.0.0.1:6325/tooling_process/work_row_item/get';
      const params = { work_row_item };

      const res1 = await axios.get(path, { params });
      this.tableData = res1.data.data;

      const path2 = 'http://127.0.0.1:6325/tooling_process/print/get';
      const params2 = { work_number,work_row_item };

      const res2 = await axios.get(path2, { params: params2 });
      this.table[1].item2 = work_row_item;
      this.table[1].item4 = this.$store.state.formatGMTTime(res2.data.data[0].create_time);
      this.table[2].item2 = res2.data.data[0].tooling_no;
      this.table[2].item4 = this.tableData[0].comp_numbers * res2.data.data[0].process_num;
      this.table[3].item2 = res2.data.data[0].tooling_name;
      this.table[3].item4 = this.tableData[0].sub_map;
      this.table[4].item2 = res2.data.data[0].work_order_memo;
      this.table[5].item2 = res2.data.data[0].oa_id

      if (number === '0') {
        this.tag=true
        const path3 = 'http://127.0.0.1:6325/tooling_process/plan/search';
        const is_print = true
        const params3 = { work_number,is_print};

        const res3 = await axios.get(path3, { params: params3 });
        console.log(res3.data.work_row_item)
        this.data = res3.data.data;
        this.index = this.data.findIndex(item => item.sub_map.endsWith("-000"));
        const itemWith000 = this.data.splice(this.index, 1)[0];
        const itemBefore000 = itemWith000.sub_map.split("-000").join("");
        this.data.unshift({ sub_map: itemBefore000 });

        for (let i = 0; i < this.data.length; i++) {
          this.$set(this.data[i], 'work_row_item', work_number + '-' + i);
          this.data[i].process_num = parseInt(this.data[i].process_num) * parseInt(res3.data.comp_numbers[i]);
        }
        this.data[0].process_num = this.table[2].item4;

        this.data = this.data.filter(item => res3.data.work_row_item.includes(item.work_row_item));

      }

      setTimeout(() => {
        JsBarcode(this.$refs.barcode, this.table[1].item2, {
          format: 'CODE128',
          displayValue: false
        });
        window.print();
        window.close();
      }, 1000);


    } catch (error) {
      console.error(error);
      // 处理错误情况
    }
  }



}
</script>
<style>
@media print {
  @page {
    /* 纵向打印 */
    size: portrait;
    /* 横向打印 */
    /*size: landscape;*/
    /* 去掉页眉页脚*/
    margin-top: 0;
    margin-bottom: 0;
  }
  /*打印不显示打印按钮*/
  .print-button-container {
    display: none !important;
  }

}
</style>
<style scoped>
.print-container {
  width: 1000px;
  margin: 0 auto;
}
.print-button-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
}
/*字体调黑*/
>>> .el-table {
  font-size: 20px;
  color: #000000;
}
>>> .el-table th {
  font-weight: normal;
  font-size: 18px;
}
>>> .el-table thead {
  color: #000000;
}
/*边框调黑*/
>>> .el-table::before {
  background-color: #000000;
}
>>> .el-table--border::after {
  background-color: #000000;
}
>>> .el-table--border th, >>> .el-table--border td {
  border-color: #000000;
}
>>> .el-table--group, >>> .el-table--border {
  border-color: #000000;
}
>>> .el-table th.is-leaf, >>> .el-table td {
  border-bottom: 1px solid #000000;
}
/*减小单元格间距*/
>>> .el-table th, >>> .el-table td {
  padding: 0 0;
}
>>> .el-table {
  border: 1px solid black;
}



</style>
