<template>
  <div>
    <el-container direction="vertical">
      <el-header style="padding-top: 20px;padding-bottom: 20px">
        用户信息
      </el-header>
      <el-main>
        <el-avatar :src="object.avatarSrc || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
                   size="large"></el-avatar>
        <el-form :model="object" label-width="80px">
          <br>
          <el-form-item label="邮箱" style="text-align: left;">
            <el-input v-model="object.email" disabled></el-input>
            <span style="font-style: italic">备注：该项不可修改</span>
          </el-form-item>
          <el-form-item label="姓名" style="text-align: left;">
            <el-input v-model="object.username" disabled></el-input>
            <span style="font-style: italic">备注：该项不可修改</span>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="object.nickname" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="type" style="text-align: left">
            <el-select v-model="object.type" :disabled="disabled">
              <el-option label="本科以下" value="本科以下"></el-option>
              <el-option label="本科学生" value="本科学生"></el-option>
              <el-option label="硕士研究生" value="硕士研究生"></el-option>
              <el-option label="博士研究生" value="博士研究生"></el-option>
              <el-option label="博士后" value="博士后"></el-option>
              <el-option label="教职" value="教职"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学工号">
            <el-input v-model="object.school_serial" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="性别" style="text-align: left">
            <el-select v-model="object.gender" :disabled="disabled">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="object.phone_number" :disabled="disabled"></el-input>
          </el-form-item>
        </el-form>
        <el-button v-if="disabled" type="primary" @click="uploadAvatar">上传头像</el-button>
        <el-button v-if="disabled" type="primary" @click="Edit">编辑</el-button>
        <el-button v-if="!disabled" type="success" @click="Save">保存</el-button>
        <el-button v-if="!disabled" @click="Discard">放弃</el-button>
        <el-button type="danger" @click="Logout" style="margin-top: 10px">登出</el-button>
        <!-- 添加裁剪组件 -->
        <el-dialog :visible.sync="dialogVisible" title="裁剪头像">
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
      </el-main>
    </el-container>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css';
import VueCropper from 'vue-cropperjs';

export default {
  components: {
    VueCropper
  },
  data() {
    return {
      object: null,
      disabled: true,
      object_temp: null,
      dialogVisible: false,
      imageSrc: ''
    };
  },
  created() {
    if (!localStorage.getItem('userState')) {
      this.$router.push('/user/login');
    }
    this.object = JSON.parse(localStorage.getItem('userState')).userInfo;
  },
  methods: {
    Edit() {
      this.disabled = false;
      this.object_temp = Object.assign({}, this.object);
    },
    Save() {
      this.UploadUserInfo();
    },
    Discard() {
      this.disabled = true;
      this.object = this.object_temp;
      this.object_temp = null;
    },
    Logout() {
      this.$store.dispatch('logoutProcess');
      this.$router.push('/user/login');
    },
    uploadAvatar() {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          this.imageSrc = URL.createObjectURL(file);
          this.dialogVisible = true;
        }
      };
      input.click();
    },
    UploadUserInfo() {
      this.$store.getters.http.post('/api/user/update', {
        id: this.$store.getters.getUserID,
        nickname: this.object.nickname,
        type: this.object.type,
        school_serial: this.object.school_serial,
        gender: this.object.gender,
        phone_number: this.object.phone_number
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        if (res.data.code === 0) {
          this.$notify({
            type: 'success',
            title: '上传成功',
            message: '上传成功'
          });
          this.$store.dispatch('setUserInfoOnLocalStorage');
          this.$store.dispatch('getUserStateFromLocalStorage');
          this.disabled = true;
        }
      }).catch((err) => {
        this.object = this.object_temp;
        this.$notify({
          type: 'error',
          title: '上传失败',
          message: err.message
        });
      });
    },
    // 添加 cropImage 方法
    cropImage() {
      const canvas = this.$refs.cropper.getCroppedCanvas();
      const base64Image = canvas.toDataURL('image/png');

      // 移除所有非预期字符
      const cleanedBase64Image = base64Image.replace(/[^A-Za-z0-9+/=:;,]/g, '');

      console.log(cleanedBase64Image);
      this.$store.getters.http.post('/api/tool/image', cleanedBase64Image
        , {
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(res => {
        console.log(res);
        if (res.data.code === 0) {
          this.object.avatarSrc = res.data.data;
          this.$store.state.userInfo.avatarSrc = res.data.data;
          this.$store.getters.http.post('/api/user/update', {
            id: this.$store.getters.getUserID,
            avatarSrc: res.data.data
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          this.$store.dispatch('setUserInfoOnLocalStorage');
          this.$message({
            type: 'success',
            message: '上传成功'
          });
          this.dialogVisible = false;
        }
      }).catch(err => {
        this.$message({
          type: 'error',
          message: '上传失败: ' + err.message
        });
      });
    }

  },
};
</script>