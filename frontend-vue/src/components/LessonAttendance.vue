<template>
    <div class="list row">
      <div class="col-md-6">
        <h3>Students</h3>
        <ul class="list-group">
          <li class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(student, index) in students"
            :key="index"
            @click="setActiveStudent(student, index)"
          >
            {{ student.firstName }}
          </li>
        </ul>
        <br>
      </div>
      <div class="col-md-7">
        <h3>Attendance</h3>
        <ul class="list-group2">
          <li class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(atten, index) in attendances"
            :key="index"
            @click="setActiveStudent(atten, index)"
            > 
            <div v-if="atten.attendanceValue == '0'">
              Not Attended
            </div>
            <div v-else-if="atten.attendanceValue == '1'">
              Attended
            </div>
            <div v-else-if="atten.attendanceValue == '2'">
              Excused Absence
            </div>
            <div v-else>
              Late
            </div>
          </li>
        </ul>
      </div>
      <div class="col-md-8">
        <div v-if="currentStudent">
          <div>
            <div>
              <label><strong>Student :</strong></label> {{ currentStudent.firstName }}
          </div>
        </div>
          <router-link :to="'/modules/'+$route.params.id+'/' + $route.params.groupid + '/semesterRegistration/' + currentStudent._id" class="badge badge-danger">Select</router-link>
        </div>
        <div v-else>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import EditAttendanceDataService from "../services/EditAttendanceDataService";
  
  export default {
    name: "semester-registration",
    data() {
      return {
        students: [],
        attendances: [],
        currentIndex: -1,
        name: ""
      };
    },
    methods: {
      retrieveAttendance() {
        EditAttendanceDataService.getAttendance(this.$route.params.id, this.$route.params.groupid, this.$route.params.lessonid)
          .then(response => {
            this.attendances = response.data;
            console.log("helllooooo")
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
      retrieveStudents() {
        EditAttendanceDataService.getStudents(this.$route.params.id, this.$route.params.groupid, this.$route.params.lessonid)
          .then(response => {
            this.students = response.data;
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
        this.retrieveStudents();
    }
  };
  </script>
  
  <style>
  .list {
    text-align: left;
    max-width: 750px;
    margin: auto;
    
  }
  
  .col-md-6 {
    position: relative;
    max-width: 300px;
  }
  
  .col-md-7 {
    position: absolute;
    left: 48%;
    max-width: 300px;
  }
  </style>