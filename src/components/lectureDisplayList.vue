<template>
  <div>
    <ul class="lecture-display-list">
      <li v-for="(item, index) in list" :key="`${item}-${index}`" class="lecture-display-list-item">
        <LectureCard :lectureID="item" />
      </li>
    </ul>
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
      list: []
    };
  },
  watch: {
    lectureList() {
      this.list = this.lectureList;
    }
  }
};
</script>

<style scoped lang="scss">
.lecture-display-list-item{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>