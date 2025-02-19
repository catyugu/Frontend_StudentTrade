
<template>
<div>
  <el-container direction="vertical">
    <header-card :header="{title:'修改密码'}" />
    <el-main>
      <el-form :model="form" label-width="100px">
        <el-form-item label="旧密码">
          <el-input v-model="form.oldPassword" type="password" placeholder="请输入旧密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="form.newPassword" type="password" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码">
          <el-input v-model="form.confirmNewPassword" type="password" placeholder="请再次输入新密码"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="changePassword">修改密码</el-button>
    </el-main>
  </el-container>
</div>
</template>
<script>
import HeaderCard from '@/components/headerCard.vue';

export default {
  components: { HeaderCard },
  data() {
    return {
      form: {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      },

    }
  },
  methods: {
    changePassword() {
      if (this.form.newPassword !== this.form.confirmNewPassword) {
        this.$notify({
          title: '错误',
          message: '两次输入的密码不一致',
          type: 'error'
        })
        return;
      }
      console.log(this.$store.getters.getToken);
      this.$store.getters.http.post('/api/user/changePassword',
        null,{
        params:{
          oldPassword: this.form.oldPassword,
          newPassword: this.form.newPassword
        },
          headers: {
            'Content-Type': 'application/json',
            'Authorization': this.$store.getters.getToken
          },
        },
      ).then(res => {
        console.log(res)
          if (res.data.code === 0) {
            this.$notify({
              title: '成功',
              message: '修改密码成功，请重新登录',
              type: 'success'
            })
            this.$router.push('/user/login')
          }
          else {
            this.$notify({
              title: '错误',
              message: res.data.msg,
              type: 'error'
            })
          }
        }).catch((err) => {
          this.$notify({
            title: '错误',
            message: err,
            type: 'error'
          })
      })
    }
  },
  async mounted() {
    if (await this.$store.dispatch('refreshUserInfo')) {
      /***/
    } else {
      this.$notify({
        title: '错误',
        message: '认证用户信息失败',
        type: 'error'
      })
      await this.$router.push('/user/login')
    }
  }
}
</script>

<style scoped lang="scss">

</style>