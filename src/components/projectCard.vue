<template>
  <div>
    <div class="project-card">
      <el-row style="margin-top: 10px">
        <el-card :body-style="{ padding: '0px' }">
          <el-row>
            <el-col span="6" @click.native="goToProjectDetail">
              <img :src="img_src" class="image" alt="Image not found!">
            </el-col>
            <el-col span="12"  @click.native="goToProjectDetail">
              <span v-text="title"></span><br>
              <name-avatar :userID="authorID" /><br>
              <span>当前状态：{{state}}</span>
            </el-col>
            <el-col span="6">
              <el-button type="text" class="button" @click="goEditProject"
                         v-if="authorID === this.$store.getters.getUserID">
                前往编辑</el-button><br>
              <el-button type="text" class="button" @click="expand">展开简介</el-button>
            </el-col>
          </el-row>
          <el-row v-if="showDescription">
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
import NameAvatar from '@/components/nameAvatar.vue';

export default {
  components: { NameAvatar },
  props: {
    i: {
      type: Object,
      default: () => {
        return {
          img_src: '',
          title: '',
          authorID: '',
          description: '',
          content: '',
          state: '',
          like_num: '',
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
      authorID: '',
      description: '',
      content: '',
      state: '',
      like_num: '',
      id: ''
    };
  },
  created() {
    this.img_src = this.i.img_src;
    this.title = this.i.title;
    this.authorID = this.i.authorID;
    this.description = this.i.description;
    this.content = this.i.content;
    this.state = this.i.state;
    this.like_num = this.i.like_num;
    this.id = this.i.id;
  },
  methods: {
    expand() {
      this.showDescription = !this.showDescription;
    },
    goToProjectDetail() {
      this.$router.push({
        name: 'projectDetail',
        query: {
          projectID: this.id
        }
      });
    },
    goEditProject () {
      this.$router.push({
        name: 'ProjectEdit',
        query: {
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