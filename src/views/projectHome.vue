<template>
  <div>
    <el-container direction="vertical">
      <el-header style="padding-top: 20px;padding-bottom: 20px">
        项目广场
      </el-header>
      <el-main>
        <el-input class="searchBar"
                  @focus="focus" @blur="true" v-model="object.input" placeholder="请输入搜索内容" />
        <div class="block">
          <el-carousel height="200px">
            <el-carousel-item v-for="item in 3" :key="item">
              <h3 class="small">{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </div>
        <el-row style="margin-top: 10px">
          <el-card :body-style="{ padding: '0px' }">
            <el-row>
              <el-col span="8">
                <img src="../assets/logo.svg" class="image">
              </el-col>
              <el-col span="16">
                <span>项目1</span><br>
                <span>作者</span>
                <div class="bottom clearfix">
                  <el-button type="text" class="button">展开简介</el-button>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      object: {
        message: 'Hello',
        state: true,
        input: ''
      }
    };
  },
  onLoad() {
  },

  computed: {}
};
</script>

<style lang="scss">
.searchBar {
  margin-top: 20px;
  margin-bottom: 20px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.image {
  width: 100%;
  display: block;
}
</style>
