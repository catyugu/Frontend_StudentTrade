<template>
  <div>
    <project-display-list :projectList="projectList" />
  </div>
</template>
<script>
import ProjectDisplayList from '@/components/projectDisplayList.vue';

export default {
  name: 'projectManage',
  components: { ProjectDisplayList },
  data() {
    return {
      userID: '',
      projectList: []
    };
  },
  created() {
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