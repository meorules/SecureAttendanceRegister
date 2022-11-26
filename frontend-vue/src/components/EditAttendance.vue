<template>
    <div class="list row">
      <div class="col-md-6">
        <h3>Edit Attendance</h3>
        <h4>Student & Attendance List</h4>
        <ul class="list-group">
          <li class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(lesson, index) in lessons"
            :key="index"
            @click="setActiveLesson(lesson, index)"
          >
            {{ lesson.date }}
          </li>
        </ul>
      </div>
      <div class="col-md-6">
        <div v-if="currentLesson">
          <h4>Module</h4>
          <div>
            <div>
            <label><strong>Module Code:</strong></label> {{ currentLesson.date }}
          </div>
            <label><strong>Module Name:</strong></label> 
          </div>
          <div>
            <label><strong>Module Leader:</strong></label>
          </div>
          <div>
            <label><strong>Module Teachers:</strong></label>
          </div>
          <div>
            <label><strong>Module Groups:</strong></label> 
          </div>
          <router-link :to="'/modules/'+$route.params.id+'/' + $route.params.groupid + '/editAttendance/' + currentLesson._id" class="badge badge-danger">Select</router-link>
        </div>
        <div v-else>
          <br />
          <p>Please click on a Student.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import EditAttendanceDataService from "../services/EditAttendanceDataService";
  
  export default {
    name: "edit-attendance",
    data() {
      return {
        lessons: [],
        currentLesson: null,
        currentIndex: -1,
        name: ""
      };
    },
    methods: {
      retrieveLessons() {
        EditAttendanceDataService.getAll(this.$route.params.id, this.$route.params.groupid)
          .then(response => {
            this.lessons = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
  
      refreshList() {
        this.retrieveLessons();
        this.currentLesson = null;
        this.currentIndex = -1;
      },
  
      setActiveLesson(Lesson, index) {
        this.currentLesson = Lesson;
        this.currentIndex = module ? index : -1;
      }
    },
    mounted() {
      this.retrieveLessons();
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