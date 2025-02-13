

<template>
<div>
 <lecture-display-list :lectureList="lectureList" />
</div>
</template>
<script>
import LectureDisplayList from '@/components/lectureDisplayList.vue';

export default {
  components: { LectureDisplayList },
  methods: {
  },
  props: {
    userID: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      lectureList: [],
    }
  },
  created() {
    this.lectureList = this.$store.state.userInfo.lectureReserveList;
  },
}
</script>
<style scoped lang="scss">

</style>