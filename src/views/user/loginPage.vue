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
    async login() {
      const valid = await this.$refs.loginFormRef.validate();
      if (!valid) return;

      try {
        const res = await this.$store.getters.http.post('/login', this.loginForm);
        if (res.data.code === 0) {
          this.$notify({
            type: 'success',
            title: '登录成功!',
            message: '',
          });
          await this.$store.dispatch('loginProcess', res.data.token);
          await this.$router.push('/');
        } else {
          this.$notify({
            type: 'error',
            title: '登录失败!',
            message: res.data.message,
          });
        }
      } catch (error) {
        console.error('登录请求失败:', error);
        this.$notify({
          type: 'error',
          title: '登录失败!',
          message: '服务器请求失败，请稍后再试！'
        });
      }
    },
    register() {
      this.$router.push('/user/register');
    }
  }
};
</script>

<style scoped lang="scss">

</style>