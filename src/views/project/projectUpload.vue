<template>
  <div>
    <el-container direction="vertical">
        <header-card :header="{title:'项目上传'}" />
      <el-main>
        <el-form :model="form" label-width="80px" style="text-align: left">
          <el-form-item label="封面">
            <el-button type="primary" @click="uploadCover">上传封面</el-button><br>
            <img :src="form.coverSrc" alt="" style="width: 60vw"/>
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
        <el-dialog :visible.sync="dialogVisible" title="裁剪封面">
          <vue-cropper
            ref="cropper"
            :src="imageSrc"
            :aspect-ratio="1"
            :view-mode="1"
            :guides="true"
            :auto-crop-area="0.5"
            :background="true"
            :rotatable="false"
            :scalable="false"
            shape="circle"
          ></vue-cropper>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="cropImage">确 定</el-button>
          </span>
        </el-dialog>
        <el-button type="primary" @click="uploadToServer">上传</el-button>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import MultiEditor from '@/components/multiEditor.vue';
import HeaderCard from '@/components/headerCard.vue';
import 'cropperjs/dist/cropper.css';
import VueCropper from 'vue-cropperjs';

export default {
  components: {
    HeaderCard,
    editorComponent: MultiEditor,
    VueCropper
  },
  data() {
    return {
      form: {
        title: '',
        description: '',
        content: '',
        coverSrc: '',
        state: ''
      },
      dialogVisible: false,
      imageSrc: ''
    };
  },
  methods: {
    uploadCover() {
      let input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (e) => {
        console.log(e.target.files)
        let file =  e.target.files[0];
        if (file) {
          this.imageSrc = URL.createObjectURL(file);
          this.$nextTick(() => {
            this.$refs.cropper.replace(this.imageSrc);
          });
          this.dialogVisible = true;
        }
      };
      input.click();
    },
    cropImage() {
      let canvas = this.$refs.cropper.getCroppedCanvas();
      console.log(canvas)
      const base64Image = canvas.toDataURL('image/png');
      const cleanedBase64Image = base64Image.replace(/[^A-Za-z0-9+/=:;,]/g, '');
      this.$store.getters.http.post('/api/tool/image', cleanedBase64Image
        , {
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((res)=>{
          if (res.data.code === 0) {
            this.form.coverSrc = res.data.data;
          }
          else{
            this.$notify({
              type: 'error',
              title: '上传失败',
              message: res.data.msg
            })
          }
          this.dialogVisible = false;
      }).catch((err)=>{
        this.$notify({
          type: 'error',
          title: '上传失败',
          message: err.message
        })
        this.dialogVisible = false;
      })
    },
    uploadToServer() {
      console.log(this.form);
      this.$store.getters.http.post('/api/project/create', {
        title: this.form.title,
        description: this.form.description,
        content: this.form.content,
        coverSrc: this.form.coverSrc,
        state: this.form.state,
        author_id: this.$store.getters.getUserID
      }).then(res => {
        console.log(res)
        if (res.data.code === 0) {
          this.$notify({
            type: 'success',
            title: '上传成功',
            message: '上传成功'
          });
          this.$store.dispatch('refreshUserInfo');
          // this.$router.push('/project/home');
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
    }
  }
};
</script>
<style lang="scss" scoped>

</style>