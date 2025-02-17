<template>
  <div>
    <div @click="goToUserInfo">
      <img :src="userInfo.avatarSrc||'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
           alt="avatar" class="avatar" />
      <div class="name">{{userInfo.name}}</div>
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
        avatar: '',
        name: '',
        id: ''
      }
    };
  },
  created() {
    this.getNameAvatar();
  },
  methods: {
    getNameAvatar() {
      this.userInfo.id = this.userID;
      if (this.$store.state.userInfo !== null){
        this.userInfo = this.$store.state.userInfo;
        return;
      }
      this.$store.dispatch('getUserInfoByID', this.userInfo.id).then(res => {
        this.userInfo = res.data.data;
      });
    },
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
  width: 30px;
  height: 30px;
}
</style>