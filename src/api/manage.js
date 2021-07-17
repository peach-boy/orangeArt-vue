import request from '@/utils/request'

const api = {
  user: '/user',
  role: '/role',
  service: '/service',
  permission: '/permission',
  permissionNoPager: '/permission/no-pager',
  orgTree: '/org/tree',
  studentFind: 'http://127.0.0.1:8080/student/find',
  studentCreate: 'http://127.0.0.1:8080/student/create',
  courseOrderFind: 'http://127.0.0.1:8080/course_order/find',
  courseOrderCreate: 'http://127.0.0.1:8080/course_order/create'

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
    url: api.studentFind,
    method: 'get',
    params: parameter
  })
}

export function getCourseOrderList (parameter) {
  return request({
    url: api.courseOrderFind,
    method: 'get',
    params: parameter
  })
}

export function createStudent (parameter) {
  console.log('param: ', parameter)
  return request({
    url: api.studentCreate,
    method: 'post',
    params: parameter
  })
}

export function createCourseOrder (parameter) {
  console.log('param: ', parameter)
  return request({
    url: api.courseOrderCreate,
    method: 'post',
    params: parameter
  })
}
