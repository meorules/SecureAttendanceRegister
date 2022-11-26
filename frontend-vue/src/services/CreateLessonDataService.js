import http from "../http-common";

class CreateLessonDataService {

    create(id, groupid, date, time) {
        return http.post(`/modules/${id}/${groupid}/createLesson/${date}/${time}`);
    }
    
}

export default new CreateLessonDataService();