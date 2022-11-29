import http from "../http-common";
import authHeader from "./auth-header";
class DeleteLessonDataService {

    delete(id, groupid, lessonid) {
        return http.delete(`/modules/${id}/${groupid}/deleteLesson/${lessonid}`,  {headers: authHeader() });
    }

    getLesson(id, groupid) {
        return http.get(`/modules/${id}/${groupid}/deleteLesson`,  {headers: authHeader() });
    }
}

export default new DeleteLessonDataService();