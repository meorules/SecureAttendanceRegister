import http from "../http-common";
import authHeader from "./auth-header";
class LessonAttendanceDataService {

   // TODO: 
   // CREATE
   // EDIT

    getAll() {
      return http.get("/attendanceIndicators", {headers: authHeader() });
    }

    get(id) {
        return http.get(`/attendanceIndicators/${id}`, {headers: authHeader() })
    }

    findByName(name) {
        return http.get(`/attendanceIndicators?name=${name}`, {headers: authHeader() });
    }  
}

export default new LessonAttendanceDataService();
