<template>
  <div>
    <div class="project-card">
      <el-row style="margin-top: 10px">
        <el-card :body-style="{ padding: '0px' }">
          <el-row>
            <el-col span="8" @click.native="GoToProjectDetail">
              <img :src="img_src" class="image" alt="Image not found!">
            </el-col>
            <el-col span="16">
              <span v-text="title" @click="GoToProjectDetail"></span><br>
              <span v-text="author" @click="GoToProjectDetail"></span>
              <div class="bottom clearfix">
                <el-button type="text" class="button" @click="Expand">展开简介</el-button>
              </div>
            </el-col>
          </el-row>
          <el-row v-if="showDescription" >
            <el-row>
              <span v-text="description"></span>
            </el-row>
          </el-row>
        </el-card>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    i: {
      type: Object,
      default: () => {
        return {
          img_src: '',
          title: '',
          author: '',
          description: '',
          id: ''
        };
      }
    }
  },
  data() {
    return {
      showDescription: false,
      img_src: '',
      title: '',
      author: '',
      description: '',
      id: ''
    };
  },
  created() {
    this.img_src = this.i.img_src;
    this.title = this.i.title;
    this.author = this.i.author;
    this.description = this.i.description;
    this.id = this.i.id;
  },
  methods: {
    Expand() {
      this.showDescription = !this.showDescription;
    },
    GoToProjectDetail() {
      this.$router.push({
        name: 'projectDetail',
        params: {
          projectID: this.id
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
.project-card {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>