<template>
  <html>
    <div class="list row">
      <div class="col-md-6">
        <h4>GROUP OPTIONS PAGE</h4>
      </div>
      <div class="col-md-6">
        <div>
          <br />
          <p>Please click on an option:</p>
        </div>
      </div>
    </div>
    
    <router-link :to="'/modules/' +$route.params.id+'/' + $route.params.groupid + '/attendanceIndicator'" class="btn btn-block btn-dark">Attendance Indicator</router-link>
    <br>
    <br>
    <router-link :to="'/modules/' +$route.params.id+'/' + $route.params.groupid + '/semesterRegistration'" class="btn btn-block btn-dark">Semester Registration</router-link>
    <br>
    <br>
    <div v-if="this.user.roleType == 1">
    <router-link :to="'/modules/' +$route.params.id+'/' + $route.params.groupid + '/editAttendance'" class="btn btn-block btn-dark">Edit Attendance</router-link>
    <br>
    <br>
    <router-link :to="'/modules/' +$route.params.id+'/' + $route.params.groupid + '/createLesson'" class="btn btn-block btn-dark">Create Lesson</router-link>
    <br>
    <br>
    <router-link :to="'/modules/' +$route.params.id+'/' + $route.params.groupid + '/deleteLesson'" class="btn btn-block btn-dark">Delete Lesson</router-link>
    </div>
  </html>

</template>


<script>
import GroupDataService from "../services/GroupDataService";

// WHERE THE FUNCTIONS FOR EACH GROUP GO

export default {
name: "group-list",
data() {
  return {
    groups: [],
    currentGroup: "",
    currentIndex: -1,
    name: "",
    user: JSON.parse(localStorage.getItem('user'))
  };
},
methods: {
  retrieveCurrentGroup() {
      GroupDataService.getGroup(this.$route.params.id, this.$route.params.groupid)
        .then(response => {
          this.currentGroup = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
},
mounted() {
  this.retrieveCurrentGroup();
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