<template>
  <div>
    <el-container direction="vertical">
      <el-header>
        登录
      </el-header>
      <el-main>
        <el-form :model="loginForm" :rules="loginRules" ref="loginFormRef" label-width="100px" class="login-form">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="loginForm.email"></el-input>
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
        email: '',
        password: ''
      },
      loginRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
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
        const res = await this.$store.getters.http.post('/api/user/login',null,
          {params:{
              email:this.loginForm.email,
              password:this.loginForm.password
          }})
        if (res.data.code === 0) {
          if (await this.$store.dispatch('loginProcess', res.data.data.token, res.data.data.id)){
            await this.$router.push('/');
          }
        } else {
          this.$notify({
            type: 'error',
            title: '登录失败!',
            message: res.data.msg,
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