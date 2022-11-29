<template>
  <html>
    <div class="container">
      <header class="jumbotron">
        <h3>{{content}}</h3>
      </header>
    </div>
    </html>
  </template>
  
  <script>
  import SecurityDataService from '../services/SecurityDataService';
  
  export default {
    name: 'ProtectedContent',
    data() {
      return {
        content: ''
      };
    },
    mounted() {
      SecurityDataService.getProtectedContent().then(
        response => {
          this.content = response.data;
        },
        error => {
          this.content =
            (error.response && 
             error.response.data &&
             error.response.data.message ) ||
            error.message ||
            error.toString();
        }
      );
    }
  };
  </script>

  <style>
     body {
      background-color: rgb(241, 239, 239);
    }
  </style>