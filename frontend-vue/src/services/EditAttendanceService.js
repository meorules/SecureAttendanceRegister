import http from "../http-common";

class EditAttendanceDataService {

    post(id, groupid, attendanceid, attendanceValue) {
      return http.get(`/modules/${id}/${groupid}/editAttendance/${attendanceid}/${attendanceValue}`);
    }

    // get(id) {
    //     return http.get(`/modules/${id}/${groupid}/attendanceIndicators/${id}`)
    // }
}

export default new EditAttendanceDataService();