<template>
  <div>
    <el-header style="margin-top: 20px;margin-bottom: 30px">
      <el-row>
<!--        <el-col span="4" style="text-align: left;">-->
<!--          <el-button class="back-button" @click="routeReturn"-->
<!--          v-if="this.$route.path.split('/').length > 2">-->
<!--           <el-icon :size="20" color="#409EFF" class="el-icon-back"></el-icon>返回</el-button>-->
<!--          <div v-else>  &nbsp;</div>-->

<!--        </el-col>-->
        <el-col span="4"> &nbsp; </el-col>
        <el-col span="16" style="font-weight: bold;
        font-size: 30px">{{ title }}</el-col>
        <el-col span="4">
          <div v-if="$store.getters.getIsLogin">
            <el-dropdown>
              <span class="el-dropdown-link">
                {{ $store.getters.getUserInfo.name }}
                <el-avatar
                  style="width: 40px; height: 40px"
                  :src="$store.getters.getUserInfo.avatarSrc||'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"></el-avatar>
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
    },
    routeReturn() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped lang="scss">
.back-button {
  padding: 5px 5px;
}
</style>
