import http from "../http-common";

class SemesterRegistrationDataService {

    getAll(id, groupid) {
      return http.get(`/modules/${id}/${groupid}/semesterRegistration`);
    }
}

export default new SemesterRegistrationDataService();