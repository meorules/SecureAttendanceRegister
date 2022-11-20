import http from "../http-common";

class ModuleDataService {

    getAll() {
      return http.get("/modules");
    }

    get(id) {
        return http.get(`/modules/${id}`)
    }

    create(data) {
        return http.post("/modules", data);
    }

    update(id, data) {
        return http.put(`/modules/${id}`, data);
    }

    delete(id) {
        return http.delete(`/modules/${id}`);
    }

    deleteAll() {
        return http.delete(`/modules`);
    }

    findByName(name) {
        return http.get(`/modules?name=${name}`);
    }  
}

export default new ModuleDataService();