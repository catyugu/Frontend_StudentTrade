<template>
  <div>
    <div @click="goToUserInfo">
      <img :src="userInfo.avatar" alt="avatar" class="avatar">
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

</style>