<template>
  <div>
    <div v-for="(i, index) in object.list" :key="index">
      <lecture-card :i="i"></lecture-card>
    </div>
  </div>
</template>
<script>
import LectureCard from '@/components/lectureCard.vue';

export default {
  components: { LectureCard },
  props: {
    lectureList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      object: {
        list: []
      }
    };
  },
  created() {
    for (let i = 0; i < this.lectureList.length; i++) {
      this.object.list.push(this.$store.dispatch('getLectureInfoByID', this.lectureList[i]), i);
    }
  }
};
</script>

<style scoped lang="scss">

</style>