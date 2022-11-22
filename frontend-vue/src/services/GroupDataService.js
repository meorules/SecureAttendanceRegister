import http from "../http-common";

class GroupDataService {

    get(id) {
        return http.get(`/modules/${id}`)
    }

}

export default new GroupDataService();