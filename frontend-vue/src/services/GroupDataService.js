import http from "../http-common";

class GroupDataService {

    get(id) {
        return http.get(`/modules/${id}`)
    }

    getGroup(id, groupid) {
        return http.get(`/modules/${id}/${groupid}`)
    }

}

export default new GroupDataService();