<template>
    <div class="login">
        <!-- 重设密码面板 -->
        <div class="login-box">
            <div class="login-box-title">
              Register
            </div>
            <div class="login-box-from">
                <el-form :model="loginForm" :rules="rules" ref="loginForm"  class="demo-ruleForm">
                  <el-form-item prop="username" label="username">
                    <el-input v-model="loginForm.username" placeholder="Please enter username" size="medium" >
                      <el-button slot="prepend" icon="el-icon-key"></el-button>
                    </el-input>
                  </el-form-item>
                  <el-form-item prop="name" label="name">
                    <el-input v-model="loginForm.name" placeholder="Please enter name" size="medium" type="password">
                      <el-button slot="prepend" icon="el-icon-key"></el-button>
                    </el-input>
                  </el-form-item>
                    <el-form-item prop="password" label="password">
                        <el-input v-model="loginForm.password" placeholder="Please enter password" size="medium" type="password">
                            <el-button slot="prepend" icon="el-icon-key"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="repass" label="Duplicate password">
                        <el-input v-model="loginForm.repass"  placeholder="Please repeat the password" size="medium" type="password">
                            <el-button slot="prepend" icon="el-icon-key"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="medium" :loading="loading" style="width:100%" @click="submitForm('loginForm')">confirm</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

    </div>

</template>

<script>
import axios from 'axios'
import {getUser, setUser, setUserName} from "@/utils/auth";

export default {
    data(){
      const validatePass = (rule, value, callback) => {
        this.$refs.loginForm.validateField('re_passwd');
        callback();
      };
      const validateRePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please enter your password again'));
        } else if (value !== this.loginForm.password) {
          callback(new Error('The passwords entered twice are inconsistent!'));
        } else {
          callback();
        }
      }
        return {
            loading: false, //登陆状态
            loginForm:{  // 登陆表单
              username:'',
              name:'',
                password: '',
                repass: ''
            },
            rules:{  //登陆验证规则
              username:[
                { validator: validatePass, trigger: 'blur' }
              ],
              name: [
                { required:true, trigger: 'blur' }
              ],
                password:[
                    { validator: validatePass, trigger: 'blur' }
                ],
                repass: [
                    { validator: validateRePass, trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        submitForm(formName){
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
        login(){
          let path = 'http://127.0.0.1:6325/user/register'
          let value = {
            'name':this.loginForm.name,
            'username': this.loginForm.username,
            'password': this.loginForm.password
          }
          axios.get(path, { params:value, timeout: 300000 }).then(responses => {
            if (responses.data.code === 200) {
                localStorage.setItem('permission', responses.data.privilege)
                setUser(this.loginForm.username)
                this.$store
                    .dispatch('user/login',{token: responses.data.token})
                    .then(()=>{
                      this.loading = true
                      // 登陆成功后重定向
                      // 如果初次登录跳转到更改密码页面
                      setUserName(responses.data.name)

                        this.$router.push('/')
                    })
                    .catch(err=>{
                      this.loading = true
                      // console.log(err)
                    })

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
