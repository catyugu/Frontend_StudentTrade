<template>
  <div>
    <el-container direction="vertical">
      <header-card :header="{title:'讲座中心'}" />
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
        <div>
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
        <div>
          <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
            <li v-for="(i, index) in object.content" :key="index">
              <lecture-card :i="i" />
            </li>
          </ul>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import LectureCard from '@/components/lectureCard.vue';
import HeaderCard from '@/components/headerCard.vue';

export default {
  components: { HeaderCard, LectureCard },
  data() {
    return {
      object: {
        input: '',
        content: [
          {
            title: '讲座1',
            speakerID: '114514',
            coverSrc: 'src/assets/logo.svg',
            description: '讲座描述',
            content: '讲座内容',
            place: '讲座地点',
            time: '讲座时间',
            reserve_num: '0',
            reserve_user_list: '',
            max_num: '10',
            status: '报名中',
            createTime: '2022-05-05',
            updateTime: '2022-05-05',
            id: '1'
          },
          {
            title: '讲座2',
            speakerID: '1919810',
            coverSrc: 'src/assets/logo.svg',
            description: '讲座描述',
            content: '讲座内容',
            place: '讲座地点',
            time: '讲座时间',
            reserve_num: '0',
            reserve_user_list: '',
            max_num: '10',
            status: '报名中',
            createTime: '2022-05-05',
            updateTime: '2022-05-05',
            id: '2'
          }
        ]
      }
    };
  },
  methods: {
    toUpload(){
      this.$router.push({
        name: 'lectureUpload'
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
