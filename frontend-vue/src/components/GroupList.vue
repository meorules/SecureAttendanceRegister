<template>
  <div class="list row">
    <div class="col-md-6">
      <h4>Groups List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(group, index) in groups"
          :key="index"
          @click="setActiveGroup(group, index)"
        >
          {{ group.groupName }}
        </li>
      </ul>

     
    </div>
    <div class="col-md-6">
      <div v-if="currentGroup">
        <h4>Group</h4>
        <div>
          <label><strong>Group Name:</strong></label> {{ currentGroup.groupName }}
        </div>
        <router-link :to="'/modules/' +$route.params.id+'/' + currentGroup._id" class="badge badge-danger">Select</router-link>
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
  name: "groups-list",
  data() {
    return {
      groups: [],
      currentGroup: null,
      currentIndex: -1,
      name: ""
    };
  },
  methods: {
    retrieveGroups(id) {
      GroupDataService.get(id)
        .then(response => {
          this.groups = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveGroups();
      this.currentGroup = null;
      this.currentIndex = -1;
    },

    setActiveGroup(Group, index) {
      this.currentGroup = Group;
      this.currentIndex = module ? index : -1;
    },
  },
  mounted() {
    this.message = '';
    this.retrieveGroups(this.$route.params.id);
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