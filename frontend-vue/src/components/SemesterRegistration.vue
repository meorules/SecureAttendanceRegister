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
        <h3>Semester Registration</h3>
        <h4>Student List</h4>
        <ul class="list-group">
          <li class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(student, index) in students"
            :key="index"
            @click="setActiveStudent(student, index)"
          >
            {{student.firstName }}
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
  import SemesterRegistrationDataService from "../services/semesterRegistrationDataService";
  
  export default {
    name: "semester-registration",
    data() {
      return {
        students: [],
        attendances: [],
        currentStudent: null,
        currentIndex: -1,
        name: ""
      };
    },
    methods: {
      retrieveStudents() {
        SemesterRegistrationDataService.getAll(this.$route.params.id, this.$route.params.groupid)
          .then(response => {
            this.students = response.data;
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
  
      setActiveStudent(Student, index) {
        this.currentStudent = Student;
        this.currentIndex = module ? index : -1;
      },
      
      searchName() {
        SemesterRegistrationDataService.findByName(this.name)
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