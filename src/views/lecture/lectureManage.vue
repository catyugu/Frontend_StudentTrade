
<template>
<div>
  <el-container direction="vertical">
    <header-card :header="{title:'我发布的讲座'}" />
   <lecture-display-list :lectureList="lectureList" />
  </el-container>
</div>
</template>
<script>
import LectureDisplayList from '@/components/lectureDisplayList.vue';
import HeaderCard from '@/components/headerCard.vue';

export default {
  components: { HeaderCard, LectureDisplayList },
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
  mounted() {
    this.userID = this.$route.query.userID;
    this.getLectureList();
  }
}

</script>

<style scoped lang="scss">

</style>