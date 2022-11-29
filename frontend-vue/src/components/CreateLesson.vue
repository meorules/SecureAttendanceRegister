<template>
  <html>
    <div class="list row">
      <div class="col-md-6">
        <h3>Create Lesson</h3>
        
        <Form :validation-schema="schema">
          <div class="form-group">
            <label for="lessonDate">Lesson Date:</label>
            <br>
            <input v-model="currentNewLesson.date" type="date"/>
            <label for="appt">Choose a time for your lesson:  </label>
            <br>
            <input v-model="currentNewLesson.time" type="time" id="appt" name="appt"
              min="09:00" max="19:00" required >
            <ErrorMessage name="lessonDate" class="error-feedback" />
            <br><br>
            <button class="btn btn-dark"
            @click="createLesson">Create</button>
          </div> 
        </Form>
      </div>
    </div>
    </html>
  </template>
  
  <script>
  import CreateLessonDataService from "../services/CreateLessonDataService";
  
  export default {
    name: "create-lesson",
    data() {
      return {
        currentNewLesson: {
          date: Date,
          time: String
        },
        name: ""
      };
    },
    methods: {
      createLesson() {
       CreateLessonDataService.create( this.$route.params.id, this.$route.params.groupid, this.currentNewLesson.date, this.currentNewLesson.time);
      },
      
    },
  
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