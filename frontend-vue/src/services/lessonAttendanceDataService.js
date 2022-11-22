import http from "../http-common";

class LessonAttendanceDataService {

   // TODO: 
   // CREATE
   // EDIT

    getAll() {
      return http.get("/attendanceIndicators");
    }

    get(id) {
        return http.get(`/attendanceIndicators/${id}`)
    }

    update(id, data) {
        return http.put(`/attendanceIndicators/${id}`, data);
    }

    findByName(name) {
        return http.get(`/attendanceIndicators?name=${name}`);
    }  
}

export default new LessonAttendanceDataService();
