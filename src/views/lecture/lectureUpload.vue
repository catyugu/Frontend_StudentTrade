<template>
  <div>
    <el-container direction="vertical">
      <el-header>上传项目</el-header>
      <el-main>
        <el-form :model="form" label-width="80px" style="text-align: left">
          <el-form-item label="封面">
            <el-upload :action="uploadUrl" :headers="headers" :on-success="uploadSuccess" :before-upload="beforeUpload">
              <el-button>点击上传</el-button>
            </el-upload>
            <img :src="form.cover" alt=""/>
          </el-form-item>
          <el-form-item label="标题">
            <el-input v-model="form.title" />
          </el-form-item>
          <el-form-item label="地点">
            <el-input v-model="form.place" />
          </el-form-item>
          <el-form-item label="时间">
            <el-input v-model="form.time" />
          </el-form-item>
          <el-form-item label="最大人数">
            <el-input v-model="form.max_num" />
          </el-form-item>
          <el-form-item label="简介">
            <el-input v-model="form.description" />
          </el-form-item>
          <el-form-item label="内容">
            <editorComponent v-model="form.content" @contentData="updateContent"/>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="uploadToServer">上传</el-button>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import MultiEditor from '@/components/multiEditor.vue';

export default {
  components: {
    editorComponent: MultiEditor
  },
  data() {
    return {
      form: {
        cover: '',
        title: '',
        description: '',
        place: '',
        time: '',
        max_num: '',
        content: '',
      },
      uploadUrl: 'http://localhost:8080/upload',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
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
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG && !isPNG) {
        this.$message.error('上传图片只能是 JPG/PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isJPG || isPNG && isLt2M;
    },
    uploadToServer() {
      console.log(this.form); // 测试用
      this.$store.getters.http.post('/lecture/upload', {
        title: this.form.title,
        description: this.form.description,
        content: this.form.content,
        place: this.form.place,
        time: this.form.time,
        max_num: this.form.max_num,
        reserve_num: 0,
        cover: this.form.cover,
        authorID: this.$store.getters.getUserID
      }).then(res => {
        if (res.data.code === 200) {
          this.$notify({
            type: 'success',
            title: '上传成功',
            message: '上传成功'
          });
          this.$router.push('/lecture/home');
        } else {
          this.$notify({
            type: 'error',
            title: '上传失败',
            message: '上传失败'
          })
        }
      })
    },
    updateContent(content) { // 添加: 更新内容的方法
      this.form.content = content;
    }
  }
};
</script>
<style lang="scss" scoped>

</style>