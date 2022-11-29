<template>
  <html>
    <div class="list row">
      <div class="col-md-6">
        <h3>Edit Attendance</h3>
        <h4>Lesson List</h4>
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
          <h4>Lesson</h4>
          <div>
            <div>
            <br>
            <br>
            <label><strong>Lesson date:</strong></label> {{ currentLesson.date }}
            </div>
          </div>
          <router-link :to="'/modules/'+$route.params.id+'/' + $route.params.groupid + '/editAttendance/' + currentLesson._id" class="btn btn-dark">Select</router-link>
        </div>
        <div v-else>
          <br />
          <p>Please click on a Lesson.</p>
        </div>
      </div>
    </div>
    </html>
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

            for (let i = 0; i < this.lessons.length; i++) {
              this.formatDateTime(this.lessons[i]);
            }
          })
          .catch(e => {
            console.log(e);
          });
      },
      formatDateTime(lesson) {
        let currentDate = lesson.date;
        let year = currentDate.substring(0, 4);
        let month = currentDate.substring(5, 7);
        let day = currentDate.substring(8, 10);
        let time = currentDate.substring(11, 19);

        lesson.date = year + "-" + month + "-" + day + " " + time;
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

  body {
  background-color: rgb(241, 239, 239);
  }
  </style>