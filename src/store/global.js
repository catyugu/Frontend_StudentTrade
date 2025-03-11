import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import api from '@/api/api';
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
    token: '',
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
    async loginProcess(context, token){
      return await api.loginProcess(context,token)
    },
    async getUserStateFromLocalStorage(context) {
       return await api.getUserStateFromLocalStorage(context)
    },
    async setUserInfoOnLocalStorage(context) {
      return await api.setUserInfoOnLocalStorage(context)
    },
    logoutProcess(context) {
      return api.logoutProcess(context);
    },
    async getUserInfoByID(context, userID) {
      return await api.getUserInfoByID(context, userID)
    },
    async refreshUserInfo(context) {
      return await api.refreshUserInfo(context)
    },
    refreshProjectInfo(context, projectID) {
      return api.refreshProjectInfo(context, projectID)
    },
    refreshLectureInfo(context, lectureID) {
      return api.refreshLectureInfo(context, lectureID)
    },
    getProjectInfoByID(context, projectID) {
      return api.getProjectInfoByID(context, projectID)
    },
    getLectureInfoByID(context, lectureID) {
      return api.getLectureInfoByID(context, lectureID)
    },
    reserveProcess(context, lectureID, userID) {
      return api.reserveProcess(context, lectureID, userID)
    },
    likeProcess(context, projectId) {
      return api.likeProcess(context, projectId)
    },
    cancelLikeProcess(context, projectId) {
      return api.cancelLikeProcess(context, projectId)
    },
    cancelReserveProcess(context, lectureID, userID) {
      return api.cancelReserveProcess(context, lectureID, userID)
    },
    getProjectIDList(context) {
      return api.getProjectIDList(context)
    },
    getLectureIDList(context) {
      return api.getLectureIDList(context)
    },
  }
})
