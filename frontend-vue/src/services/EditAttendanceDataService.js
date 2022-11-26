import http from "../http-common";

class EditAttendanceDataService {

    post(id, groupid, attendanceid, attendanceValue) {
      return http.post(`/modules/${id}/${groupid}/editAttendance/${attendanceid}/${attendanceValue}`);
    }

    getAll(id,groupid) {
      return http.get(`/modules/${id}/${groupid}/editAttendance/`)
    }

    getAttendance(id,groupid, lessonid) {
      return http.get(`/modules/${id}/${groupid}/editAttendance/${lessonid}`)
    }

    getStudents(id,groupid, lessonid) {
      return http.get(`/modules/${id}/${groupid}/editAttendance/${lessonid}/students`)
    }

}

export default new EditAttendanceDataService();