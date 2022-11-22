import http from "../http-common";

class ModuleDataService {

    getAll() {
      return http.get("/modules");
    }

    get(id) {
        return http.get(`/modules/${id}`)
    }
    
    findByName(name) {
        return http.get(`/modules?name=${name}`);
    }  
}

export default new ModuleDataService();