<template>
  <div>
    <el-container direction="vertical">
      <el-header style="padding-top: 20px;padding-bottom: 20px">
        用户信息
      </el-header>
      <el-main>
        <el-avatar :src="object.avatar_src || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
                   size="150"></el-avatar>
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
        <el-button v-if="disabled" type="primary" @click="UploadAvatar">上传头像</el-button>
        <el-button v-if="disabled" type="primary" @click="Edit">编辑</el-button>
        <el-button v-if="!disabled" type="success" @click="Save">保存</el-button>
        <el-button v-if="!disabled" @click="Discard">放弃</el-button>
        <el-button type="danger" @click="Logout" style="margin-top: 10px">登出</el-button>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
</style>
<script>

export default {
  data() {
    return {
      object: this.$store.state.userInfo,
      disabled: true,
      object_temp: null
    };
  },
  created() {
    if (!this.$store.state.isLogin) {
      this.$router.push('/user/login');
    }
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
    UploadAvatar() {
      this.$store.getters.http.post('/user/upload', {
        avatar_src: this.object.avatar_src
      }).then(res => {
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '上传成功'
          });
        }
      });
    },
    UploadUserInfo() {
      this.$store.getters.http.post('/api/user/update',
        {
          id: this.$store.getters.getUserID,
          nickname: this.object.nickname,
          type: this.object.type,
          school_serial: this.object.school_serial,
          gender: this.object.gender,
          phone_number: this.object.phone_number,
      },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => {
        console.log(res)
        if (res.data.code === 0) {
          this.$notify({
            type: 'success',
            title: '上传成功',
            message: '上传成功'
          });
          this.$store.dispatch('setUserInfoOnLocalStorage');
          this.disabled = true;
        }
      }).catch((err) => {
        this.object = this.object_temp;
        this.$notify({
          type: 'error',
          title: '上传失败',
          message: err.message
        });
      })
    }
  }
};
</script>