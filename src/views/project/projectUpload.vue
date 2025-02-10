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
          </el-form-item>
          <el-form-item label="标题">
            <el-input v-model="form.title" />
          </el-form-item>
          <el-form-item label="简介">
            <el-input v-model="form.description" />
          </el-form-item>
          <el-form-item label="内容">
            <editorComponent v-model="form.content"/>
          </el-form-item>

        </el-form>
        <el-button type="primary" @click="ToUpload">上传</el-button>
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
        title: '',
        description: '',
        content: '',
        cover: ''
      },
      uploadUrl: 'http://localhost:8080/upload',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    };
  },
  methods: {
    ToUpload() {
      this.$axios.post('http://localhost:8080/project', {
        title: this.form.title,
        description: this.form.description,
        content: this.form.content,
        cover: this.form.cover
      }).then(res => {
        if (res.data.code === 200) {
          this.$message.success('上传成功');
          this.$router.push({
            name: 'projectHome'
          });
        }
      })
    }
  }
};
</script>
<style lang="scss" scoped>

</style>