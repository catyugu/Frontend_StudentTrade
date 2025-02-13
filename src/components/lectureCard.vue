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
                  前往编辑
                </el-button><br>
                <el-button type="primary" class="button" @click="reserveLecture"
                v-if="state==='报名中' && !(this.$store.getters.getReserveList.includes(this.id))">
                  预约
                </el-button>
                <el-button type="primary" class="button" @click="cancelReservation"
                           v-if="state==='报名中' && (this.$store.getters.getReserveList.includes(this.id))">
                  取消预约
                </el-button><br>
                <el-button class="button" @click="goToLectureDetail"
                v-if="state==='已结束'">
                  讲座已结束，点此查看详情
                </el-button><br>
                <el-button type="text" class="button" @click="expand">展开简介</el-button>


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
          create_time: '',
          update_time: '',
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
      create_time: '',
      update_time: '',
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
    this.create_time = this.i.create_time;
    this.update_time = this.i.update_time;
    this.max_num = this.i.max_num;
  },
  methods: {
    expand() {
      this.showDescription = !this.showDescription;
    },
    reserveLecture() {
      this.$store.dispatch('reserveLecture', this.id, this.$store.getters.getUserID);
      this.$store.dispatch('refreshUserInfo');
    },
    goToLectureDetail() {
      this.$router.push({
        name: 'lectureDetail',
        query: {
          lectureID: this.id
        }
      });
    },
    goEditLecture() {
      this.$router.push({
        name: 'LectureEdit',
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
el-button {
  margin-top: 10px;
  padding-bottom: 10px;
}
.lecture-card {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>