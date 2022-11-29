import http from "../http-common";
import authHeader from "./auth-header"

class GroupDataService {

    get(id) {
        return http.get(`/modules/${id}`, {headers: authHeader()})
    }

    getGroup(id, groupid) {
        return http.get(`/modules/${id}/${groupid}`, {headers: authHeader()})
    }

}

export default new GroupDataService();