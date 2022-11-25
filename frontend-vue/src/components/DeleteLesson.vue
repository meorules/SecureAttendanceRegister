<template>
    <div class="list row">
      <div class="col-md-8">
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Search by name"
            v-model="name"/>
          <div class="input-group-append">
          </div>
        </div>
      </div>
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
          <br>
          <button class="m-3 btn btn-sm btn-danger" @click="deleteLessons">
        Delete
      </button>
        </div>
        <div v-else>
          <br />
          <p>Please click on a Student.</p>
        </div>
      </div>
    </div>
  </div>
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
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
      deleteLessons() {
        DeleteLessonDataService.delete(this.$route.params.id, this.$route.params.groupid, this.currentLesson._id)
          .then(response => {
            this.lessons = response.data;
            console.log(response.data);
            location.reload();
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
      },
  
      removeAllModules() {
        DeleteLessonDataService.deleteAll()
          .then(response => {
            console.log(response.data);
            this.refreshList();
          })
          .catch(e => {
            console.log(e);
          });
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
  </style>