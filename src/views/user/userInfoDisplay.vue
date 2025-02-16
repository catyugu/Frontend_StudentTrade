<template>
  <div>

  </div>
</template>
<script>

export default ({
  data() {
    return {
      userID: '',
      userInfo: {
        avatar_src: '',
        name: '',
        gender: '',
        introduction: '',
        email: '',
        phone: ''
      }
    };
  },
  created() {
    this.userID = this.$route.query.userID;
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      this.$store.dispatch('getUserInfoByID', this.userID)
        .then(res => {
          this.userInfo = res.data.data;
        });
    }
  }
});
</script>

<style scoped lang="scss">

</style>