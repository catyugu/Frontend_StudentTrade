<template>
<div>
  <el-container direction="vertical">
    <el-header>
      <header-card :header="{title:'Lecture Detail'}"></header-card>
    </el-header>
  </el-container>
</div>
</template>
<script >
import HeaderCard from '@/components/headerCard.vue';

export default {
  components: { HeaderCard },
  props:{
    lectureID:{
      type:String,
      default:''
    }
  },
  data(){
    return{
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
    this.getLectureInfoByID(this,this.lectureID);
  },
  methods:{
    getLectureInfoByID(context,lectureID){
      context.$axios.get('/lecture/'+lectureID)
      .then(res=>{
        this.lectureInfo=res.data.data;
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>