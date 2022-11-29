import http from "../http-common";
import authHeader from "./auth-header";
class SecurityDataService {
  getPublicContent() {
    return http.get("/security/public");
  }

  getProtectedContent() {
    return http.get("/security/protected", 
    { headers: authHeader() });
  }

}

export default new SecurityDataService();