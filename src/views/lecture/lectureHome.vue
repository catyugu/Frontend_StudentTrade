<template>
  <div>
    <el-container direction="vertical">
      <header-card :header="{title:'讲座中心'}" />
      <el-main style="text-align: center">
        <input class="searchBar"
                  placeholder="  请输入搜索内容"
                  v-model="lectureSearchInput"
                  @keyup.enter="search" />
        <div class="block">
          <el-carousel height="25vw" type="card" class="carousel-container">
            <el-carousel-item v-for="item in scrollWin" :key="item">
              <h3 class="medium">
                <img :src=" item.coverSrc" alt="" class="carousel-image"
                     @click="$router.push({name: 'lectureDetail', query: {lectureID: item.id}})" />
              </h3>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="lecture-button-group">
          <el-button
            type="primary"
            style="margin-top: 10px"
            @click="myReserve"
            v-if="this.$store.getters.getIsLogin">
            我的预约
          </el-button>
          <el-button
            type="primary"
            style="margin-top: 10px"
            @click="toUpload"
            v-if="this.$store.getters.getIsLogin
          && this.$store.state.userInfo.type==='教职'">
            发布讲座
          </el-button>
          <el-button
            type="primary"
            style="margin-top: 10px"
            @click="lectureManage"
            v-if="this.$store.getters.getIsLogin
          && this.$store.state.userInfo.type==='教职'">
            讲座管理
          </el-button>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center">
          <lecture-display-list
            ref="lectureDisplayList"
            :key="searchResultsKey"
            style="width: 70vw;" />
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import HeaderCard from '@/components/headerCard.vue';
import { nextTick } from 'vue';
import LectureDisplayList from '@/components/lectureDisplayList.vue';

export default {
  components: { LectureDisplayList, HeaderCard },
  data() {
    return {
      lectureIDList: [],
      searchResults: [],
      scrollWin: [],
      lectureSearchInput: '',
      searchResultsKey: 0
    };
  },
  methods: {
    async search() {
      try {
        console.log('开始搜索');
        if (this.lectureSearchInput === '') {
          this.searchResults = this.lectureIDList;
        } else {
          this.searchResults = await this.$store.dispatch('searchLectures', this.lectureSearchInput);
        }
        this.updateLectureDisplayList(this.searchResults);
      } catch (error) {
        console.error('搜索失败:', error);
        console.error('错误详情:', error.message);
        this.$notify({
          type: 'error',
          title: '搜索!',
          message: '服务器请求失败，请稍后再试！'
        });
      }
    },
    toUpload() {
      this.$router.push({
        name: 'LectureUpload',
        query: {
          userID: this.$store.state.userInfo.userID
        }
      });
    },
    myReserve() {
      this.$router.push({
        name: 'LectureReserve',
        query: {
          userID: this.$store.getters.getUserID
        }
      });
    },
    lectureManage() {
      this.$router.push({
        name: 'LectureManage',
        query: {
          userID: this.$store.getters.getUserID
        }
      });
    },
    updateLectureDisplayList(newList) {
      if (this.$refs.lectureDisplayList) {
        this.$refs.lectureDisplayList.updateList(newList);
      }
    }
  },
  async created() {
    console.log('lectureHome created');
    nextTick(async () => {
      try {
        this.lectureIDList = await this.$store.dispatch('getLectureIDList');
        this.searchResults = this.lectureIDList;
        for (let i = 0; i < 3; i++) {
          this.scrollWin.push(
            await this.$store.dispatch('getLectureInfoByID', this.lectureIDList[i])
          );
        }
        this.searchResultsKey++;
        this.updateLectureDisplayList(this.searchResults);
      } catch (error) {
        this.$notify({
          type: 'error',
          title: '搜索失败!',
          message: '服务器请求失败，请稍后再试！'
        });
      }
    });
  },
};
</script>

<style lang="scss">
.searchBar {
  margin-top: 20px;
  margin-bottom: 20px;
  width: 70vw;
  height: 40px;
  border-radius: 10px;
  font-size: 15px;
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

.lecture-button-group {
  el-button {
    padding: 5px 6px;
  }
}
</style>
