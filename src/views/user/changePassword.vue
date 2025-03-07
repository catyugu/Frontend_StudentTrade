
<template>
<div>
  <el-container direction="vertical">
    <header-card :header="{title:'修改密码'}" />
    <el-main>
      <el-form :model="ruleForm" :rules="rules"
               ref="ruleForm"
               label-width="100px" style="text-align: left;" class="demo-ruleForm">
        <el-form-item label="邮箱">
          <el-input v-model="ruleForm.email" placeholder="请输入邮箱" ></el-input>

          <el-button type="primary" @click="sendVerificationCode"
          style="margin-top: 10px" v-if="countdown === 0">发送验证码</el-button>
          <el-button style="margin-top: 10px" v-else>
            请等待{{ countdown }}s后再次发送</el-button>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input v-model="ruleForm.verificationCode" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="ruleForm.newPassword" type="password" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码">
          <el-input v-model="ruleForm.confirmNewPassword" type="password" placeholder="请再次输入新密码"></el-input>
        </el-form-item>

      </el-form>
      <el-button type="primary" @click="changePassword('ruleForm')">修改密码</el-button>
    </el-main>
  </el-container>
</div>
</template>
<script>
import HeaderCard from '@/components/headerCard.vue';

export default {
  components: { HeaderCard },
  data() {
    return {
      countdown: 0,
      ruleForm: {
        email: '',
        verificationCode: '',
        newPassword: '',
        confirmNewPassword: ''
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
        ],
        verificationCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 6, max: 6, message: '验证码长度为6位', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 3, max: 20, message: '密码长度为3-20位', trigger: 'blur' }
        ],
        confirmNewPassword: [
          { required: true, message: '请再次输入新密码', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value !== this.ruleForm.newPassword) {
                callback(new Error('两次输入密码不一致!'));
              } else {
                callback();
              }
            }, trigger: 'blur'
          }
        ]
      }

    }
  },
  mounted() {
    this.timer();
  },
  methods: {
    timer() {
      setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
        }
      }, 1000);
    },
    sendVerificationCode() {
      try {
        this.$store.getters.http.post('/api/user/sendVerifyCode', null, {
          params: {
            email: this.ruleForm.email
          }
        }).then((res) => {
          if (res.data.code === 0) {
            this.$notify({
              type: 'success',
              title: '发送成功！',
              message: '验证码已发送至邮箱，请注意查收!'
            });
            this.countdown = 60;
            console.log(res);
          } else {
            this.$notify({
              type: 'error',
              title: '发送失败！',
              message: res.data.msg
            });
          }
        });
      } catch (error) {
        this.$notify({
          type: 'error',
          title: '发送失败！',
          message: error
        });
      }
    },
    changePassword(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid){
          this.$store.getters.http.post('/api/user/changePassword',
            null,{
              params:{
                email: this.ruleForm.email,
                verificationCode: this.ruleForm.verificationCode,
                newPassword: this.ruleForm.newPassword
              },
              headers: {
                'Content-Type': 'application/json',
              },
            },
          ).then(res => {
            console.log(res)
            if (res.data.code === 0) {
              this.$notify({
                title: '成功',
                message: '修改密码成功，请重新登录',
                type: 'success'
              })
              this.$router.push('/user/login')
            }
            else {
              this.$notify({
                title: '错误',
                message: res.data.msg,
                type: 'error'
              })
            }
          }).catch((err) => {
            this.$notify({
              title: '错误',
              message: err,
              type: 'error'
            })
          })
        }})
    }
  },
}
</script>

<style scoped lang="scss">

</style>