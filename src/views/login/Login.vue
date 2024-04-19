<template>
    <div class="login">
        <!-- 登录面板 -->
        <div class="login-box">
            <div class="login-box-title">
                NBA
            </div>
            <div class="login-box-from">
                <el-form :model="loginForm" :rules="rules" ref="loginForm"  class="demo-ruleForm">
                    <el-form-item prop="username" >
                        <el-input v-model="loginForm.username"  size="medium">
                            <el-button slot="prepend" icon="el-icon-user"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password" >
                        <el-input v-model="loginForm.password"   size="medium" type="password">
                            <el-button slot="prepend" icon="el-icon-key"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="medium" :loading="loading" style="width:100%" @click="submitForm('loginForm')">login</el-button>
                    </el-form-item>
                  <el-form-item>
                    <el-button type="primary" size="medium" :loading="loading" style="width:100%" @click="register">register</el-button>
                  </el-form-item>
                </el-form>
            </div>
        </div>

    </div>

</template>

<script>
import axios from 'axios'
import { setUser, setUserName, getUser } from "@/utils/auth";

export default {
    data(){
        let letterRule = (rule, value, callback) => {
            let reg = /^[a-zA-Z0-9_-]{4,18}$/
            if (value === '') {
                callback(new Error('The input content cannot be empty'));
            }else if(!reg.test(value)) {
                callback(new Error('Please enter letters, numbers, and underscores'));
            }else{
                callback();
            }
        };
        return {
            loading: false, //登陆状态
            loginForm:{  // 登陆表单
                username: '',
                password: ''
            },
            rules:{  //登陆验证规则
                password: [
                    { required: true, message: 'Please enter password', trigger: 'blur' },
                    { min: 6, max: 16, message: 'Length between 6 and 16 characters', trigger: 'blur' },
                    { validator: letterRule, trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
      submitForm(formName){
        this.loginForm.username = 'test'
        this.loginForm.password = '12345678'
          this.$refs[formName].validate((valid) => {
              if (valid) {
                  this.loading = true
                  this.login()
              } else {
                  console.log('error submit!!');
                  return false;
              }
          });
      },
      register(){
        this.$router.replace('/register')
      },
      login(){
        // let path = 'http://127.0.0.1:5000/login'
        let path = 'http://127.0.0.1:6325/login'
        let param = {
          username: this.loginForm.username,
          password: this.loginForm.password
        }
        axios.get(path, { params: param, timeout: 300000 }).then(responses => {
          if (responses.data.code === 200) {
            if (responses.data.privilege === '0') {
              this.loading = false
              this.$message.error('No Permission')
            } else {
              localStorage.setItem('permission', responses.data.privilege)
              setUser(this.loginForm.username)
              this.$store
                  .dispatch('user/login',{token: responses.data.token})
                  .then(()=>{
                    this.loading = true
                    // 登陆成功后重定向
                    // 如果初次登录跳转到更改密码页面
                    setUserName(responses.data.name)
                    if (responses.data.has_login === 0) {
                      this.$router.push({
                        path: this.$route.query.redirect || '/resetPass'
                      })
                    } else {
                      this.$router.push('/')
                    }
                  })
                  .catch(err=>{
                    this.loading = true
                    // console.log(err)
                  })
            }
          } else {
            this.loading = false
            this.$message.error(responses.data.msg)
          }
        }).catch(error => {
          this.loading = false
          this.$message.error('Network Error')
          console.log(error)
        })
      }
    }
}
</script>

<style scoped>
.login{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('../../assets/image/login.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.login-box{
    width: 350px;
    /* height: 287px; */
    background: hsla(0,0%,100%,.3);
    border-radius: 5px;
    box-shadow: 0 0 2px #f7f7f7;
    border: 1px solid #f7f7f7;
}
.login-box-title{
    line-height: 50px;
    font-size: 20px;
    color: #ffffff;
    text-align: center;
    border-bottom: 1px solid #ffffff;
}
.login-box-from{
    width: 100%;
    height: auto;
    padding: 30px;
    box-sizing: border-box;
}
</style>
