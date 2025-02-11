<template>
  <div>

  </div>
</template>
<script>

export default ({
  props: {
    teacherID: {
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
  methods: {
    getTeacherInfoByID() {
      this.$store.dispatch('getTeacherInfoByID', this.teacherID)
        .then(res => {
          this.teacherInfo = res.data.data;
        });
    }
  }
});
</script>

<style scoped lang="scss">

</style>