import http from "../http-common";

class GroupDataService {

    get(id) {
        return http.get(`/modules/${id}`)
    }

    findOne(id, groupID) {
        return http.get(`/modules/${id}/${groupID}`)
    }

}

export default new GroupDataService();