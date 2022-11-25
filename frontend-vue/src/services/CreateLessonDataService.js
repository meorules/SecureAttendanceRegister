import http from "../http-common";

class CreateLessonDataService {

    create(id, groupid, data) {
        return http.post(`/modules/${id}/${groupid}/createLesson`, data);
    }

}

export default new CreateLessonDataService();