import http from "../http-common";

class GroupDataService {

    getAll() {
      return http.get("/groups");
    }

    get(id) {
        return http.get(`/groups/${id}`)
    }

    update(id, data) {
        return http.put(`/groups/${id}`, data);
    }

    findByName(name) {
        return http.get(`/groups?name=${name}`);
    }  
}

export default new GroupDataService();