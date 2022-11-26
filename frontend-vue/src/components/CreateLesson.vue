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
        <h3>Create Lesson</h3>
        <h4>Lesson Creation:</h4>
        <Form :validation-schema="schema">
          <div class="form-group">
            <label for="lessonDate">Lesson Date</label>
            <input v-model="currentNewLesson.date" type="date"/>
            <label for="appt">Choose a time for your lesson:</label>
            <input v-model="currentNewLesson.time" type="time" id="appt" name="appt"
              min="09:00" max="19:00" required >
            <ErrorMessage name="lessonDate" class="error-feedback" />
            <button class="badge badge-danger mr-2"
            @click="createLesson">Create</button>
          </div> 
        </Form>
      </div>
    </div>
  </template>
  
  <script>
  import CreateLessonDataService from "../services/CreateLessonDataService";
  
  export default {
    name: "modules-list",
    data() {
      return {
        currentNewLesson: {
          date: Date,
          time: String
        },
        modules: [],
        name: ""
      };
    },
    methods: {
      createLesson() {
      //createLesson(moduleId, groupId, data){
       CreateLessonDataService.create( this.$route.params.id, this.$route.params.groupid, this.currentNewLesson.date, this.currentNewLesson.time);
      },

      retrieveStudents() {
        CreateLessonDataService.getAll()
          .then(response => {
            this.modules = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
  
      refreshList() {
        this.retrieveModules();
        this.currentModule = null;
        this.currentIndex = -1;
      },
  
      setActiveModule(Module, index) {
        this.currentModule = Module;
        this.currentIndex = module ? index : -1;
      },
      
    },
    mounted() {
      // this.retrieveStudents();
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