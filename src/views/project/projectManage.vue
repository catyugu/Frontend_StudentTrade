<template>
  <div>
    <el-container direction="vertical">
      <header-card :header="{title:'我发布的项目'}" />
    </el-container>
    <project-display-list :projectList="projectList" />
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

</style>