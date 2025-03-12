<template>
  <div id="app">
    <div class="fixed-button-group">
      <el-button
        @click="drawer = true"
        type="primary"
        class="drawerButton"
        circle>
        <i class="el-icon-menu"> </i>
      </el-button><br>
      <el-button
        @click="$router.back()"
        type="primary"
        class="drawerButton"
        circle>
        <i class="el-icon-d-arrow-left"> </i>
      </el-button><br>
      <el-button
        @click= "refreshPage"
        type="primary"
        class="drawerButton"
        circle>
        <i class="el-icon-refresh"> </i>
      </el-button><br>
      <el-button
        @click= "scrollTop"
        type="primary"
        class="drawerButton"
        circle>
        <i class="el-icon-arrow-up"> </i>
      </el-button><br>
    </div>
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
  line-height: 60px;
  font-size: 32px;
}

.fixed-button-group {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 999;
  .drawerButton {
    width: 45px;
    height: 45px;

  }
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
    refreshPage(){
      window.location.reload();
    },
    scrollTop(){
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  },

};
</script>