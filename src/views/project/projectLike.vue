<template>
  <div>
    <el-container direction="vertical">
      <header-card :header="{title:'收藏项目'}" />
      <el-main class="project-list">
        <project-display-list :projectList="projectIDList" />
      </el-main>
    </el-container>

  </div>
</template>
<script>
import ProjectDisplayList from '@/components/projectDisplayList.vue';
import HeaderCard from '@/components/headerCard.vue';

export default {
  components: { HeaderCard, ProjectDisplayList },
  data() {
    return {
      userID: '',
      projectIDList: []
    };
  },
  async created() {
    this.userID = this.$route.query.userID;
    let info = await this.$store.dispatch('getUserInfoByID', this.userID);
    this.projectIDList = info.projectLikeList;
    console.log(info);
  }
};
</script>

<style scoped lang="scss">
.project-list {
  width: 80vw;
  align-self: center;
}
</style>