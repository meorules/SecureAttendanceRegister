<template>
    <div class="list row">
      <div class="col-md-8">
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Search by name"
            v-model="name"/>
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button"
              @click="searchName"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <h3>Student Attendance</h3>
        <h4>Student List | Attendance List</h4>
        <ul class="list-group">
          <li class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(lesson, index) in lessons"
            :key="index"
            @click="setActiveStudent(lesson, index)"
          >
            {{ lesson.date }}
          </li>
        </ul>
        <br>
        <br>
        <br>
        <ul class="list-group2">
          <li class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(atten, index) in attendances"
            :key="index"
            @click="setActiveStudent(atten, index)"
          >
            {{ atten.attendanceValue }}
          </li>
        </ul>
  
      </div>
      <div class="col-md-6">
        <div v-if="currentStudent">

          <div>
            <div>
            <br>
            <br>
            <br>
            <br>
              <label><strong>Student :</strong></label> {{ currentStudent.firstName }}
          </div>
        </div>
          <router-link :to="'/modules/'+$route.params.id+'/' + $route.params.groupid + '/semesterRegistration/' + currentStudent._id" class="badge badge-danger">Select</router-link>
        </div>
        <div v-else>
          <br />
          <p>Please click on a Student.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import StudentAttendanceDataService from "../services/StudentAttendanceDataService";
  
  export default {
    name: "semester-registration",
    data() {
      return {
        lessons: [],
        attendances: [],
        currentIndex: -1,
        name: ""
      };
    },
    methods: {
      retrieveAttendance() {
        StudentAttendanceDataService.getAttendance(this.$route.params.id, this.$route.params.groupid, this.$route.params.studentid)
          .then(response => {
            this.attendances = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
      retrieveLesson() {
        StudentAttendanceDataService.getLesson(this.$route.params.id, this.$route.params.groupid, this.$route.params.studentid)
          .then(response => {
            this.lessons = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
      refreshList() {
        this.retrieveModules();
        this.currentStudent= null;
        this.currentIndex = -1;
      },
    },
    mounted() {
        this.retrieveAttendance(); 
        this.retrieveLesson();
    }
  };
  </script>
  
  <style>
  .list {
    text-align: left;
    max-width: 750px;
    margin: auto;
  }
  </style>