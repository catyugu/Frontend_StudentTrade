<template>
  <div>
    <div class="project-display-list">
      <div class="project-display-list-item" v-for="(item, index) in list" :key="index">
        <project-card :i="item" />
      </div>
    </div>
  </div>
</template>
<script>
import ProjectCard from '@/components/projectCard.vue';

export default {
  components: { ProjectCard },
  props: {
    projectList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      list: this.projectList
    };
  },
  created() {
    for (let i = 0; i < this.projectList.length; i++) {
      this.list.push(this.$store.dispatch('getProjectInfoByID', this.projectList[i]), i);
    }
  },
};
</script>
<style scoped lang="scss">

</style>