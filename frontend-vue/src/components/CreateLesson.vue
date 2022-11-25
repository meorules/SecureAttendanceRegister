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
        <Form @submit="handleLogin" :validation-schema="schema">
          <div class="form-group">
            <label for="lessonDate">Lesson Date</label>
            <ErrorMessage name="lessonDate" class="error-feedback" />
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
        modules: [],
        name: ""
      };
    },
    methods: {
      createLesson(moduleId, groupId, data){
        CreateLessonDataService.create(moduleId, groupId, data)


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
  
      removeAllModules() {
        CreateLessonDataService.deleteAll()
          .then(response => {
            console.log(response.data);
            this.refreshList();
          })
          .catch(e => {
            console.log(e);
          });
      },
      
      searchName() {
        CreateLessonDataService.findByName(this.name)
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