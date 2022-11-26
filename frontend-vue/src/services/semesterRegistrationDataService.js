import http from "../http-common";
import authHeader from "./auth-header";

class SemesterRegistrationDataService {

    getAll(id, groupid) {
      return http.get(`/modules/${id}/${groupid}/semesterRegistration`, {headers: authHeader() });
    }
}

export default new SemesterRegistrationDataService();