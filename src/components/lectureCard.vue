<template>
  <div>
    <div class="lecture-card">
      <el-row style="margin-top: 10px;">
        <el-card :body-style="{ padding: '0px' }">
          <el-row class="card-body">
            <el-col span="6" @click.native="goToLectureDetail">
              <img :src="img_src" class="image" alt="Image not found!">
            </el-col>
            <el-col span="12">
              <div class="card-info" @click="goToLectureDetail">
                <h1> {{ title }}</h1>
                <name-avatar :userID="speakerID"></name-avatar>
                <br>
                <span> 地点: {{ place }}</span><br>
                <span> 时间: {{ time }}</span><br>
                <span> 预约人数: {{ reserve_num }}/{{ max_num }}</span><br>
              </div>
            </el-col>
            <el-col span="6">
              <div class="button-group clearfix">
                <div v-if="speakerID === this.$store.getters.getUserID" class="button-father">
                  <el-button type="success" class="button" @click="goEditLecture">
                    前往编辑
                  </el-button>
                  <br>
                </div>
                <div v-if="!this.$store.getters.getIsLogin" class="button-father">
                  <el-button type="primary" class="button" @click="goLogin">
                    登录后方可预约
                  </el-button>
                </div>
                <div v-if="this.$store.getters.getIsLogin && state==='报名中' &&
                 !(this.$store.getters.getReserveList.includes(this.id))"
                     class="button-father">
                  <el-button type="primary" class="button" @click="reserveLecture">
                    预约
                  </el-button>
                  <br>
                </div>
                <div class="button-father"
                      v-if="this.$store.getters.getIsLogin && state==='报名中' && (this.$store.getters.getReserveList.includes(this.id))">
                  <el-button type="primary" class="button" @click="cancelReservation"
                  >
                    取消预约
                  </el-button>
                  <br>
                </div>
                <div class="button-father" v-if="state==='已结束'">
                  <el-button class="button" @click="goToLectureDetail">
                    讲座已结束，点此查看详情
                  </el-button>
                  <br>
                </div>
                <div class="button-father">
                  <el-button type="text" class="button" @click="expand">
                    展开简介
                  </el-button>
                </div>
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
          coverSrc: '',
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
      coverSrc: '',
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
    this.img_src = this.i.coverSrc;
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
      this.$store.dispatch('reserveProcess', this.id, this.$store.getters.getUserID);
    },
    cancelReservation() {
      this.$store.dispatch('cancelReserveProcess', this.id, this.$store.getters.getUserID);
    },
    goLogin() {
      this.$router.push({
        name: 'Login'
      });
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
  font-weight: bold;
  font-size: clamp(1.2rem, 2.25vw, 2.25rem);
}
.button{
  font-size: clamp(0.8rem, 3vw, 1.5rem);
  padding: 10px 10px
}
.button-father{
  margin-top: 5%;
  margin-bottom: 5%;
}
.lecture-card {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: clamp(0.7rem, 1.5vw, 1.5rem);
}
.card-body{
  display: flex;
  flex-direction: row;
  margin: 5px 0;
}
.button-group {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>