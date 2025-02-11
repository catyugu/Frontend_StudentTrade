<template>
  <div>
    <div>
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
  methods: {
    getNameAvatar() {
      this.userInfo.id = this.userID;
      this.$store.dispatch('getUserInfoByID', this.userInfo).then(res => {
        this.userInfo = res.data.data;
      });
    }
  }

};
</script>

<style scoped lang="scss">

</style>