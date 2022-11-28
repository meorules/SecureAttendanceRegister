<template>
    <div class="list row">
      <div class="col-md-6">
        <h3>Students</h3>
        <ul class="list-group">
          <li class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(student, index) in students"
            :key="index"
          >
            {{ student.firstName }}
          </li>
        </ul>
        <br>
      </div>
      <div class="col-md-7">
        <h3>Attendance</h3>
        <ul class="list-group2">
          <li class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(atten, index) in attendances"
            :key="index"
            @click="setActiveAttendance(atten, index)"
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
      <div class="col-md-8">
        <div v-if="currentAttendance">
          <div>
            <div>
              <form>
                <label for="Attendance">Update Attendance to:</label>
                <select v-model="selectedAttendanceType">
                  <option v-for="(attendanceType, index) in attendanceTypes" v-bind:key="index">{{attendanceType.name}}</option>
                </select>
                <br><br>
                <button class="btn btn-outline-secondary" type="button" @click="selectAttendance">Save</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import EditAttendanceDataService from "../services/EditAttendanceDataService";
  
  export default {
    name: "semester-registration",
    data() {
      return {
        students: [],
        attendances: [],
        currentAttendance: null,
        currentNewAttendance:{
            attendanceValue: String,
        },
        name: "",
        attendanceTypes: [
          {id: 1, name: "Not-Attended"},
          {id: 2, name: "Attended"},
          {id: 3, name: "Excused-Absence"},
          {id: 4, name: "Late"}
        ],
        selectedAttendanceType: ""
      };
    },
    methods: {
      setActiveAttendance(Attendance, index) {
        this.currentAttendance = Attendance;
        console.log(this.currentAttendance);
        this.currentIndex = module ? index : -1;
      },
      retrieveAttendance() {
        EditAttendanceDataService.getAttendance(this.$route.params.id, this.$route.params.groupid, this.$route.params.lessonid)
          .then(response => {
            this.attendances = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
      retrieveStudents() {
        EditAttendanceDataService.getStudents(this.$route.params.id, this.$route.params.groupid, this.$route.params.lessonid)
          .then(response => {
            this.students = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
      selectAttendance() {
        let newAttendance = this.selectedAttendanceType;
        console.log(this.selectedAttendanceType);
        this.saveAttendance(newAttendance);
      },
      saveAttendance(newAttendance) {
        // EditAttendanceDataService.post(this.$route.params.id, this.$route.params.groupid, this.$route.params.lessonid, this.currentAttendance._id, this.currentNewAttendance.value)
        EditAttendanceDataService.post(this.$route.params.id, this.$route.params.groupid, this.$route.params.lessonid, this.currentAttendance._id, newAttendance)
          .then(response => {
            this.students = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
          this.refreshList();
      },
      refreshList() {
        this.retrieveAttendance();
        this.retrieveStudents();
        this.currentStudent= null;
        this.currentIndex = -1;
      },
    },
    mounted() {
        this.retrieveAttendance();
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
  
  .col-md-6 {
    position: relative;
    max-width: 300px;
  }
  
  .col-md-7 {
    position: absolute;
    left: 48%;
    max-width: 300px;
  }

  .col-md-8 {
    position: absolute;
    left: 65%;
    max-width: 300px;
  }
  </style>