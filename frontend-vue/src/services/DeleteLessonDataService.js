import http from "../http-common";

class DeleteLessonDataService {

    delete(id, groupid, lessonid) {
        return http.get(`/modules/${id}/${groupid}/${lessonid}/deleteLesson`);
    }
}

export default new DeleteLessonDataService();