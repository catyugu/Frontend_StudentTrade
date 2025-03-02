<template>
  <div>
    <el-container direction="vertical">
      <header-card :header="{title:'用户信息'}" />
      <el-main>
        <el-row>
          <el-col :span="8">
            <el-avatar :src="userInfo.avatarSrc" alt="" class="avatar-display" />
          </el-col>
          <el-col :span="16" class="user-info-display">
            <el-card>
              <el-row>
                <el-col :span="8">
                  <span>用户名</span>
                </el-col>
                <el-col :span="16">
                  <span>{{userInfo.username}}</span>
                </el-col>
              </el-row><el-divider></el-divider>
              <el-row>
                <el-col :span="8">
                  <span>性别</span>
                </el-col>
                <el-col :span="16">
                  <span>{{userInfo.gender}}</span>
                </el-col>
              </el-row>
              <el-row><el-divider></el-divider>
                <el-col :span="8">
                  <span>邮箱</span>
                </el-col>
                <el-col :span="16">
                  <span>{{userInfo.email}}</span>
                </el-col>
              </el-row><el-divider></el-divider>
              <el-row>
                <el-col :span="8">
                  <span>电话</span>
                </el-col>
                <el-col :span="16">
                  <span>{{userInfo.phone_number}}</span>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="12">
            <h1 style="font-size: 3vw;"><b>TA的项目</b></h1>
            <project-display-list :projectList="userInfo.projectUploadList" />
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import HeaderCard from '@/components/headerCard.vue';
import ProjectDisplayList from '@/components/projectDisplayList.vue';
export default {
  components: {
    ProjectDisplayList,
    HeaderCard
  },
  data() {
    return {
      userID: '',
      userInfo: {
        avatarSrc: '',
        username: '',
        gender: '',
        projectUploadList: [],
        lectureReserveList: [],
        email: '',
        phone_number: ''
      }
    };
  },
  created() {
    this.userID = this.$route.query.userID;
    this.getUserInfo();
  },
  methods: {
    async getUserInfo() {
      this.userInfo = await this.$store.dispatch('getUserInfoByID', this.userID)
      console.log(this.userInfo)
    }
  }
};
</script>

<style scoped lang="scss">
.avatar-display {
  width: 15vw;
  height: 15vw;
}
.user-info-display {
  font-size: 2.2vw;
  margin-bottom: 20px;
}
.el-divider {
  margin: 1.5vh 0;
}
</style>