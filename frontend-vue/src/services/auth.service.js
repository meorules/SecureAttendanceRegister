import axios from 'axios';
import authHeader from "../services/auth-header";

const API_URL = 'http://localhost:3050/Attendance/auth/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'signin', {
        username: user.username,
        password: user.password
      }) 
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      username: user.username,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      roleType: user.roleType
    },{headers: authHeader() });
  }
}

export default new AuthService();