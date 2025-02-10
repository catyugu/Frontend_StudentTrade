<template>
  <div>
    <el-container direction="vertical">
      <el-header style="padding-top: 20px;padding-bottom: 20px">
        用户信息
      </el-header>
      <el-main>
        <el-avatar :src="avatar_src" size="150"></el-avatar>
        <el-form :model="object" label-width="80px">
          <el-form-item label="姓名">
            <el-input v-model="object.username" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="object.nickname" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="用户类型">
            <el-input v-model="object.type" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="学工号">
            <el-input v-model="object.school_serial" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="object.sex" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="object.phone_number" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="object.email" :disabled="disabled"></el-input>
          </el-form-item>
        </el-form>
        <el-button v-if="disabled" type="primary" @click="Edit">编辑</el-button>
        <el-button v-if="!disabled" type="primary" @click="Save">保存</el-button>
        <el-button v-if="!disabled" type="primary" @click="Discard">放弃</el-button>

        <el-button type="primary" @click="UploadAvatar">上传头像</el-button>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
</style>
<script>
export default {
  data() {
    return{
      avatar_src:  'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      object:{
        username: 'sxc',
        nickname: 'miaow',
        sex: '男',
        type: '学生',
        school_serial: '519023598273',
        phone_number: '12345678901',
        email: 'sxc@sxc.com',
      },
      disabled: true,
      object_temp: null
    }
  },
  methods: {
    Edit() {
      this.disabled = false;
      this.object_temp = Object.assign({}, this.object);
    },
    Save() {
      this.disabled = true;
      this.object_temp = null;
      this.UploadUserInfo();
    },
    Discard() {
      this.disabled = true;
      this.object = Object.assign({}, this.object_temp);
    },
    UploadAvatar() {

    },
    FetchUserInfoFromServer(){

    },

    UploadUserInfo(){

    }
  },
  onLoad() {
    this.FetchUserInfoFromServer();
  }
};
</script>