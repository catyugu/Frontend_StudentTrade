<template>
  <div>
    <el-container direction="vertical">
      <el-header>
        登录
      </el-header>
      <el-main>
        <el-form :model="loginForm" :rules="loginRules" ref="loginFormRef" label-width="100px" class="login-form">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="loginForm.password" show-password></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button type="primary" @click="register">注册</el-button>
      </el-main>

    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return;
        const res = await this.$http.post('/login', this.loginForm);
        if (res.data.code === 0) {
          this.$notify({
            title: '登录成功!',
            message: '登录成功!'
          });
          localStorage.setItem('token', res.data.token);
          this.$router.push('/');
        } else {
          this.$notify({
            title: '登录失败!',
            message: '登录失败!'
          });
        }
      });
    },
    register() {
      this.$router.push('/user/register');
    }
  }
};

</script>

<style scoped lang="scss">

</style>