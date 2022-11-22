import http from "../http-common";

class ModuleDataService {

    getAll() {
      return http.get("/modules");
    }

    findByName(name) {
        return http.get(`/modules?name=${name}`);
    }  
}

export default new ModuleDataService();