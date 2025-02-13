import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {//全局变量
    isLogin: true,
    userID: '114514',
    userInfo: {
      avatar_src: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      username: 'xxx',
      nickname: 'xxx',
      gender: '男',
      type: '教职',
      school_serial: '519023598273',
      phone_number: '12345678901',
      email: 'xxx@sjtu.edu.com',
      projectLikeList: [],
      lectureReserveList: [],
      projectUploadList: [],
      lectureUploadList: []//These two lists are only for teacher (for them to
      // management and edit after publishing)
    },
    token: '114514',
    http: Axios,
    host: 'http://localhost:8080'
  },
  getters: {
    http: state => state.http,
    host: state => state.host,
    getToken: state => state.token,
    getUserInfo: state => state.userInfo,
    getIsLogin: state => state.isLogin,
    getUserID: state => state.userID
  },
  actions: {
    loginProcess(context, token, id) {
      context.state.isLogin = true;
      context.state.token = token;
      context.state.userID = id;
      context.state.http.defaults.headers.common['Authorization'] = token;
      this.$store.dispatch('getUserInfoByID', id).then(
        res => {
          context.state.userInfo = res.data;
        }
      ).catch(err => {
        Vue.prototype.$notify({
          title: '登录失败',
          message: err.message,
          type: 'error'
        });
      });
    },
    logoutProcess(context) {
      context.state.isLogin = false;
      context.state.userInfo = {};
      context.state.http.defaults.headers.common['Authorization'] = '';
    },
    setLocalUserInfo(context, userInfo) {
      context.state.userInfo = userInfo;
    },
    getUserInfoByID(context, userID) {
      context.state.http.get('/user/?' + userID).then(res => {
        context.state.userInfo = res.data;
        context.commit('setUserInfo', res.data);
      })
        .catch(err => {
          Vue.prototype.$notify({
            title: '获取用户信息失败',
            message: err.message,
            type: 'error'
          });
        });
    },
    refreshUserInfo(context) {
      context.state.http.get('/user/?' + context.state.userID).then(res => {
        context.state.userInfo = res.data;
        context.commit('setUserInfo', res.data);
      })
        .catch(err => {
          Vue.prototype.$notify({
            title: '获取用户信息失败',
            message: err.message,
            type: 'error'
          });
        });
    },
    getProjectInfoByID(context, projectID) {
      context.state.http.get('/project/?' + projectID).then(res => {
        return res.data;
      })
        .catch(err => {
          Vue.prototype.$notify({
            title: '获取项目信息失败',
            message: err.message,
            type: 'error'
          });
          return null;
        });
    },
    updateProjectInfoByID(context, projectID, projectInfo) {
      context.state.http.put('/project/?' + projectID, projectInfo).then(res => {
        return res.data;
      })
        .catch(err => {
          Vue.prototype.$notify({
            title: '更新项目信息失败',
            message: err.message,
            type: 'error'
          });
        });

    },
    getLectureInfoByID(context, lectureID) {
      context.state.http.get('/lecture/?' + lectureID, { timeout: 3000 }).then(res => {
        return res.data;
      }).catch(err => {
        Vue.prototype.$notify({
          title: '获取讲座信息失败',
          message: err.message,
          type: 'error'
        });
        return null;
      });
    },
    updateLectureInfoByID(context, lectureID, lectureInfo) {
      context.state.http.put('/lecture/?' + lectureID, lectureInfo).then(res => {
        return res.data;
      })
        .catch(err => {
          Vue.prototype.$notify({
            title: '更新讲座信息失败',
            message: err.message,
            type: 'error'
          });
        });
    },
    reserveProcess(context, lectureID, userID) {
      context.state.http.post('/lecture/reserve/?' + lectureID + '&' + userID).then(res => {
        return res.data;
      })
        .catch(err => {
          Vue.prototype.$notify({
            title: '预约失败',
            message: err.message,
            type: 'error'
          });
        });
    },
    getProjectIDList(context, start, end, params) {
      context.state.http.get('/project/list/?' + start + '&' + end + '&' + params).then(res => {
        return res.data;
      })
        .catch(err => {
          Vue.prototype.$notify({
            title: '获取项目ID列表失败',
            message: err.message,
            type: 'error'
          });
        });
    },
    getLectureIDList(context, start, end, params) {
      context.state.http.get('/lecture/list/?' + start + '&' + end + '&' + params).then(res => {
        return res.data;
      })
        .catch(err => {
          Vue.prototype.$notify({
            title: '获取讲座ID列表失败',
            message: err.message,
            type: 'error'
          });
        });
    }
  },
  mutations:{

  }
});
