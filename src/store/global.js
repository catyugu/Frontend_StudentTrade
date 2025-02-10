import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {//全局变量
    isLogin: false,
    userInfo: {
      avatar_src:  'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      username: 'sxc',
      nickname: 'miaow',
      sex: '男',
      type: '教师',
      school_serial: '519023598273',
      phone_number: '12345678901',
      email: 'sxc@sxc.com',
    },
    projectList:[],
    lectureList:[],
    token: '',
    http: Axios,
    host: 'http://localhost:8080',
  },
  mutations: {//全局方法
  },
  actions: {//可以对mutations里的方法进行修改
  },
})