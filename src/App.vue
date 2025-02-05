<template>
  <div id="app">
    <el-container direction="vertical">
      <el-header id="AppTitle">
        MyApplicationTitle
      </el-header>
      <el-main>
        <el-container direction="horizontal">
          <div>
            <el-menu class="el-menu-vertical-demo"
                     menu-trigger="hover"
                     :collapse="isCollapse" :router="true"
                     :default-active="$route.path">
              <el-button class="el-button--default" @click="isCollapse = !isCollapse">
                <i class="el-icon-s-fold"></i>
              </el-button>
              <el-menu-item v-for="m in menuList" :index="m.id" :key="m.id" :route="m.subpageRoute">
                <i class="el-icon-menu"></i>
                <span slot="title">{{ m.title }}</span>
              </el-menu-item>
            </el-menu>
          </div>
          <router-view>
          </router-view>
        </el-container>
      </el-main>
      <el-footer>
        footer
      </el-footer>
    </el-container>
  </div>
</template>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}

.el-menu-vertical-demo {
  min-height: 500px;
}

.el-header{
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
  font-size: 32px;
}
.el-footer{
  text-align: center;

}
.el-main {
  color: #333;
  line-height: 30px;
}
</style>

<script>


export default {
  data() {
    return {
      isCollapse: true,
      menuList: [
        {
          id: 1,
          title: '项目广场',
          subpageRoute: '/projectHome'
        },
        {
          id: 2,
          title: '用户',
          subpageRoute: '/userHome'
        },
        {
          id: 3,
          title: '设置',
          subpageRoute: '/editPage'
        },
        {
          id: 4,
          title: '关于',
          subpageRoute: '/aboutUs'
        },
      ]
    };

  },
  methods: {}
};
</script>