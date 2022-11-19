import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3050/Attendance",
  headers: {
    "Content-type": "application/json"
  }
});