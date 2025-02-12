<template>
<div>
    <div v-for="(i, index) in lectureList" :key="index">
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
    },

    data() {
      return {
        list: []
      }
    },
  }
}
</script>

<style scoped lang="scss">

</style>