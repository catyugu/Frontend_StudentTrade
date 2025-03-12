<template>
  <div>
    <el-container direction="vertical">
      <el-header>
        <header-card :header="{title: '项目详情'}"></header-card>
      </el-header>
      <el-main style="margin-top: 30px">
        <el-row>
          <el-col span=10>
            <img :src="projectInfo.coverSrc" alt="找不到封面"
            class="cover"/>
          </el-col>
          <el-col span=14 class="detail-info">
            <h1 class="project-title">{{ projectInfo.title }}</h1>
            <name-avatar :userID="projectInfo.authorId"></name-avatar>
            <br><span> 发布时间：{{ projectInfo.createTime }}</span>
            <br><span> 状态：{{ projectInfo.status }}</span>
            <br><span> 收藏数:{{projectInfo.like_num}}</span>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col span=24 class="brief-intro">
            <h2 style="font-size: larger"><b>项目概述</b></h2>
            <div v-html="projectInfo.description"
            style="text-align: left"></div>
          </el-col>
        </el-row>
        <el-row>
          <el-col span=24 class="project-content">
            <h2 style="font-size: larger"><b>项目详情</b></h2>
            <div v-html="projectInfo.content" class="project-content-child"
                 style="text-align: left"></div>
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
  font-size: 5vw;
  font-weight: bold;
  margin-bottom: 20px;
}
.brief-intro{
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ccc;
  div{
    font-size: 20px;
  }
}
.project-content{
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ccc;
  div{
    font-size: 20px;
  }
}
.project-content-child{
  display: flex;
  img{
    width: 100%;
  }
}
.detail-info{
  font-size: min(20px,3vw);
}
@media screen and (min-width: 768px) {
  .lecture-content-child{
    display: block;
  }
}
</style>