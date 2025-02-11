import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {//全局变量
    isLogin: true,
    userID: '114514',
    userInfo: {
      avatar_src:  'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      username: 'sxc',
      nickname: 'miaow',
      gender: '男',
      type: '教职',
      school_serial: '519023598273',
      phone_number: '12345678901',
      email: 'sxc@sxc.com',
    },
    projectList:[],
    lectureList:[],
    token: '114514',
    http: Axios,
    host: 'http://localhost:8080',
  },
  getters: {
     http: state => state.http,
     host: state => state.host,
     getToken: state => state.token,
     getUserInfo: state => state.userInfo,
     getProjectList: state => state.projectList,
     getLectureList: state => state.lectureList,
     getIsLogin: state => state.isLogin,
     getUserID: state => state.userID,
  },
  mutations: {//全局方法

  },
  actions: {//可以对mutations里的方法进行修改
    loginProcess(context, token) {
      context.state.isLogin = true;
      context.state.token = token;
      context.state.http.defaults.headers.common['Authorization'] = token;
      context.state.http.get('/user/?'+context.state.userID).then(res  => {
        context.state.userInfo = res.data;
        context.commit('setUserInfo', res.data);
      }).catch(err => {
        this.$notify(
          {
            title: '登录失败',
            message: err.message,
            type: 'error',
          }
        )
      })
    },
    logoutProcess(context){
      context.state.isLogin = false;
      context.state.userInfo = {};
      context.state.http.defaults.headers.common['Authorization'] = '';
    },
    setUserInfo(context, userInfo){
      context.state.userInfo = userInfo;
    },
    getUserInfoByID(context, userID){
      context.state.http.get('/user/?'+userID).then(res  => {
        context.state.userInfo = res.data;
        context.commit('setUserInfo', res.data);
      })
      .catch(err => {
        this.$notify(
          {
            title: '获取用户信息失败',
            message: err.message,
            type: 'error',
          }
        )
      })
    },
  },
})