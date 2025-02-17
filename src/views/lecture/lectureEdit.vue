<template>
  <div>
    <el-container direction="vertical">
      <header-card :header="{title:'讲座信息编辑'}" />
      <el-main>
        <el-form :model="form" label-width="80px" style="text-align: left">
          <el-form-item label="封面">
            <el-upload :action="uploadUrl" :headers="headers" :on-success="uploadSuccess" :before-upload="beforeUpload">
              <el-button>点击上传</el-button>
            </el-upload>
            <img :src="form.coverSrc" alt=""/>
          </el-form-item>
          <el-form-item label="标题">
            <el-input v-model="form.title" />
          </el-form-item>
          <el-form-item label="地点">
            <el-input v-model="form.place" />
          </el-form-item>
          <el-form-item label="时间">
            <el-date-picker
              v-model="form.start_time"
              type="datetime"
              placeholder="选择开始时间"
              :picker-options="pickerOptions"
            />
            <span> - </span>
            <el-date-picker
              v-model="form.end_time"
              type="datetime"
              placeholder="选择结束时间"
              :picker-options="pickerOptions"
            />
          </el-form-item>
          <el-form-item label="最大人数">
            <el-input v-model.number="form.max_num" />
          </el-form-item>
          <el-form-item label="简介">
            <el-input v-model="form.description" />
          </el-form-item>
          <el-form-item label="内容">
            <editorComponent @contentData="updateContent"/>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="uploadLectureToServer">上传</el-button>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import MultiEditor from '@/components/multiEditor.vue';
import HeaderCard from '@/components/headerCard.vue';

export default {
  components: {
    HeaderCard,
    editorComponent: MultiEditor
  },
  data() {
    return {
      lectureID: '',
      form: {
        coverSrc: '',
        title: '',
        description: '',
        place: '',
        start_time: '',
        end_time: '',
        max_num: '',
        content: '',
      },
      uploadUrl: 'http://localhost:8080/upload',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7; // 禁用今天之前的日期
        }
      }
    };
  },
  methods: {
    uploadSuccess(response) {
      this.form.cover = response.data.url; // 更新封面URL
      this.$message({
        type: 'success',
        message: '上传成功'
      });
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isJPG && !isPNG) {
        this.$message.error('上传图片只能是 JPG/PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 5MB!');
      }
      return (isJPG || isPNG) && isLt2M;
    },
    uploadLectureToServer() {
      console.log(this.form); // 测试用
      if (new Date(this.form.start_time) >= new Date(this.form.end_time)) {
        this.$message.error('开始时间必须早于结束时间');
        return;
      }
      if (this.form.max_num <= 0 || !Number.isInteger(this.form.max_num)) {
        this.$message.error('最大人数必须为正整数');
        return;
      }
      this.$store.getters.http.post('/lecture/upload', {
        title: this.form.title,
        description: this.form.description,
        content: this.form.content,
        place: this.form.place,
        start_time: this.form.start_time,
        end_time: this.form.end_time,
        max_num: this.form.max_num,
        reserve_num: 0,
        reserve_user_list: '',
        state: '',
        coverSrc: this.form.coverSrc,
        authorId: this.$store.getters.getUserID
      }).then(res => {
        if (res.data.code === 1) {
          this.$notify({
            type: 'success',
            title: '上传成功',
            message: '上传成功'
          });
          this.$store.dispatch('refreshUserInfo');
          this.$router.push('/lecture/home');
        } else {
          this.$notify({
            type: 'error',
            title: '上传失败',
            message: '上传失败'
          });
        }
      });
    },
    updateContent(content) { // 添加: 更新内容的方法
      this.form.content = content;
    }
  },
  created(){
    this.lectureID = this.$route.query.lectureID;
    console.log('lectureID:'+this.lectureID)
    let form = this.$store.dispatch('getLectureInfoByID', this.lectureID);
    if (form !== null){
      console.log(form)
      this.form = form;
    }else{
      /****/
    }
  }
};
</script>
<style lang="scss" scoped>

</style>