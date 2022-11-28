<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <div class="input-group-append">
        </div>
      </div>
    </div>
    <h3>Student Attendance</h3>
    <h4>Student List | Attendance List</h4>
    <div class="display-container">
      <div class="col-md-6">
        <ul class="list-group">
          <li class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(lesson, index) in lessons"
            :key="index"
            @click="setActiveStudent(lesson, index)"
          >
            {{ lesson.date }}
          </li>
        </ul>
        <br>
      </div>
      <div class="col-md-7">
        <ul class="list-group2">
          <li class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(atten, index) in attendances"
            :key="index"
            @click="setActiveStudent(atten, index)"
            > 
            <div v-if="atten.attendanceValue == '0'">
              Not Attended
            </div>
            <div v-else-if="atten.attendanceValue == '1'">
              Attended
            </div>
            <div v-else-if="atten.attendanceValue == '2'">
              Excused Absence
            </div>
            <div v-else>
              Late
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-md-8">
      <div v-if="currentStudent">
        <div>
          <div>
            <label><strong>Student :</strong></label> {{ currentStudent.firstName }}
        </div>
      </div>
        <router-link :to="'/modules/'+$route.params.id+'/' + $route.params.groupid + '/semesterRegistration/' + currentStudent._id" class="badge badge-danger">Select</router-link>
      </div>
      <div v-else>
      </div>
    </div>
  </div>
</template>

<script>
import StudentAttendanceDataService from "../services/StudentAttendanceDataService";

export default {
  name: "semester-registration",
  data() {
    return {
      lessons: [],
      attendances: [],
      currentIndex: -1,
      name: ""
    };
  },
  methods: {
    retrieveAttendance() {
      StudentAttendanceDataService.getAttendance(this.$route.params.id, this.$route.params.groupid, this.$route.params.studentid)
        .then(response => {
          this.attendances = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    retrieveLesson() {
      StudentAttendanceDataService.getLesson(this.$route.params.id, this.$route.params.groupid, this.$route.params.studentid)
        .then(response => {
          this.lessons = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveModules();
      this.currentStudent= null;
      this.currentIndex = -1;
    },
  },
  mounted() {
      this.retrieveAttendance(); 
      this.retrieveLesson();
  }
};
</script>

<style>
h3, h4 {
  display: inline-block;
  width: 100%;
  text-align: center;
}

.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}

.display-container {
  width:100%;
  display:flex;
  flex-direction: row;
}

</style>