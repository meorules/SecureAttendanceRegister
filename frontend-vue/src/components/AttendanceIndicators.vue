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
            @click="setActiveStudent(student, index); setupDoughnutChartValues()" 
          >
            {{ student.firstName }}  
            </li>
        </ul>
        <button class="m-3 btn btn-sm btn-danger" @click="removeAllModules">
          Remove All
        </button>
      </div>
      <div class="col-md-6">
        <div v-if="currentStudent">
          <h4>Student:</h4>
          <div>
            <div>
              <label><strong>Student Name:</strong></label> {{ currentStudent.firstName}}
            </div>
          </div>
        </div>
        <div v-else>
          <br />
          <p>Please click on a Student.</p>
        </div>
        <DoughnutChart notAttendedCounter=this.notAttendedCounter attendedCounter=this.attendedCounter
        excusedAbsence=this.excusedAbsenceCounter lateCounter = this.lateCounter></DoughnutChart>
      </div>
    </div>
  </template>
  
  <script>
  import AttendanceIndicatorDataService from "../services/attendanceIndicatorDataService";
  import DoughnutChart from "../components/DoughnutChart";
  
  export default {
    name: "modules-list",
    components: DoughnutChart,
    data() {
      return {
        students: [],
        attendances: [],
        currentStudent: null,
        currentIndex: -1,
        name: "",
        notAttendedCounter: 0,
        attendedCounter: 0,
        excusedAbsenceCounter: 0,
        lateCounter: 0,
      };
    },
    methods: {
      retrieveStudents() {
        console.log(this.$route.params)
        AttendanceIndicatorDataService.getAll(this.$route.params.id, this.$route.params.groupid)
          .then(response => {
            this.students = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
      retrieveAttendance() {
        AttendanceIndicatorDataService.get(this.$route.params.id, this.$route.params.groupid, this.currentStudent._id)
          .then(response => {
            this.attendances = response.data;
            console.log(response.data);
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

      setActiveStudent(Student, index) {
        this.currentStudent = Student;
        console.log(this.currentStudent);
        this.currentIndex = module ? index : -1;
        this.attendances = this.retrieveAttendance();
      },

      setupDoughnutChartValues() {
        this.notAttendedCounter = this.attendances[0];
        this.attendedCounter = this.attendances[1];
        this.excusedAbsenceCounter = this.attendances[2];
        this.lateCounter = this.attendances[4];
      },

      removeAllModules() {
        AttendanceIndicatorDataService.deleteAll()
          .then(response => {
            console.log(response.data);
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
            console.log(response.data);
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