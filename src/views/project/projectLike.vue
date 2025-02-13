<template>
  <div>
    <project-display-list :projectList="projectIDList" />
  </div>
</template>
<script>
import ProjectDisplayList from '@/components/projectDisplayList.vue';

export default {
  components: { ProjectDisplayList },
  data() {/***/},
  created() {
    this.userID = this.$route.params.userID;
  },
  methods: {}
};
</script>

<style scoped lang="scss">

</style>