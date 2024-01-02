<template>
<div style="text-align: center">
  <el-button type="primary" v-for="i in files" @click="change(i)" :key="i">{{i}}</el-button>
  <iframe id="pdf" src="/pdf/web/viewer.html" width="100%" height="750px" ></iframe>
</div>
</template>

<script>
import axios from "axios";
export default {
  name: "Pdf",
  data(){
    return{
      files:[]
    }
  },
  methods:{
    change(map){
      const regex = /总装|装配/;
      if (regex.test(map)&map.endsWith("-000")){
        map=map.slice(0,-4)
      }
      // 获取当前的 iframe 元素
      let param = {
        map: map
      };
      let stream_path = "http://127.0.0.1:6325/tooling_process/preview";
      axios.get(stream_path, { params: param })
          .then((response) => {
            let stream_param = "?map=" + encodeURIComponent(map);
            const pdfUrl = "/pdf/web/viewer.html?file=" + encodeURIComponent(stream_path + stream_param)

            document.getElementById('pdf').setAttribute("src",pdfUrl)
          })
          .catch((err) => {
            console.log(err);
            if (err.response.status === 402) {
              this.$message.warning(err.response.data.msg);
              this.$store.dispatch("user/resetToken");
            } else if (err.response.status === 500) {
              this.$message.error("服务器错误，联系管理员");
            } else {
              this.$message.error(err.response.data.msg);
            }
          });

    },
    get_pdf(){

      let path='http://127.0.0.1:6325/tooling_process/get_other_file'
      let params={
        map:this.map
      }
      axios.get(path,{params:params}).then(res=>{
      this.files=res.data.data
      })
    },

  },
mounted() {
  this.map=localStorage.getItem('map')
  this.get_pdf()
this.change(this.map)
},



}
</script>

<style scoped>
</style>
