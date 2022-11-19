import axios from 'axios';

const API_URL = 'http://localhost:3050/Attendance/auth/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'signin', {
        username: user.username,
        password: user.password,
        firstName: user.firstName,
        roleType: user.roleType
      }) 
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        console.log(response.data)
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
      roleType: user.roleType
    });
  }
}

export default new AuthService();