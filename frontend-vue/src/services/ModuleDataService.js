import http from "../http-common";

class ModuleDataService {

    getAll() {
      return http.get("/modules");
    }

    get(id) {
        return http.get(`/modules/${id}`)
    }

    update(id, data) {
        return http.put(`/modules/${id}`, data);
    }

    findByName(name) {
        return http.get(`/modules?name=${name}`);
    }  
}

export default new ModuleDataService();