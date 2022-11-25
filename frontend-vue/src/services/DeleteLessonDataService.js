import http from "../http-common";

class DeleteLessonDataService {

    delete(id, groupid, lessonid) {
        return http.delete(`/modules/${id}/${groupid}/deleteLesson/${lessonid}`);
    }

    getLesson(id, groupid) {
        return http.get(`/modules/${id}/${groupid}/deleteLesson`);
    }
}

export default new DeleteLessonDataService();