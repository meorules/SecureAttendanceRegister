import http from "../http-common";

class StudentAttendanceDataService {

    getAttendance(id, groupid, studentid) {
      return http.get(`/modules/${id}/${groupid}/semesterRegistration/${studentid}`);
    }

    getLesson(id, groupid, studentid) {
      return http.get(`/modules/${id}/${groupid}/semesterRegistration/${studentid}/lesson`);
    }
}

export default new StudentAttendanceDataService();