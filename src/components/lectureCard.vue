<template>
  <div>
    <div class="lecture-card">
      <el-row style="margin-top: 10px">
        <el-card :body-style="{ padding: '0px' }">
          <el-row>
            <el-col span="8">
              <img :src="img_src" class="image" alt="Image not found!">
            </el-col>
            <el-col span="16">
              <span> {{ title }}</span><br>
              <span> 主讲: {{ speaker }}</span><br>
              <span> 地点: {{ place }}</span><br>
              <span> 时间: {{ time }}</span><br>
              <span> 预约人数: {{ reserve_num }}/{{max_num}}</span><br>
              <div class="bottom clearfix">
                <el-button type="text" class="button">展开简介</el-button>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    i: {
      type: Object,
      default: () => {
        return {
          img_src: '',
          title: '',
          speaker: '',
          description: '',
          place: '',
          time: '',
          reserve_num: '',
          max_num: '',
          id: ''
        };
      }
    }
  },
  data() {
    return {
      img_src: '',
      title: '',
      speaker: '',
      description: '',
      place: '',
      time: '',
      reserve_num: '',
      max_num: '',
      id: ''
    };
  },
  created() {
    this.img_src = this.i.img_src;
    this.title = this.i.title;
    this.speaker = this.i.speaker;
    this.description = this.i.description;
    this.id = this.i.id;
    this.place = this.i.place;
    this.time = this.i.time;
    this.reserve_num = this.i.reserve_num;
    this.max_num = this.i.max_num;
  }
};
</script>


<style scoped lang="scss">

</style>