<template>
  <div>
    <el-container direction="vertical">
      <header-card :header="{title:'项目广场'}" />
      <el-main style="text-align: center">

        <el-input class="searchBar"
                  @focus="focus" @blur="true" v-model="input" placeholder="请输入搜索内容" />
        <div class="block">
          <el-carousel height="25vw" type="card" class="carousel-container">
            <el-carousel-item v-for="item in scrollWin" :key="item">
              <h3 class="medium">
                <img :src=" item.coverSrc" alt="" class="carousel-image"
                @click="$router.push({name: 'projectDetail', query: {projectID: item.id}})"/>
              </h3>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="project-button-group">
        <el-button
          v-if="this.$store.getters.getIsLogin"
          type="primary"
          @click="myLike"
          style="margin-top: 10px">
          我的收藏
        </el-button>
        <el-button
          v-if="this.$store.getters.getIsLogin
          && this.$store.state.userInfo.type==='教职'"
          type="primary"
          @click="toUpload"
          style="margin-top: 10px">
          上传项目
        </el-button>
        <el-button
          v-if="this.$store.getters.getIsLogin
          && this.$store.state.userInfo.type==='教职'"
          type="primary"
          @click="projectManage"
          style="margin-top: 10px">
          项目管理
        </el-button>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center">
          <project-display-list style="width: 70vw;" :projectList="projectIDList" />
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import HeaderCard from '@/components/headerCard.vue';
import { nextTick } from 'vue';
import ProjectDisplayList from '@/components/projectDisplayList.vue';
export default {
  components: { ProjectDisplayList, HeaderCard },
  data() {
    return {
      projectIDList: [],
      scrollWin: [],
      input: '',
    }
  },
  methods: {
    toUpload() {
      this.$router.push(
          {
            path: '/project/upload',
            query: {
              userID: this.$store.state.userInfo.userID
            }
          }
      );
    },
    myLike() {
      this.$router.push(
        {
          name: 'projectLike',
          query: {
            userID: this.$store.getters.getUserID
          }
        }
      );
    },
    projectManage() {
      this.$router.push(
        {
          name:  'projectManage',
          query: {
            userID: this.$store.getters.getUserID
          }
        }
      );
    }
  },
  async created() {
    console.log('projectHome created');
    nextTick(async () => {
      try {
        this.projectIDList = await this.$store.dispatch('getProjectIDList');
        for (let i = 0; i < 3; i++){
          this.scrollWin.push(await this.$store.dispatch('getProjectInfoByID', this.projectIDList[i]));
        }
      } catch (error) {
        this.$notify({
          type: 'error',
          title: '获取项目列表失败!',
          message: '服务器请求失败，请稍后再试！'
        });
      }
    });
  }
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
  line-height: 200px;
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

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

</style>