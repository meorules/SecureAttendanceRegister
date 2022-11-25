import http from "../http-common";

class AttendanceIndicatorDataService {

    getAll() {
      return http.get("/attendanceIndicators");
    }

    get(id) {
        return http.get(`/attendanceIndicators/${id}`)
    }
}

export default new AttendanceIndicatorDataService();