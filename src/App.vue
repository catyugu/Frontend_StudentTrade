<template>
  <div id="app">
    <el-button
      @click="drawer = true"
      type="primary"
      id="drawerButton"
      circle>
      <i class="el-icon-menu"> </i>
    </el-button>
    <el-drawer
      class="el-drawer"
      :visible.sync="drawer"
      direction="ltr"
      size="250px">
      <el-menu class="el-menu-vertical-demo"
               menu-trigger="hover"
               :collapse="false" :router="true"
               :collapse-transition="true"
               :default-active="$route.path">
        <el-menu-item v-for="m in menuList" :index="m.id" :key="m.id" :route="m.subpageRoute"
                      @click="drawer=false">
          <i :class="m.icon"></i>
          <span slot="title">{{ m.title }}</span>
        </el-menu-item>
      </el-menu>
    </el-drawer>
    <el-container direction="vertical">
      <el-main>
        <router-view>
        </router-view>
      </el-main>
    </el-container>
  </div>
</template>

<style>
.el-header {
  color: #333;
  text-align: center;
  font-size: 32px;
}

#drawerButton {
  position: fixed;
  top: 20px;
  left: 20px;
  width: 50px;
  height: 50px;
  z-index: 999;
}

.el-main {
  color: #333;
  text-align: center;
}

</style>

<script>


export default {
  data() {
    return {
      drawer: false,
      menuList: [
        {
          id: 1,
          title: '项目广场',
          subpageRoute: '/project',
          icon: 'el-icon-house'
        },
        {
          id: 2,
          title: '讲座中心',
          subpageRoute: '/lecture',
          icon: 'el-icon-s-check'
        },
        {
          id: 3,
          title: '用户信息',
          subpageRoute: '/user',
          icon: 'el-icon-user'
        },
        {
          id: 4,
          title: '帮助',
          subpageRoute: '/help',
          icon: 'el-icon-help'
        }
      ]
    };
  },
  methods: {
  },
  async created() {
    console.log('app created');
    let userState = await JSON.parse(localStorage.getItem('userState'));
    if (userState !== null) {
      await this.$store.dispatch('getUserStateFromLocalStorage');
      let promise =  await this.$store.dispatch('refreshUserInfo');
      if (promise === false)
      {
        console.log('refreshUserInfo failed');
        await this.$store.dispatch('logoutProcess')
        await this.$router.push('/user/login');
      }
    }else {
      await this.$router.push('/user/login');
    }
  },
}
</script>