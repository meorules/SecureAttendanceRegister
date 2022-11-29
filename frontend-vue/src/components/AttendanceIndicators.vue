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
        <h3>Attendance Indicator</h3>
        <h4>Student List</h4>
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
      </div>
      <div class="col-md-6">
        <div v-if="currentStudent">
          <div>
            <br>
            <br>
            <br>
            <br>
            <div>
              <label><strong>Student Name:</strong></label> {{ currentStudent.firstName}}
            </div>
            <label><strong>Attended:</strong></label> {{ attendances[0]}}<strong>%</strong>
            <br>
            <label><strong>Not-Attended:</strong></label> {{ attendances[1]}}<strong>%</strong>
            <br>
            <label><strong>Excused Absence:</strong></label>{{ attendances[2]}}<strong>%</strong>
            <br>
            <label><strong>Late:</strong></label>{{ attendances[3]}}<strong>%</strong>
          </div>
        </div>
        <div v-else>
          <br />
          <p>Please click on a Student.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import AttendanceIndicatorDataService from "../services/attendanceIndicatorDataService";
  
  export default {
    name: "modules-list",
    data() {
      return {
        students: [],
        attendances: [],
        currentStudent: null,
        currentIndex: -1,
        name: "",
      };
    },
    methods: {
      retrieveStudents() {
        AttendanceIndicatorDataService.getAll(this.$route.params.id, this.$route.params.groupid)
          .then(response => {
            this.students = response.data;
          })
          .catch(e => {
            console.log(e);
          });
      },
      retrieveAttendance() {
        AttendanceIndicatorDataService.get(this.$route.params.id, this.$route.params.groupid, this.currentStudent._id)
          .then(response => {
            this.attendances = response.data;
          })
          .catch(e => {
            console.log(e);
          });
      },
      refreshList() {
        this.retrieveModules();
        this.currentStudent = null;
        this.currentIndex = -1;
      },

      async setActiveStudent(Student, index) {
        this.currentStudent = Student;
        this.currentIndex = module ? index : -1;
        this.retrieveAttendance();
      },

      removeAllModules() {
        AttendanceIndicatorDataService.deleteAll()
          .then(response => {
            console.log(response);
            this.refreshList();
          })
          .catch(e => {
            console.log(e);
          });
      },
      
      searchName() {
        AttendanceIndicatorDataService.findByName(this.name)
          .then(response => {
            this.modules = response.data;
            this.setActiveModule(null);
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    mounted() {
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
  </style>