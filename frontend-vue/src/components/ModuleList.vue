<template>
  <html>
    <div class="list row">
      <div class="col-md-6">
        <h4>Modules List</h4>
        <ul class="list-group">
          <li class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(module, index) in modules"
            :key="index"
            @click="setActiveModule(module, index)"
          >
            {{ module.moduleName }}
          </li>
        </ul>
  
       
      </div>
      <div class="col-md-6">
        <div v-if="currentModule">
          <h4>Module</h4>
          <div>
            <div>
            <label><strong>Module Code:</strong></label> {{ currentModule.moduleCode }}
          </div>
            <label><strong>Module Name:</strong></label> {{ currentModule.moduleName }}
          </div>
          <router-link :to="'/modules/' + currentModule._id" class="btn btn-dark">Select</router-link>
        </div>
        <div v-else>
          <br />
          <p>Please click on a Module.</p>
        </div>
      </div>
    </div>
    </html>
  </template>
  
  <script>
  import ModuleDataService from "../services/ModuleDataService";
  
  export default {
    name: "modules-list",
    data() {
      return {
        modules: [],
        currentModule: null,
        currentIndex: -1,
        name: ""
      };
    },
    methods: {
      retrieveModules() {
        ModuleDataService.getAll()
          .then(response => {
            this.modules = response.data;
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
      this.retrieveModules();
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