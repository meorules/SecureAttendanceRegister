<template>
  <div class="list row">
    <div class="col-md-6">
      <h4>GROUP OPTIONS PAGE</h4>
    </div>
    <div class="col-md-6">
      <div>
        <br />
        <p>Please click on an option: INSERT-GROUP-NAME-HERE</p>
      </div>
    </div>
  </div>

  <router-link :to="'/modules/' +$route.params.id+'/' + $route.params.groupid + '/attendanceIndicator'" class="badge badge-danger">Attendance Indicator</router-link>
  <!-- Takes to a list of students, get % of each student -->

  <router-link :to="'/modules/' +$route.params.id+'/' + $route.params.groupid + '/semesterRegistration'" class="badge badge-danger">Semester Registration</router-link>
  <!-- Spreadsheet -->

  <router-link :to="'/modules/' +$route.params.id+'/' + $route.params.groupid + '/editAttendance'" class="badge badge-danger">Edit Attendance</router-link>
  <!-- List of students & display whether they've attended | OR spreadsheet -->

  <router-link :to="'/modules/' +$route.params.id+'/' + $route.params.groupid + '/createLesson'" class="badge badge-danger">Create Lesson</router-link>
  <!-- Form (students on left) -> Box to fill in -->

  <router-link :to="'/modules/' +$route.params.id+'/' + $route.params.groupid + '/deleteLesson'" class="badge badge-danger">Delete Lesson</router-link>
  <!-- Show list of lessons | Click a lesson and delete it -->

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
    name: ""
  };
},
methods: {
  retrieveCurrentGroup(id, groupID) {
      GroupDataService.findOne(id, groupID)
        .then(response => {
          this.currentGroup = response.data;
          console.log("INSIDE THE VUE COMPONENT:");
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
},
mounted() {
  //console.log(this.$route.params)
  console.log(this.$route.params.groupid)
  this.retrieveCurrentGroup(this.$route.params.id, this.$route.params.groupid);
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