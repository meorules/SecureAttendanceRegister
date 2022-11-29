<template>
    <div class="container">
      <header class="jumbotron">
        <h3>
          <strong>{{currentUser.username}}</strong> Profile
        </h3>
        <h4>
          <strong>Signed in successfully</strong>
        </h4>

      </header>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProfilePage',
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      }
    },
    mounted() {
      if (!this.currentUser) {
        this.$router.push('/login');
      }
    }
  };
  </script>
  