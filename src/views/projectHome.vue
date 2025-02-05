<template>
  <div>
    <input v-model="object.message" placeholder="输入消息">
    <p v-if="object.state" v-text="reversedMessage"></p>
    <button @click="object.state = !object.state">
      {{ object.state ? "隐藏" : "显示" }}
    </button>

    <el-row>
      <el-button type="primary" @click="object.button_disabled = !object.button_disabled">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row>

    <el-row>
      <el-button type="primary" plain v-bind="{ disabled: object.button_disabled }">主要按钮</el-button>
      <el-button type="success" plain disabled>成功按钮</el-button>
      <el-button type="info" plain disabled>信息按钮</el-button>
      <el-button type="warning" plain disabled>警告按钮</el-button>
      <el-button type="danger" plain disabled>危险按钮</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      object: {
        message: 'Hello',
        state: true,
        button_disabled: true
      }
    };
  },
  onLoad() {
  },

  computed: {
    reversedMessage() {
      return this.object.message.split('').reverse().join('');
    }
  }
};
</script>

<style lang="scss"></style>
