

<template>
<div>
 <lecture-display-list :lectureList="lectureList" />
</div>
</template>
<script>
import LectureDisplayList from '@/components/lectureDisplayList.vue';

export default {
  components: { LectureDisplayList },
  methods: {
  },
  data() {
    return {
      userID: '',
      lectureList: [],
    }
  },
  created() {
    this.userID = this.$route.query.userID
    this.lectureList = this.$store.state.userInfo.lectureReserveList;
  },
}
</script>
<style scoped lang="scss">

</style>