import http from "../http-common";

class AttendanceIndicatorDataService {

    getAll(id, groupid) {
      return http.get(`/modules/${id}/${groupid}/attendanceIndicators`);
    }
    
    get(id, groupid, studentid) {
        return http.get(`/modules/${id}/${groupid}/attendanceIndicators/${studentid}`);
    }
}

export default new AttendanceIndicatorDataService();