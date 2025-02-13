<template>
  <div>
    <el-container direction="vertical">
      <el-header>
        <header-card :header="{title: '项目详情'}"></header-card>
      </el-header>
      <el-main>
        <el-row>
          <el-col span=8>
            <img :src="projectInfo.img_src" alt="找不到封面"/>
          </el-col>
          <el-col span=16>
            <h1>项目名称：{{ projectInfo.title }}</h1>
            <name-avatar :userID="projectInfo.authorID"></name-avatar>
          </el-col>

        </el-row>

      </el-main>
    </el-container>
  </div>
</template>
<script>

import HeaderCard from '@/components/headerCard.vue';
import NameAvatar from '@/components/nameAvatar.vue';

export default {
  name: 'projectDetail',
  components: { NameAvatar, HeaderCard },
  data() {
    return {
      projectInfo: {
        img_src: '',
        title: '',
        authorID: '',
        description: '',
        content: '',
        id: ''
      }
    };
  },
  created() {
    this.projectInfo.id =  this.$route.query.projectID;
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