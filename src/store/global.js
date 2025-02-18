import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {//全局变量
    isLogin: false,
    userInfo: {
      id: '',
      avatarSrc: '',
      username: '',
      nickname: '',
      gender: '',
      type: '',
      school_serial: '',
      phone_number: '',
      email: '',
      createTime: '',
      updateTime: '',
      projectLikeList: [],
      lectureReserveList: [],
      projectUploadList: [],
      lectureUploadList: []
    },
    token: '114514',
    http: axios,
    host: 'http://localhost:8080'
  },
  getters: {
    http: state => state.http,
    host: state => state.host,
    getToken: state => state.token,
    getUserInfo: state => state.userInfo,
    getIsLogin: state => state.isLogin,
    getUserID: state => state.userInfo.id,
    getReserveList: state => state.userInfo.lectureReserveList,
    getLikeList: state => state.userInfo.projectLikeList
  },
  actions: {
    async loginProcess(context, token) {
      // 设置临时登录状态标志
      context.state.isFetchingUserInfo = true;
      // 更新 HTTP 请求头中的 Authorization 字段
      context.state.http.defaults.headers.common['Authorization'] = token;

      try {
        const res = await context.state.http.get(
          '/api/user/userInfo/own');
        console.log(res);
        if (res.data.data !== null) {
          context.state.userInfo = res.data.data;
          context.state.isLogin = true;
          context.state.token = token;
          let userState = {
            userInfo: res.data.data,
            token: token,
            isLogin: true,
          };
          localStorage.setItem('userState', JSON.stringify(userState));
          Vue.prototype.$notify({
            type: 'success',
            title: '登录成功!',
            message: '',
          });
          return true;
        } else {
          throw new Error('用户信息为空');
        }
      } catch (err) {
        console.error('登录失败:', err);
        Vue.prototype.$notify({
          title: '登录失败',
          message: err.message,
          type: 'error'
        });
        return false;
      } finally {
        context.state.isFetchingUserInfo = false;
      }
    },
    async getUserStateFromLocalStorage(context) {
      let userState = JSON.parse(localStorage.getItem('userState'));
      context.state.isLogin = userState.isLogin;
      context.state.userInfo = userState.userInfo;
      context.state.token = userState.token;
      context.state.http.defaults.headers.common['Authorization'] = context.state.token;
    },
    async setUserInfoOnLocalStorage(context) {
      let userState = {
        userInfo: context.state.userInfo,
        token: context.state.token,
        isLogin: true,
      };
      localStorage.setItem('userState', JSON.stringify(userState));
    },
    logoutProcess(context) {
      context.state.isLogin = false;
      context.state.userInfo = {};
      context.state.token = '';
      context.state.http.defaults.headers.common['Authorization'] = '';
      localStorage.removeItem('userState');
    },
    async getUserInfoByID(context, userID) {
      return context.state.http.get('/api/user/userInfo/' + userID).then(res => {
        return res.data.data;
      })
        .catch(err => {
          Vue.prototype.$notify({
            title: '获取用户信息失败',
            message: err.message,
            type: 'error'
          });
        }).finally(() => { return null;});
    },
    async refreshUserInfo(context) {
      return context.state.http.get('/api/user/userInfo/own').then(res => {
        console.log('-----------------------------------')
        context.state.userInfo = res.data.data;
        context.state.userID = res.data.data.id;
        context.dispatch('setUserInfoOnLocalStorage');
        console.log(context.getters.getUserID)
        return true;
      })
        .catch(err => {
          console.log(err);
          Vue.prototype.$notify({
            title: '获取用户信息失败',
            message: err.message,
            type: 'error'
          });
        }).finally(()=>{return false;});
    },
    refreshProjectInfo(context, projectID) {
      context.state.http.get('/project/?' + projectID).then(res => {
        return res.data;
      })
        .catch(err => {
          Vue.prototype.$notify({
            title: '更新项目信息失败',
            message: err.message,
            type: 'error'
          });
          return null;
        });
    },
    refreshLectureInfo(context, lectureID) {
      context.state.http.get('/lecture/?' + lectureID).then(res => {
        return res.data;
      })
        .catch(err => {
          Vue.prototype.$notify({
            title: '更新讲座信息失败',
            message: err.message,
            type: 'error'
          });
          return null;
        });
    },
    getProjectInfoByID(context, projectID) {
      return context.state.http.get('/api/project/get/' + projectID).then(res => {
        console.log(res)
        return res.data.data;
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
    getLectureInfoByID(context, lectureID) {
      return context.state.http.get('/lecture/?' + lectureID, { timeout: 3000 }).then(res => {
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
    reserveProcess(context, lectureID, userID) {
      context.state.http.post('/lecture/reserve/?' + lectureID + '&' + userID).then(res => {
        return res.data;
      })
        .then(
          res => {
            if (res.data.code === 0) {
              Vue.prototype.$notify({
                title: '预约成功',
                message: '预约成功',
                type: 'success'
              });
              this.$store.dispatch('refreshUserInfo');
              this.$store.dispatch('refreshLectureInfo', lectureID);
            }
          }
        )
        .catch(err => {
          Vue.prototype.$notify({
            title: '预约失败',
            message: err.message,
            type: 'error'
          });
        });
    },
    likeProcess(context, projectId) {
      return context.state.http.post( '/api/project/like?projectId='+ projectId + '&userId='+context.getters.getUserID)
        .then(async res => {
        console.log(res)
        if (res.data.code === 0) {
          Vue.prototype.$notify({
            title: '收藏成功',
            message: '收藏成功',
            type: 'success'
          });
          await context.dispatch('refreshUserInfo');
          await context.dispatch('refreshProjectInfo', projectId);
        }else{
          Vue.prototype.$notify({
            title: '收藏失败',
            message: res.data.msg,
            type: 'error'
          })
          return null;
        }
        return res.data;
      })
        .catch(err => {
          Vue.prototype.$notify({
            title: '收藏失败',
            message: err.message,
            type: 'error'
          });
        });
    },
    cancelLikeProcess(context, projectId) {
      return context.state.http.post('/api/project/cancelLike?projectId='+ projectId + '&userId='+context.getters.getUserID)
        .then(async res => {
        console.log(res)
        if (res.data.code === 0) {
          Vue.prototype.$notify({
            title: '取消收藏成功',
            message: '取消收藏成功',
            type: 'success'
          });
          await context.dispatch('refreshUserInfo');
          await context.dispatch('refreshProjectInfo', projectId);
        }else{
          Vue.prototype.$notify({
            title: '取消收藏失败',
            message: res.data.msg,
            type: 'error'
          });
          return null;
        }
        return res.data;
      }).catch(err => {
        Vue.prototype.$notify({
          title: '取消收藏失败',
          message: err.message,
          type: 'error'
        });
        return null;
      });
    },
    cancelReserveProcess(context, lectureID, userID) {
      context.state.http.post('/lecture/reserve/?' + lectureID + '&' + userID).then(res => {
        Vue.prototype.$notify({
          title: '取消预约成功',
          message: '取消预约成功',
          type: 'success'
        });
        context.dispatch('refreshUserInfo');
        context.dispatch('refreshLectureInfo', lectureID);
        return res.data;
      })
        .catch(err => {
          Vue.prototype.$notify({
            title: '取消预约失败',
            message: err.message,
            type: 'error'
          });
        });
    },
    getProjectIDList(context) {
      return context.state.http.get('/api/project/projects').then(res => {
        console.log(res);
        return res.data.data;
      })
      .catch(err => {
        Vue.prototype.$notify({
          title: '获取项目ID列表失败',
          message: err.message,
          type: 'error'
        });
        return null;
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
    },
  }
})
