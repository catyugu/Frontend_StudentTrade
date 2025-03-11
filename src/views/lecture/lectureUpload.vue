<template>
  <div>
    <el-container direction="vertical">
      <header-card :header="{title:'讲座上传'}" />
      <el-main>
        <el-form :model="form" label-width="80px" style="text-align: left">
          <el-form-item label="封面">
            <el-button type="primary" @click="uploadCover">上传封面</el-button><br>
            <img :src="form.coverSrc" alt="" style="width: 60vw"/>
          </el-form-item>
          <el-form-item label="标题">
            <el-input v-model="form.title" />
          </el-form-item>
          <el-form-item label="地点">
            <el-input v-model="form.place" />
          </el-form-item>
          <el-form-item label="时间">
            <el-date-picker
              style="width: 80vw"
              v-model="form.start_time"
              type="datetime"
              placeholder="选择开始时间"
              :picker-options="pickerOptions"
            /><br><br>
            <el-date-picker
              style="width: 80vw"
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
        <el-dialog :visible.sync="dialogVisible" title="裁剪封面">
          <vue-cropper
            ref="cropper"
            :src="imageSrc"
            :toggleDragModeOnDblclick="false"
            :aspectRatio="4/3"
            :view-mode="1"
            :dragMode="'move'"
            :guides="true"
            :auto-crop-area="0.5"
            :background="true"
            :can-scale="true"
            :fixed-box="false"
            :cropBoxMovable="false"
            :cropBoxResizable="false"
            :rotatable="false"
            shape="circle"
          ></vue-cropper>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="cropImage">确 定</el-button>
          </span>
        </el-dialog>
        <el-button type="primary" @click="uploadLectureToServer">上传</el-button>
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
        coverSrc: '',
        title: '',
        description: '',
        place: '',
        start_time: '',
        end_time: '',
        max_num: '',
        content: '',
      },
      dialogVisible: false,
      imageSrc: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7; // 禁用今天之前的日期
        }
      }
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
      this.$store.getters.http.post('/api/lecture/create', {
        title: this.form.title,
        description: this.form.description,
        content: this.form.content,
        place: this.form.place,
        start_time: this.form.start_time,
        end_time: this.form.end_time,
        max_num: this.form.max_num,
        status: 'ON_GOING',
        coverSrc: this.form.coverSrc,
        speakerID: this.$store.getters.getUserID
      },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      ).then(res => {
        console.log(res)
        if (res.data.code === 0) {
          this.$notify({
            type: 'success',
            title: '上传成功',
            message: '上传成功'
          });
          this.$store.dispatch('refreshUserInfo');
          this.$router.push('/lecture');
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
  }
};
</script>
<style lang="scss" scoped>

</style>