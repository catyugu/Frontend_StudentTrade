<template>
  <div>
    <ul class="project-display-list">
      <li class="project-display-list-item" v-for="(item, index) in list" :key="index">
        <project-card :id="item" />
      </li>
    </ul>
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
      list: []
    };
  },
  watch: {
    projectList: {
      immediate: true,
      handler(newVal) {
        this.list = newVal;
      }
    }
  },
};
</script>
<style scoped lang="scss">
.project-display-list-item{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>