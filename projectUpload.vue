uploadToServer() {
  console.log(this.form);
  api.uploadProject({
    title: this.form.title,
    description: this.form.description,
    content: this.form.content,
    coverSrc: this.form.coverSrc,
    state: this.form.state,
    authorId: this.$store.getters.getUserID
  }).then(res => {
    console.log(res)
    if (res.data.code === 0) {
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
}