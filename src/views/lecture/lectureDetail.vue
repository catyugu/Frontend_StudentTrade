<template>
<div>
  <el-container direction="vertical">
    <el-header>
      <header-card :header="{title:'讲座详情'}"></header-card>
    </el-header>
    <el-main style="margin-top: 30px">
      <el-row>
        <el-col span=10>
          <img :src="lectureInfo.coverSrc" alt="找不到封面"
               class="cover"/>
        </el-col>
        <el-col span=14 class="detail-info">
          <h1 class="lecture-title">{{ lectureInfo.title }}</h1>
          <name-avatar :userID="lectureInfo.speakerID"></name-avatar>
          <br>
          <span>地点： {{ lectureInfo.place }}</span>
          <br>
          <span> 时间: {{ lectureInfo.start_time.split('T')[0]
          + ' '+(lectureInfo.start_time.split('T')[1]).split('.')[0]
            }} ~ {{ lectureInfo.end_time.split('T')[0]
            + ' '+(lectureInfo.end_time.split('T')[1]).split('.')[0]
            }}</span><br>
          <span> 预约人数: {{ lectureInfo.current_num }}/{{ lectureInfo.max_num }}
              </span><br>
          <span> 预约状态: {{ lectureInfo.status }}</span>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <el-col span=24 class="brief-intro">
          <h2 style="font-size: larger"><b>讲座概述</b></h2>
          <div v-html="lectureInfo.description"
               style="text-align: left"></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col span=24 class="lecture-content">
          <h2 style="font-size: larger"><b>讲座详情</b></h2>
          <div v-html="lectureInfo.content" class="lecture-content-child"
               style="text-align: left"></div>
        </el-col>
      </el-row>

    </el-main>
  </el-container>
</div>
</template>
<script >
import HeaderCard from '@/components/headerCard.vue';
import NameAvatar from '@/components/nameAvatar.vue';

export default {
  components: { NameAvatar, HeaderCard },
  data(){
    return{
      // eslint-disable-next-line vue/no-dupe-keys
      lectureID:'',
      lectureInfo:{
        coverSrc:'',
        title:'',
        speakerID:'',
        description:'',
        place:'',
        start_time:'',
        end_time:'',
        current_num:'',
        max_num:'',
        id:''
      }
    }
  },
  async created(){
    // eslint-disable-next-line vue/no-mutating-props
    this.lectureID=this.$route.query.lectureID;
    this.lectureInfo = await this.$store.dispatch('getLectureInfoByID',this.lectureID)
  },
}
</script>

<style scoped lang="scss">
.cover{
  width: 100%;
  height: 100%;
}
.lecture-title{
  font-size: min(40px,5vw);
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
.lecture-content{
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ccc;
  div{
    font-size: 20px;
  }
}
.lecture-content-child{
  display: flex;
  img{
    width: 100%;
  }
}
.detail-info{
  font-size: min(20px,3vw);
  line-height: min(22px,3.1vw);
}
@media screen and (min-width: 768px) {
  .lecture-content-child{
    display: block;
  }
}
</style>