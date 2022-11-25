import http from "../http-common";

class DeleteLessonDataService {

    getAll(id, groupid) {
        return http.get(`/modules/${id}/${groupid}/deleteLesson`);
      }
  
      // get(id) {
      //     return http.get(`/modules/${id}/${groupid}/attendanceIndicators/${id}`)
      // }
  
}

export default new DeleteLessonDataService();