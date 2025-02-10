<template>
  <div>
    <el-container direction="vertical">
      <el-header style="padding-top: 20px;padding-bottom: 20px">
        讲座中心
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
        <div>
          <el-button
            type="primary"
            style="margin-top: 10px"
            @click="ToUpload"
            v-if="this.$store.getters.getIsLogin
          && this.$store.state.userInfo.type==='教职'">
            发布讲座
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

export default {
  components: { LectureCard },
  data() {
    return {
      object: {
        input: '',
        content: [
          {
            title: '讲座1',
            speaker: 'sxc',
            img_src: 'src/assets/logo.svg',
            description: '讲座描述',
            place: '讲座地点',
            time: '讲座时间',
            reserve_num: '0',
            max_num: '10',
            id: '1'
          }
        ]
      }
    };
  },
  methods: {
    load() {
      this.object.count += 2;
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
