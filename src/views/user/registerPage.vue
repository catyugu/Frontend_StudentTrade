<template>
  <el-container direction="vertical">
    <el-header>
      注册
    </el-header>
    <el-main>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="邮箱" prop="email" style="text-align: left;">
          <el-input v-model="ruleForm.email"></el-input>
          <el-button type="primary" style="margin-top: 10px"
                     @click="sendVerifyCode"
                      v-if="countdown === 0">发送验证码</el-button>
          <el-button v-if="countdown > 0" style="margin-top: 10px">
            等待{{ countdown }}秒后重试
          </el-button><br>
          <span style="font-style: italic">备注：邮箱为唯一标识，不可修改</span>

        </el-form-item>
        <el-form-item label="验证码" prop="verifyCode" style="text-align: left;">
          <el-input v-model="ruleForm.verifyCode"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="email" style="text-align: left;">
          <el-input v-model="ruleForm.username"></el-input>
          <span style="font-style: italic">备注：该项不可修改，请填写真实姓名,方便身份审核与师生联系</span>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button type="text" @click="goBack">返回</el-button>

    </el-main>
  </el-container>

</template>
<script>

export default {
  data() {
    return {
      countdown: 0,
      ruleForm: {
        email: '',
        username: '',
        password: '',
        checkPass: '',
        verifyCode: ''
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        username: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ],
        verifyCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 6, max: 6, message: '验证码为6位字符', trigger: 'blur'}
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        checkPass: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value !== this.ruleForm.password) {
                callback(new Error('两次输入密码不一致!'));
              } else {
                callback();
              }
            }, trigger: 'blur'
          }
        ]
      }
    };
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
    sendVerifyCode() {
      try {
        this.$store.getters.http.post('/api/user/sendVerifyCode', null, {
          params: {
            email: this.ruleForm.email
          }
        })
          .then((res) => {
            if (res.data.code === 0) {
              this.$notify({
                type: 'success',
                title: '发送成功！',
                message: '验证码已发送至邮箱，请注意查收！'
              });
              this.countdown = 60;
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
          message: '服务器请求失败，请稍后再试！'
      })}
    },
    goBack() {
      this.$router.go(-1);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          try {
            this.$store.getters.http.post('/api/user/register', null, {
                params: {
                  email: this.ruleForm.email,
                  username: this.ruleForm.username,
                  password: this.ruleForm.password,
                  verificationCode: this.ruleForm.verifyCode
                }
              })
              .then((res) => {
                if (res.data.code === 0) {
                  this.$notify({
                    type: 'success',
                    title: '注册成功！',
                    message: '注册成功!'
                  });
                  console.log(res);
                  this.$router.push('/user/login');
                } else {
                  this.$notify({
                    type: 'error',
                    title: '注册失败！',
                    message: res.data.msg
                  });
                }
              });
          } catch (error) {
            this.$notify({
              type: 'error',
              title: '注册失败！',
              message: '服务器请求失败，请稍后再试！'
            });
          }
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">

</style>