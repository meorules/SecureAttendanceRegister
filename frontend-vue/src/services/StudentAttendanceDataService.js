import http from "../http-common";
import authHeader from "./auth-header";
class StudentAttendanceDataService {

    getAttendance(id, groupid, studentid) {
      return http.get(`/modules/${id}/${groupid}/semesterRegistration/${studentid}`,  {headers: authHeader() });
    }

    getLesson(id, groupid, studentid) {
      return http.get(`/modules/${id}/${groupid}/semesterRegistration/${studentid}/lesson`,  {headers: authHeader() });
    }
}

export default new StudentAttendanceDataService();