<template>
    <div class="list row display-container">
      <div>
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
      <div>
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
              Excused
            </div>
            <div v-else>
              Late
            </div>
          </li>
        </ul>
      </div>
      <div>
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
    name: "edit-attendance",
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
          {id: 3, name: "Excused"},
          {id: 4, name: "Late"}
        ],
        selectedAttendanceType: ""
      };
    },
    methods: {
      setActiveAttendance(Attendance, index) {
        this.currentAttendance = Attendance;
        this.currentIndex = module ? index : -1;
      },
      retrieveAttendance() {
        EditAttendanceDataService.getAttendance(this.$route.params.id, this.$route.params.groupid, this.$route.params.lessonid)
          .then(response => {
            this.attendances = response.data;
          })
          .catch(e => {
            console.log(e);
          });
      },
      retrieveStudents() {
        EditAttendanceDataService.getStudents(this.$route.params.id, this.$route.params.groupid, this.$route.params.lessonid)
          .then(response => {
            this.students = response.data;
          })
          .catch(e => {
            console.log(e);
          });
      },
      selectAttendance() {
        let newAttendance = this.selectedAttendanceType;
        this.saveAttendance(newAttendance);
      },
      saveAttendance(newAttendance) {
        // EditAttendanceDataService.post(this.$route.params.id, this.$route.params.groupid, this.$route.params.lessonid, this.currentAttendance._id, this.currentNewAttendance.value)
        EditAttendanceDataService.put(this.$route.params.id, this.$route.params.groupid, this.$route.params.lessonid, this.currentAttendance._id, newAttendance)
          .then(response => {
            this.students = response.data;
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
  
  .display-container > div{
    flex: 1 1 0px;
  }

  .display-container {
  min-width:100%;
  display:flex;
  flex-direction: row;
  gap: 10px;
  }

  </style>