import Vue from 'vue';

export default {
  async searchLectures(context, query) {
    return context.state.http.get('/api/lecture/search', { params: { query } }).then(res => {
      return res.data.data;
    }).catch(err => {
      Vue.prototype.$notify({
        title: '搜索失败api',
        message: err.message,
        type: 'error'
      });
      return [];
    });
  },
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
  getUserStateFromLocalStorage(context) {
    console.log('getUserStateFromLocalStorage')
    let userState = JSON.parse(localStorage.getItem('userState'));
    console.log(userState)
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
  async logoutProcess(context) {
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
      }).finally(() => {
        return null;
      });
  },
  async refreshUserInfo(context) {
    return context.state.http.get('/api/user/userInfo/own').then(res => {
      context.state.userInfo = res.data.data;
      context.state.userID = res.data.data.id;
      context.dispatch('setUserInfoOnLocalStorage');
      return true;
    })
      .catch(err => {
        console.log(err);
        Vue.prototype.$notify({
          title: '获取用户信息失败',
          message: err.message,
          type: 'error'
        });
      }).finally(() => {
        return false;
      });
  },
  refreshProjectInfo(context, projectID) {
    context.state.http.get('/api/project/get/' + projectID).then(res => {
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
    context.state.http.get('/api/lecture/get/' + lectureID).then(res => {
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
    return context.state.http.get('/api/lecture/get/' + lectureID, { timeout: 3000 }).then(res => {
      console.log(res);
      return res.data.data;
    }).catch(err => {
      Vue.prototype.$notify({
        title: '获取讲座信息失败',
        message: err.message,
        type: 'error'
      });
      return null;
    });
  },
  reserveProcess(context, lectureID) {
    return context.state.http.post('/api/lecture/reserve?lectureId=' + lectureID + '&userId=' + context.getters.getUserID)
      .then(
        async res => {
          if (res.data.code === 0) {
            Vue.prototype.$notify({
              title: '预约成功',
              message: '预约成功',
              type: 'success'
            });
            await context.dispatch('refreshUserInfo');
            await context.dispatch('refreshLectureInfo', lectureID);
          } else {
            Vue.prototype.$notify({
              title: '预约失败',
              message: res.data.msg,
              type: 'error'
            });
          }
          return res.data;
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
    return context.state.http.post('/api/project/like?projectId=' + projectId + '&userId=' + context.getters.getUserID)
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
        } else {
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
    return context.state.http.post('/api/project/cancelLike?projectId=' + projectId + '&userId=' + context.getters.getUserID)
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
        } else {
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
  cancelReserveProcess(context, lectureID) {
    context.state.http.post('/api/lecture/cancelReserve?lectureId=' + lectureID + '&userId=' + context.getters.getUserID).then(
      async res => {
        console.log(res)
        if ( res.data.code === 0){
          Vue.prototype.$notify({
            title: '取消预约成功',
            message: '取消预约成功',
            type: 'success'
          });
          await context.dispatch('refreshUserInfo');
          await context.dispatch('refreshLectureInfo', lectureID);
          return res.data;
        }
        else {
          Vue.prototype.$notify({
            title: '取消预约失败',
            message: res.data.msg,
            type: 'error'
          });
          return null;
        }
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
  getLectureIDList(context) {
    return context.state.http.get('/api/lecture/lectures').then((res) => {
      console.log(res)
      return res.data.data;
    })
      .catch(err => {
        Vue.prototype.$notify({
          title: '获取讲座ID列表失败',
          message: err.message,
          type: 'error'
        });
        return null;
      });
  },
}
