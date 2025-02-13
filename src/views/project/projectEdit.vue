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
          <el-form-item label="简介">
            <el-input v-model="form.description" />
          </el-form-item>
          <el-form-item label="内容">
            <editorComponent @contentData="updateContent"/>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="form.state" placeholder="请选择">
              <el-option label="未开始招募" value="未开始招募"></el-option>
              <el-option label="招募进行中" value="招募进行中"></el-option>
              <el-option label="招募暂停" value="招募暂停"></el-option>
              <el-option label="招募结束" value="招募结束"></el-option>
            </el-select>
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
      projectID: '',
      form: {
        title: '',
        description: '',
        content: '',
        cover: '',
        state: ''
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
      const isJPGorPNG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPGorPNG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPGorPNG && isLt2M;
    },
    uploadToServer() {
      console.log(this.form);
      this.$store.getters.http.post('/project/upload', {
        title: this.form.title,
        description: this.form.description,
        content: this.form.content,
        cover: this.form.cover,
        state: this.form.state,
        authorID: this.$store.getters.getUserID
      }).then(res => {
        if (res.data.code === 200) {
          this.$notify({
            type: 'success',
            title: '上传成功',
            message: '上传成功'
          });
          this.$store.dispatch('refreshUserInfo');
          this.$router.push('/project/home');
        } else {
          this.$notify({
            type: 'error',
            title: '上传失败',
            message: '上传失败'
          })
        }
      })
    },
    updateContent(content) {
      this.form.content = content;
    },
  },
  created() {
    this.projectID = this.$route.query.projectID;
    let form = this.$store.dispatch( 'getProjectInfoByID', this.projectID);
    if (form !== null){
      this.form = form;
    }else{
      /***/
    }

  }
};
</script>
<style lang="scss" scoped>

</style>