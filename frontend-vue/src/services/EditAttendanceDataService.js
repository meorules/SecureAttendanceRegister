import http from "../http-common";
import authHeader from "./auth-header";
class EditAttendanceDataService {

    put(id, groupid, lessonid, attendanceid, attendanceValue) {
        return http.put(`/modules/${id}/${groupid}/editAttendance/${lessonid}/${attendanceid}/${attendanceValue}`, {}, { headers: authHeader() });
    }

    getAll(id, groupid) {
        return http.get(`/modules/${id}/${groupid}/editAttendance/`, { headers: authHeader() })
    }

    getAttendance(id, groupid, lessonid) {
        return http.get(`/modules/${id}/${groupid}/editAttendance/${lessonid}`, { headers: authHeader() })
    }

    getStudents(id, groupid, lessonid) {
        return http.get(`/modules/${id}/${groupid}/editAttendance/${lessonid}/students`, { headers: authHeader() })
    }

}

export default new EditAttendanceDataService();