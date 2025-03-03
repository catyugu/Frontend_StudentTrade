<template>
  <div class="project-card-container">
    <div class="project-card">
      <el-row style="margin-top: 10px;">
        <el-card>
          <el-row class="card-body">
            <el-col span="12" @click.native="goToProjectDetail">
              <div style="height: inherit;">
                <img :src="thisProject.coverSrc" class="image" alt="Image not found!">
              </div>
            </el-col>
            <el-col span="12" @click.native="goToProjectDetail">
              <h1>{{ thisProject.title }}</h1><br>
              <name-avatar :userID="thisProject.authorId" />
              <br>
              <span>更新时间：{{ thisProject.updateTime.split("T")[0] }}</span><br>
              <span>
                招募状态：{{getStatusText(thisProject.status) }}
              </span><br>
            </el-col>
          </el-row>
          <el-row class="card-button">
            <div class="button-group clearfix">
              <div v-if="!this.$store.getters.getIsLogin" class="button-father">
                <el-button type="primary" class="button" @click="goLogin">
                  登录后方可收藏
                </el-button>
              </div>
              <div v-if="thisProject.authorId === this.$store.getters.getUserID" class="button-father">
                <el-button type="success" class="button" @click="goEditProject">
                  前往编辑
                </el-button>
              </div>
              <div
                v-if="this.$store.getters.getIsLogin && !(this.$store.getters.getLikeList.includes(this.thisProject.id))"
                class="button-father">
                <el-button type="primary" class="button" @click="likeProject">
                  收藏项目
                </el-button>
              </div>
              <div
                v-if="(this.$store.getters.getIsLogin && this.$store.getters.getLikeList.includes(this.thisProject.id))"
                class="button-father">
                <el-button type="primary" class="button" @click="cancelLikeProject">
                  取消收藏
                </el-button>
              </div>
              <div class="button-father">
                <el-button class="button" type="text" @click="expand">展开简介</el-button>
              </div>
            </div>
          </el-row>
          <el-row class="card-description" v-if="showDescription">
            <el-divider></el-divider>
            <el-row>
              <span v-text="thisProject.description"></span>
            </el-row>
          </el-row>
        </el-card>
      </el-row>
    </div>
  </div>
</template>
<script>
import NameAvatar from '@/components/nameAvatar.vue';
export default {
  components: {NameAvatar },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showDescription: false,
      thisProject: {
        coverSrc: '',
        title: '',
        authorId: '',
        description: '',
        content: '',
        status: '',
        createTime: '',
        updateTime: '',
        like_num: '',
        id: ''
      }
    };
  },
  async created() {
    this.thisProject = await this.$store.dispatch('getProjectInfoByID', this.id);
  },
  methods: {
    expand() {
      this.showDescription = !this.showDescription;
    },
    getStatusText(status) {
      switch (status) {
        case 'ON_GOING':
          return '进行中';
        case 'FINISHED':
          return '招募已结束';
        case 'SUSPENDED':
          return '暂停招募';
        default:
          return status; // 默认情况下返回原始状态
      }
    },
    likeProject() {
      this.$store.dispatch('likeProcess', this.thisProject.id);
    },
    cancelLikeProject() {
      this.$store.dispatch('cancelLikeProcess', this.thisProject.id);
    },
    goLogin() {
      this.$router.push({
        name: 'Login'
      });
    },
    goToProjectDetail() {
      this.$router.push({
        name: 'projectDetail',
        query: {
          projectID: this.thisProject.id
        }
      });
    },
    goEditProject() {
      this.$router.push({
        name: 'ProjectEdit',
        query: {
          projectID: this.thisProject.id
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
h1 {
  font-weight: bold;
  font-size: 2.5vw;
}

.project-card {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 1.5vw;
  line-height: 1.7vw;
  width: 100%;
}
.project-card-container{
  width: 100%;
}

.button {
  font-size: 2vw;
  padding: 0.5vw 7%;
}

.button-father {
  margin: 3%;
}

.card-body {
  display: flex;
  flex-direction: row;
  margin: 5px 0;
}

.button-group {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>