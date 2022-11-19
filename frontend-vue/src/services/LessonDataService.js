import http from "../http-common";

class LessonDataService {

    getAll() {
      return http.get("/lessons");
    }

    get(id) {
        return http.get(`/lessons/${id}`)
    }

    update(id, data) {
        return http.put(`/lessons/${id}`, data);
    }

    findByName(name) {
        return http.get(`/lessons?name=${name}`);
    }  
}

export default new LessonDataService();