<template>
  <div>
    <div class="lecture-card">
      <el-row style="margin-top: 10px">
        <el-card :body-style="{ padding: '0px' }">
          <el-row>
            <el-col span="6" @click.native="goToLectureDetail">
              <img :src="img_src" class="image" alt="Image not found!">
            </el-col>
            <el-col span="12">
              <div class="card-info" @click="goToLectureDetail">
                <h1> {{ title }}</h1>
                <name-avatar :userID="speakerID"></name-avatar>
                <span> 地点: {{ place }}</span><br>
                <span> 时间: {{ time }}</span><br>
                <span> 预约人数: {{ reserve_num }}/{{ max_num }}</span><br>
              </div>
            </el-col>
            <el-col span="6">

              <div class="bottom clearfix">
                <el-button type="text" class="button" @click="goEditLecture"
                           v-if="speakerID === this.$store.getters.getUserID">
                  前往编辑<br>
                <el-button type="text" class="button" @click="expand">展开简介</el-button>
                </el-button>
              </div>
            </el-col>

          </el-row>
          <el-row v-if="showDescription">
            {{ this.description }}
          </el-row>
        </el-card>
      </el-row>
    </div>
  </div>
</template>
<script>
import NameAvatar from '@/components/nameAvatar.vue';

export default {
  components: { NameAvatar },
  props: {
    i: {
      type: Object,
      default: () => {
        return {
          img_src: '',
          title: '',
          speakerID: '',
          description: '',
          content: '',
          place: '',
          time: '',
          reserve_num: '',
          reserve_user_list: '',
          max_num: '',
          state: '',
          id: ''
        };
      }
    }
  },
  data() {
    return {
      showDescription: false,
      img_src: '',
      title: '',
      speakerID: '',
      description: '',
      content: '',
      place: '',
      time: '',
      reserve_num: '',
      reserve_user_list: '',
      max_num: '',
      state: '',
      id: ''
    };
  },
  created() {
    this.img_src = this.i.img_src;
    this.title = this.i.title;
    this.speakerID = this.i.speakerID;
    this.description = this.i.description;
    this.content = this.i.content;
    this.id = this.i.id;
    this.place = this.i.place;
    this.time = this.i.time;
    this.reserve_num = this.i.reserve_num;
    this.reserve_user_list = this.i.reserve_user_list;
    this.state = this.i.state;
    this.max_num = this.i.max_num;
  },
  methods: {
    expand() {
      this.showDescription = !this.showDescription;
    },
    goToLectureDetail() {
      this.$router.push({
        name: 'lectureDetail',
        query: {
          lectureID: this.id
        }
      });
    }
  }
};
</script>


<style scoped lang="scss">
h1 {
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
}

.lecture-card {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>