<template>
  <div>

  </div>
</template>
<script>

export default ({
  props: {
    userID: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      teacherInfo: {
        avatar: '',
        name: '',
        gender: '',
        introduction: '',
        email: '',
        phone: ''
      }
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      this.$store.dispatch('getUserInfoByID', this.userID)
        .then(res => {
          this.teacherInfo = res.data.data;
        });
    }
  }
});
</script>

<style scoped lang="scss">

</style>