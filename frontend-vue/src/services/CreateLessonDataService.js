import http from "../http-common";
import authHeader from "./auth-header";

class CreateLessonDataService {

    create(id, groupid, date, time) {
        return http.post(`/modules/${id}/${groupid}/createLesson/${date}/${time}`, {}, {headers: authHeader() });
    }
    
}

export default new CreateLessonDataService();