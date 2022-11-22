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
  
        <button class="m-3 btn btn-sm btn-danger" @click="removeAllModules">
          Remove All
        </button>
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
          <div>
            <label><strong>Module Leader:</strong></label> {{ currentModule.moduleLeader }}
          </div>
          <div>
            <label><strong>Module Teachers:</strong></label> {{ currentModule.teachingLecturers }}
          </div>
          <div>
            <label><strong>Module Groups:</strong></label> {{ currentModule.groups }}
          </div>
          <router-link :to="'/modules/' + currentModule.moduleCode" class="badge badge-danger">Select</router-link>
        </div>
        <div v-else>
          <br />
          <p>Please click on a Module.</p>
        </div>
      </div>
    </div>
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
        ModuleDataService.deleteAll()
          .then(response => {
            console.log(response.data);
            this.refreshList();
          })
          .catch(e => {
            console.log(e);
          });
      },
      
      searchName() {
        ModuleDataService.findByName(this.name)
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
  </style>