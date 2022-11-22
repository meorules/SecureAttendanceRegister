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
      <h4>Groups List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(group, index) in groups"
          :key="index"
          @click="setActiveModule(group, index)">
          {{ group.groupName }}
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <div v-if="currentGroup">
        <h4>Group</h4>
        <div>
          <label><strong>Group Type:</strong></label> {{ currentGroup.groupType }}
        </div>
        <div>
          <label><strong>Group Type:</strong></label> {{ currentGroup.groupType }}
        </div>
        <div>
          <label><strong>Module:</strong></label> {{ currentGroup.module }}
        </div>
        <div>
          <label><strong>Lessons:</strong></label> {{ currentGroup.lessons }}
        </div>
        <div>
          <label><strong>Students:</strong></label> {{ currentGroup.students }}
        </div>
        <router-link :to="'/groups/' + currentModule._id" class="badge badge-danger">Select Group</router-link>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Group.</p>
      </div>
    </div>
  </div>
</template>


<script>
import GroupDataService from "../services/GroupDataService";

export default {
name: "group-list",
data() {
  return {
    groups: [],
    currentModule: null,
    currentIndex: -1,
    name: ""
  };
},
methods: {
  retrieveGroups() {
    GroupDataService.getAll()
      .then(response => {
        this.groups = response.data;
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  },

  refreshList() {
    this.retrieveGroups();
    this.currentModule = null;
    this.currentIndex = -1;
  },

  setActiveGroup(Group, index) {
    this.currentGroup = Group;
    this.currentIndex = Group ? index : -1;
  },

  removeAllGroups() {
      GroupDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  },
  
  searchName() {
      GroupDataService.findByName(this.name)
      .then(response => {
        this.groups = response.data;
        this.setActiveModule(null);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
},
mounted() {
  //this.retrieveGroups();
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