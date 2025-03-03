<template>
  <div>
    <el-container direction="vertical">
      <header-card :header="{title:'已发布项目'}" />
      <project-display-list :projectList="projectList" class="project-list" />
    </el-container>
  </div>
</template>
<script>
import ProjectDisplayList from '@/components/projectDisplayList.vue';
import HeaderCard from '@/components/headerCard.vue';

export default {
  name: 'projectManage',
  components: { HeaderCard, ProjectDisplayList },
  data() {
    return {
      userID: '',
      projectList: []
    };
  },
  mounted() {
    this.userID = this.$route.query.userID;
    this.getProjectList();
  },
  methods: {
    getProjectList() {
      this.projectList = this.$store.getters.getUserInfo.projectUploadList;
    }
  }
};
</script>

<style scoped lang="scss">
.project-list {
  width: 80vw;
  align-self: center;
}
</style>