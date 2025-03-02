<template>
  <div>
    <el-container direction="vertical">
      <el-header>
        <header-card :header="{title: '项目详情'}"></header-card>
      </el-header>
      <el-main>
        <el-row>
          <el-col span=8>
            <img :src="projectInfo.coverSrc" alt="找不到封面"
            class="cover"/>
          </el-col>
          <el-col span=16>
            <h1 class="project-title">{{ projectInfo.title }}</h1>
            <name-avatar :userID="projectInfo.authorId"></name-avatar>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col span=24 class="brief-intro">
            <div v-html="projectInfo.description"></div>
          </el-col>
        </el-row>
        <el-row>
          <el-col span=24 class="project-content">
            <div v-html="projectInfo.content"></div>
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
        coverSrc: '',
        title: '',
        authorId: '',
        description: '',
        content: '',
        status: '',
        createTime: '',
        updateTime: '',
        like_num: '',
        id: ''
      }
    };
  },
  created() {
    this.projectInfo.id =  this.$route.query.projectID;
    this.$store.dispatch('getProjectInfoByID', this.projectInfo.id).then((res) => {
      this.projectInfo = res;
    });
  },
};

</script>

<style scoped lang="scss">
.cover{
  width: 100%;
  height: 100%;
}
.project-title{
  font-size: 30px;
  margin-bottom: 30px;
}
.brief-intro{
  margin: 20px 0px;
  border: 1px solid #ccc;
  div{
    font-size: 20px;
  }
}
.project-content{
  margin: 20px 0px;
  border: 1px solid #ccc;
  div{
    font-size: 20px;
  }
}
</style>