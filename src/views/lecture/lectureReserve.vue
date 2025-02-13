

<template>
<div>
  <el-container direction="vertical">
    <header-card :header="{title:'我预约的讲座'}" />
 <lecture-display-list :lectureList="lectureList" />
  </el-container>
</div>
</template>
<script>
import LectureDisplayList from '@/components/lectureDisplayList.vue';
import HeaderCard from '@/components/headerCard.vue';

export default {
  components: { HeaderCard, LectureDisplayList },
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