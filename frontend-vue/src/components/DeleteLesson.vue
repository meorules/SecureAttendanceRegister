<template>
  <html>
    <div class="list row">
      <div class="col-md-6">
        <h3>Delete Lesson</h3>
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
        <div class="col-md-6">
        
        <div v-if="currentLesson">
          <h4></h4>
          <br>
          <br>
          <button class=" btn btn-dark" @click="deleteLessons">
        Delete
      </button>
        </div>
        <div v-else>
          <br />
          <p>Please click on a Lesson.</p>
        </div>
      </div>
    </div>
  </div>
  </html>
  </template>
  
  <script>
  import DeleteLessonDataService from "../services/DeleteLessonDataService";
  
  export default {
    name: "delete-lesson",
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
        DeleteLessonDataService.getLesson(this.$route.params.id, this.$route.params.groupid)
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
      deleteLessons() {
        DeleteLessonDataService.delete(this.$route.params.id, this.$route.params.groupid, this.currentLesson._id)
          .then(response => {
            this.lessons = response.data;
            location.reload();
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
      },
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