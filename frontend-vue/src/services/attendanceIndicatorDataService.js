import http from "../http-common";
import authHeader from "./auth-header";

class AttendanceIndicatorDataService {

    getAll(id, groupid) {
      return http.get(`/modules/${id}/${groupid}/attendanceIndicators`,  {headers: authHeader() });
    }
    
    get(id, groupid, studentid) {
        return http.get(`/modules/${id}/${groupid}/attendanceIndicators/${studentid}`, {headers: authHeader() });
    }
}

export default new AttendanceIndicatorDataService();