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
  methods: {}
};
</script>
<style scoped lang="scss">

</style>