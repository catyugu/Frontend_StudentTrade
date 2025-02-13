<template>
  <div>
    <el-container direction="vertical">
      <header-card :header="{title:'项目广场'}" />
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
        <el-button
          v-if="this.$store.getters.getIsLogin"
          type="primary"
          @click="myLike"
          style="margin-top: 10px">
          项目收藏
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
        <div>
          <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
            <li v-for="(i, index) in object.content" :key="index">
              <project-card :i="i" />
            </li>
          </ul>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import ProjectCard from '@/components/projectCard.vue';
import HeaderCard from '@/components/headerCard.vue';

export default {
  components: { HeaderCard, ProjectCard },
  data() {
    return {
      object: {
        input: '',
        content: [
          {
            title: '项目1',
            authorID: '114514',
            img_src: 'src/assets/logo.svg',
            description: '项目描述',
            content: '项目内容',
            state: '招募中',
            create_time: '2022-05-05',
            update_time: '2022-05-05',
            like_num: '0',
            id: '1'
          },
          {
            title: '项目2',
            authorID: '1919810',
            img_src: 'src/assets/logo.svg',
            description: '项目描述',
            content: '项目内容',
            state: '暂停招募',
            create_time: '2022-03-04',
            update_time: '2022-03-04',
            like_num: '0',
            id: '2'
          }
        ]
      }
    };
  },
  methods: {
    load() {
      this.object.count += 2;
    },
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
