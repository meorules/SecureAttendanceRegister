import axios from "axios";
import rateLimit from 'axios-rate-limit';

export default rateLimit(axios.create({
  baseURL: "http://localhost:3050/Attendance",
  headers: {
    "Content-type": "application/json"
  }
}),
{ maxRPS: 5 }); 