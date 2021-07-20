import request from '@/utils/request'

const BASE_URL = 'http://127.0.0.1:8080'

const api = {
  user: '/user',
  role: '/role',
  service: '/service',
  permission: '/permission',
  permissionNoPager: '/permission/no-pager',
  orgTree: '/org/tree',
  studentFind: '/student/find',
  studentCreate: '/student/create',
  courseOrderFind: '/course_order/find',
  courseOrderCreate: '/course_order/create',
  lessonFind: '/lesson/find',
  lessonCreate: '/lesson/create',
  classFind: '/class/find',
  classCreate: '/class/create',
  getAllClass: '/class/getAll',
  getAllCourseware: '/courseware/getAll',
  getAllSubject: '/subject/getAll'
}

export default api

export function getUserList (parameter) {
  return request({
    url: api.user,
    method: 'get',
    params: parameter
  })
}

export function getRoleList (parameter) {
  return request({
    url: api.role,
    method: 'get',
    params: parameter
  })
}

export function getServiceList (parameter) {
  return request({
    url: api.service,
    method: 'get',
    params: parameter
  })
}

export function getPermissions (parameter) {
  return request({
    url: api.permissionNoPager,
    method: 'get',
    params: parameter
  })
}

export function getOrgTree (parameter) {
  return request({
    url: api.orgTree,
    method: 'get',
    params: parameter
  })
}

// id == 0 add     post
// id != 0 update  put
export function saveService (parameter) {
  return request({
    url: api.service,
    method: parameter.id === 0 ? 'post' : 'put',
    data: parameter
  })
}

export function saveSub (sub) {
  return request({
    url: '/sub',
    method: sub.id === 0 ? 'post' : 'put',
    data: sub
  })
}

export function getStudentList (parameter) {
  return request({
    url: BASE_URL + api.studentFind,
    method: 'get',
    params: parameter
  })
}

export function getCourseOrderList (parameter) {
  return request({
    url: BASE_URL + api.courseOrderFind,
    method: 'get',
    params: parameter
  })
}

export function getLessonList (parameter) {
  return request({
    url: BASE_URL + api.lessonFind,
    method: 'get',
    params: parameter
  })
}

export function getClassList (parameter) {
  return request({
    url: BASE_URL + api.classFind,
    method: 'get',
    params: parameter
  })
}

export function getAllClass (parameter) {
  return request({
    url: BASE_URL + api.getAllClass,
    method: 'get',
    params: parameter
  })
}

export function getAllCourseware (parameter) {
  return request({
    url: BASE_URL + api.getAllCourseware,
    method: 'get',
    params: parameter
  })
}

export function getAllSubject (parameter) {
  return request({
    url: BASE_URL + api.getAllSubject,
    method: 'get',
    params: parameter
  })
}

export function createStudent (parameter) {
  console.log('param: ', parameter)
  return request({
    url: BASE_URL + api.studentCreate,
    method: 'post',
    params: parameter
  })
}

export function createCourseOrder (parameter) {
  console.log('param: ', parameter)
  return request({
    url: BASE_URL + api.courseOrderCreate,
    method: 'post',
    params: parameter
  })
}

export function createLesson (parameter) {
  console.log('param: ', parameter)
  return request({
    url: BASE_URL + api.lessonCreate,
    method: 'post',
    params: parameter
  })
}

export function createClass (parameter) {
  console.log('param: ', parameter)
  return request({
    url: BASE_URL + api.classCreate,
    method: 'post',
    params: parameter
  })
}
