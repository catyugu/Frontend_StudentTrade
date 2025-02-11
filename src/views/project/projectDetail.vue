<template>
  <div>
    <el-container direction="vertical">
      <el-header>
        <header-card :header="{title: '项目详情'}"></header-card>
      </el-header>

    </el-container>
  </div>
</template>
<script>

import HeaderCard from '@/components/headerCard.vue';

export default {
  name: 'projectDetail',
  components: { HeaderCard },
  props: {
    projectID: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      projectInfo: {
        img_src: '',
        title: '',
        author: '',
        description: '',
        content: '',
        id: ''
      }
    };
  },
  created() {
    this.projectInfo.id = this.projectID;
    this.getProjectInfoByID(this, this.projectID).then(res => {
      this.projectInfo = res.data.data;
    });
  },
  methods: {
    getProjectInfoByID(context, projectID) {
      return context.state.http.get(context.state.host + '/project/getProjectInfoByID', {
        params: {
          id: projectID
        }
      });
    }
  }
};

</script>

<style scoped lang="scss">

</style>