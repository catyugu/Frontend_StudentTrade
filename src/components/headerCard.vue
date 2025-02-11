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
                <el-avatar :src="$store.getters.getUserInfo.avatar_src"></el-avatar>
              </span>
              <el-dropdown-menu>
                <el-dropdown-item @click.native="UserInfo">个人信息</el-dropdown-item>
                <el-dropdown-item @click.native="Logout">登出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div v-else>
            <el-button type="primary" @click="ToLogin">登录</el-button>
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
    ToLogin() {
      this.$router.push({
        path: 'user/login'
      });
    },
    UserInfo() {
      this.$router.push({
        path: 'user'
      });
    },
    Logout() {
      this.$store.dispatch('logoutProcess');
    }
  }
};
</script>

<style scoped lang="scss">

</style>
