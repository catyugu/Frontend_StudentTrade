<template>
  <div>
    <el-header style="padding-top: 20px;padding-bottom: 20px">
      <el-row>
        <el-col span="4">
          <br>
        </el-col>
        <el-col span="16">{{ title }}</el-col>
        <el-col span="4">
          <div v-if="$store.getters.getIsLogin">
            <el-dropdown>
              <span class="el-dropdown-link">
                {{ $store.getters.getUserInfo.name }}
                <el-avatar :src="$store.getters.getUserInfo.avatarSrc||'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"></el-avatar>
              </span>
              <el-dropdown-menu>
                <el-dropdown-item @click.native="userInfo">个人信息</el-dropdown-item>
                <el-dropdown-item @click.native="logout">登出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div v-else>
            <el-button type="primary" @click="toLogin">登录</el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>
  </div>
</template>

<script>
export default {
  props: {
    header: {
      type: Object,
      default: () => ({
        title: ''
      })
    }
  },
  data() {
    return {
      title: this.header.title
    };
  },
  methods: {
    toLogin() {
      this.$router.push({
        path: 'user/login'
      });
    },
    userInfo() {
      this.$router.push({
        path: 'user'
      });
    },
    logout() {
      this.$store.dispatch('logoutProcess');
      this.$router.push('/user/login');
    }
  }
};
</script>

<style scoped lang="scss">

</style>
