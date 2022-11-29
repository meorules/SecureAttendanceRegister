<template>
  <div class="list row">
    <div class="col-md-6">
      <h4>Users List</h4>
      <ul class="list-group">
        <li class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(user, index) in users"
            :key="index"
            @click="setActiveUser(user, index)"
        >
          {{ user.username }}
        </li>
      </ul>

    </div>
    <div class="col-md-6">
      <div v-if="currentUser">
        <h4>User</h4>
        <div>
          
          <label><strong>Id:</strong></label> {{currentUser._id }}
        </div>
        <div>
          <label><strong>Username:</strong></label> {{ currentUser.username }}
        </div>
        <div v-if="currentUser.roleType == '0'">
          <label><strong>Role:</strong></label>Student
            </div>
            <div v-else-if="currentUser.roleType == '1'">
              <label><strong>Role:</strong></label>
              Lecturer
            </div>
            <!-- <div v-else-if="currentUser.roleType == '2'">
              <label><strong>Role:</strong>
              Module Leader
            </div>
            <div v-else-if="currentUser.roleType == '3'">
              <label><strong>Role:</strong>
              Course leader
            </div> -->
            <div v-else-if="currentUser.roleType == '4'">
              <label><strong>Role:</strong></label>
              Admin
            </div>
      </div>
      <div v-else>
        <br />
        <p>Please click on a User ...</p>
      </div>
    </div>
  </div>
</template>

<script>
import UserDataService from "../services/UserDataService";

export default {
  name: "UserList.vue",
  data() {
    return {
      users: [],
      currentUser: null,
      currentIndex: -1,
      username: ""
    };
  },
  methods: {
    retrieveUsers() {
      UserDataService.getAll()
          .then(response => {
            this.users = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },

    refreshList() {
      this.retrieveUsers();
      this.currentUser = null;
      this.currentIndex = -1;
    },

    setActiveUser(user, index) {
      this.currentUser = user;
      this.currentIndex = index;
    },
  },
  mounted() {
    this.retrieveUsers();
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