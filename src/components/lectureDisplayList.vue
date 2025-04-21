<template>
  <div>
    <ul class="lecture-display-list">
      <li class="lecture-display-list-item" v-for="(item, index) in list" :key="index" >
        <lecture-card :lectureID="item" />
      </li>
    </ul>
  </div>
</template>
<script>
import LectureCard from '@/components/lectureCard.vue';

export default {
  components: { LectureCard },
  data() {
    return {
      list: []
    };
  },
  methods: {
    updateList(newList) {
      this.list = newList;
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