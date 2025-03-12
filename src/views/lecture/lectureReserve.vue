

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
  async created() {
    this.userID = this.$route.query.userID
    let info = await this.$store.dispatch('getUserInfoByID', this.userID);
    this.lectureList = info.lectureReserveList;
  },
}
</script>
<style scoped lang="scss">

</style>