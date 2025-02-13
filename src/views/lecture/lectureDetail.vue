<template>
<div>
  <el-container direction="vertical">
    <el-header>
      <header-card :header="{title:'Lecture Detail'}"></header-card>
    </el-header>
    <el-main>
      <div> ID:{{this.lectureID}}</div>
    </el-main>
  </el-container>
</div>
</template>
<script >
import HeaderCard from '@/components/headerCard.vue';

export default {
  components: { HeaderCard },
  data(){
    return{
      // eslint-disable-next-line vue/no-dupe-keys
      lectureID:'',
      lectureInfo:{
        img_src:'',
        title:'',
        speaker:'',
        description:'',
        place:'',
        time:'',
        reserve_num:'',
        max_num:'',
        id:''
      }
    }
  },
  created(){
    // eslint-disable-next-line vue/no-mutating-props
    this.lectureID=this.$route.query.lectureID;
    this.getLectureInfoByID(this.lectureID);
  },
  methods:{
    getLectureInfoByID(lectureID){
       this.$store.state.http.get('/lecture/'+lectureID)
      .then(res=>{
        this.lectureInfo=res.data.data;
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>