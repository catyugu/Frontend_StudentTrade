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
  line-height: 60px;
  font-size: 32px;
}

#drawerButton {
  position: fixed;
  top: 5px;
  left: 5px;
}

.el-main {
  color: #333;
  line-height: 30px;
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
          subpageRoute: '/projectHome',
          icon: 'el-icon-house'
        },
        {
          id: 2,
          title: '讲座预约',
          subpageRoute: '/lectureHome',
          icon: 'el-icon-s-check'
        },
        {
          id: 3,
          title: '用户',
          subpageRoute: '/userHome',
          icon: 'el-icon-user'
        },
        {
          id: 4,
          title: '帮助',
          subpageRoute: '/helpHome',
          icon: 'el-icon-help'
        }
      ]
    };

  },
  methods: {}
};
</script>