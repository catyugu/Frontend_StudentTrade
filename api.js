import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080', // 根据实际情况调整
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  getProjectIDList() {
    return apiClient.get('/api/project/id-list');
  },
  getLectureIDList(start, end, params) {
    return apiClient.get(`/lecture/list/?start=${start}&end=${end}&params=${params}`);
  },
  getUserInfoByID(userID) {
    return apiClient.get(`/api/user/userInfo/?id=${userID}`);
  },
  refreshUserInfo() {
    return apiClient.get('/api/user/userInfo/own');
  },
  refreshProjectInfo(projectID) {
    return apiClient.get(`/project/?id=${projectID}`);
  },
  refreshLectureInfo(lectureID) {
    return apiClient.get(`/lecture/?id=${lectureID}`);
  },
  getProjectInfoByID(projectID) {
    return apiClient.get(`/project/?id=${projectID}`);
  },
  updateProjectInfoByID(projectID, projectInfo) {
    return apiClient.put(`/project/?id=${projectID}`, projectInfo);
  },
  getLectureInfoByID(lectureID) {
    return apiClient.get(`/lecture/?id=${lectureID}`);
  },
  updateLectureInfoByID(lectureID, lectureInfo) {
    return apiClient.put(`/lecture/?id=${lectureID}`, lectureInfo);
  },
  reserveProcess(lectureID, userID) {
    return apiClient.post(`/lecture/reserve/?lectureID=${lectureID}&userID=${userID}`);
  },
  likeProcess(projectID, userID) {
    return apiClient.post(`/project/like/?projectID=${projectID}&userID=${userID}`);
  },
  cancelLikeProcess(projectID, userID) {
    return apiClient.delete(`/project/like/?projectID=${projectID}&userID=${userID}`);
  },
  cancelReserveProcess(lectureID, userID) {
    return apiClient.post(`/lecture/reserve/?lectureID=${lectureID}&userID=${userID}`);
  },
  uploadProject(projectData) {
    return apiClient.post('/api/project/create', projectData);
  },
  // 其他 API 方法...
};