
<template>
<div>
   <lecture-display-list :lectureList="lectureList" />
</div>
</template>
<script>
import LectureDisplayList from '@/components/lectureDisplayList.vue';

export default {
  components: { LectureDisplayList },
  data: () => {
    return {
      userID: '',
      lectureList: []
    };
  },
  methods: {
    getLectureList() {
      this.lectureList = this.$store.getters.getUserInfo.lectureUploadList;
    }
  },
  created() {
    this.userID = this.$route.query.userID;
    this.getLectureList();
  }
}

</script>

<style scoped lang="scss">

</style>