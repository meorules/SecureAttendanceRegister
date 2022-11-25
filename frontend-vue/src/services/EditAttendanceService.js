import http from "../http-common";

class EditAttendanceDataService {

    getAll(id, groupid) {
      return http.get(`/modules/${id}/${groupid}/editAttendance`);
    }

    // get(id) {
    //     return http.get(`/modules/${id}/${groupid}/attendanceIndicators/${id}`)
    // }
}

export default new EditAttendanceDataService();