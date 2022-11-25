import http from "../http-common";
import authHeader from "./auth-header";



class ModuleDataService {

    getAll() {
      return http.get("/modules", {headers: authHeader() });
    }

    findByName(name) {
        return http.get(`/modules?name=${name}`);
    }  
}

export default new ModuleDataService();