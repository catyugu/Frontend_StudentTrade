<template>
  <div>
    <div @click="goToUserInfo">
      <el-avatar :src="userInfo.avatarSrc||'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
           alt="avatar" class="avatar" />
      <div class="name">{{userInfo.username}}</div>
    </div>
  </div>
</template>
<script>

export default {
  props: {
    userID: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      userInfo: {
        avatarSrc: '',
        username: '',
        id: ''
      }
    };
  },
  watch: {
    async userID() {
      console.log(this.userID)
      this.userInfo = await this.$store.dispatch('getUserInfoByID', this.userID);
      console.log(this.userInfo)
    }
  },
  methods: {
    goToUserInfo() {
      this.$router.push({
        path: '/user/userInfoDisplay',
        query: {
          userID: this.userID
        }
      });
    }
  }

};
</script>

<style scoped lang="scss">

.avatar{
  width: 40px;
  height: 40px;
}
</style>