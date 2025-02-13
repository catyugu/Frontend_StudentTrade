<template>
  <div>
    <el-container direction="vertical">
      <header-card :header="{title:'我收藏的项目'}" />
    </el-container>
    <project-display-list :projectList="projectIDList" />
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
  created() {
    this.userID = this.$route.query.userID;
    this.getProjectList();
  },
  methods: {
    getProjectList() {
      this.projectIDList = this.$store.getters.getUserInfo.projectLikeList;
    }
  }
};
</script>

<style scoped lang="scss">

</style>