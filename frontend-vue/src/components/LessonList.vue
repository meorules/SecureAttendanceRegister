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
        <h4>Lessonss List</h4>
        <ul class="list-group">
          <li class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(lesson, index) in lessons"
            :key="index"
            @click="setActiveModule(lesson, index)">
            {{ lesson.name }}
          </li>
        </ul>
      </div>
      <div class="col-md-6">
        <div v-if="currentLesson">
          <h4>Lesson</h4>
          <div>
            <label><strong>Lesson Date:</strong></label> {{ currentLesson.date }}
          </div>
          <div>
            <label><strong>Lessons:</strong></label> {{ currentLesson.attendance }}
          </div>
          <router-link :to="'/groups/' + currentModule._id" class="badge badge-danger">Select Lesson</router-link>
        </div>
        <div v-else>
          <br />
          <p>Please click on a Lesson...</p>
        </div>
      </div>
    </div>
  </template>


<script>
import LessonDataService from "../services/LessonDataService";

export default {
  name: "lesson-list",
  data() {
    return {
      lessons: [],
      currentModule: null,
      currentIndex: -1,
      name: ""
    };
  },
  methods: {
    retrieveLessons() {
      LessonDataService.getAll()
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
      this.currentModule = null;
      this.currentIndex = -1;
    },

    setActiveLesson(Lesson, index) {
      this.currentLesson = Lesson;
      this.currentIndex = Lesson ? index : -1;
    },

    removeAllLessons() {
        LessonDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchName() {
        LessonDataService.findByName(this.name)
        .then(response => {
          this.lessons = response.data;
          this.setActiveModule(null);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
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