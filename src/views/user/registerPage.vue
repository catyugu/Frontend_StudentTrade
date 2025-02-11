<template>
  <el-container direction="vertical">
    <el-header>
      注册
    </el-header>
    <el-main>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="emailCode">
          <el-col span="12"><el-input v-model="ruleForm.emailCode"></el-input></el-col>
          <el-col span="12"><el-button type="primary" @click="sendEmail">发送验证码</el-button></el-col>
        </el-form-item>
        <el-form-item label="姓名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
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
      ruleForm: {
        email: '',
        emailCode: '',
        username: '',
        password: '',
        checkPass: ''
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        emailCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
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
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    sendEmail() {
      this.$store.getters.host.post('/sendEmail', this.ruleForm).then((res) => {
        if (res.data.code === 0) {
          this.$notify({
            type: 'success',
            title: '发送成功！',
            message: '验证码已发送至邮箱！'
          });
        } else {
          this.$notify({
            type: 'error',
            title: '发送失败！',
            message: res.data.message
          });
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          try {
            this.$store.getters.host.post('/register', this.ruleForm).then((res) => {
              if (res.data.code === 0) {
                this.$notify({
                  type: 'success',
                  title: '注册成功！',
                  message: '注册成功!'
                });
                console.log(this.ruleForm);
                this.$router.push('/user/login');
              } else {
                this.$notify({
                  type: 'error',
                  title: '注册失败！',
                  message: res.data.message
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