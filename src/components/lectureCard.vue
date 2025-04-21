<template>
  <div class="lecture-card-container">
    <div class="lecture-card">
      <el-row style="margin-top: 10px;">
        <el-card>
          <el-row class="card-body">
            <el-col span="12" @click.native="goToLectureDetail">
              <div style="height: inherit;">
                <img :src="thisLecture.coverSrc" class="image" alt="Image not found!">
              </div>
            </el-col>
            <el-col span="12" @click.native="goToLectureDetail">
              <h1> {{ thisLecture.title }}</h1>
              <br>
              <name-avatar :userID="thisLecture.speakerID"/>
              <br>
              <span> 地点: {{ thisLecture.place }}</span>
              <br>
              <span> 时间: {{ thisLecture.start_time.split('T')[0]
              + ' '+(thisLecture.start_time.split('T')[1]).split('.')[0]
                }} ~ <br>{{ thisLecture.end_time.split('T')[0]
              + ' '+(thisLecture.end_time.split('T')[1]).split('.')[0]
                }}</span>
              <br>
              <span> 预约人数: {{ thisLecture.current_num }}/{{ thisLecture.max_num }}
              </span>
              <br>
            </el-col>
          </el-row>
          <el-row class="card-button">
            <div class="button-group clearfix">
              <div v-if="thisLecture.speakerID === this.$store.getters.getUserID" class="button-father">
                <el-button type="success" class="button" @click="goEditLecture">
                  前往编辑
                </el-button>
              </div>
              <div v-if="!this.$store.getters.getIsLogin" class="button-father">
                <el-button type="primary" class="button" @click="goLogin">
                  登录后方可预约
                </el-button>
              </div>
              <div v-if="this.$store.getters.getIsLogin && thisLecture.status==='ON_GOING' &&
                 !(this.$store.getters.getReserveList.includes(this.lectureID))"
                   class="button-father">
                <el-button type="primary" class="button" @click="reserveLecture">
                  预约
                </el-button>
              </div>
              <div class="button-father"
                   v-if="this.$store.getters.getIsLogin && thisLecture.status==='ON_GOING' &&
                      (this.$store.getters.getReserveList.includes(this.lectureID))">
                <el-button type="primary" class="button" @click="cancelReservation"
                >
                  取消预约
                </el-button>
              </div>
              <div class="button-father" v-if="thisLecture.status==='FINISHED'">
                <el-button class="button" @click="goToLectureDetail">
                  预约结束
                </el-button>
              </div>
              <div class="button-father">
                <el-button type="text" class="button" @click="expand">
                  展开简介
                </el-button>
              </div>
            </div>
          </el-row>
          <el-row v-if="showDescription" class="lecture-description">
            <el-divider></el-divider>
            <span class="lecture-description"  v-text="thisLecture.description">
            </span>
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
    lectureID: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showDescription: false,
      thisLecture: {
        coverSrc: '',
        title: '',
        speakerID: '',
        id: '',
        description: '',
        content: '',
        place: '',
        start_time: '',
        end_time: '',
        current_num: '',
        reserve_user_list: '',
        max_num: '',
        status: '',
        createTime: '',
        updateTime: ''
      }
    };
  },
  watch: {
    async lectureID() {
      this.thisLecture = await this.$store.dispatch('getLectureInfoByID', this.lectureID);
    }
  },
  async created() {
    this.thisLecture = await this.$store.dispatch('getLectureInfoByID', this.lectureID);
  },
  methods: {
    expand() {
      this.showDescription = !this.showDescription;
    },
    async reserveLecture() {
      await this.$store.dispatch('reserveProcess', this.lectureID);
    },
    async cancelReservation() {
      await this.$store.dispatch('cancelReserveProcess',this.lectureID);
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
          lectureID: this.lectureID
        }
      });
    },
    goEditLecture() {
      this.$router.push({
        name: 'LectureEdit',
        query: {
          lectureID: this.lectureID
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

.lecture-card {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: min(2vw, 20px);
  line-height: 2.3vw;
  width: 100%;
}

.lecture-card-container {
  width: 100%;
}

.button {
  font-size: min(3vw, 28px);
  padding: 6px 10px;
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

.lecture-description {
  font-size: min(3vw, 20px);
  line-height: 2.5vw;
}
</style>