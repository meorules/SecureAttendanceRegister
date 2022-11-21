<template>
  <div v-if="currentAnimal" class="edit-form">
    <h4>Animal</h4>
    <form>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name"
          v-model="currentAnimal.name"
        />
      </div>
      <div class="form-group">
        <label for="species">Species</label>
        <input type="text" class="form-control" id="species"
          v-model="currentAnimal.species"
        />
      </div>
      <div class="form-group">
        <label for="breed">Breed</label>
        <input type="text" class="form-control" id="breed"
          v-model="currentAnimal.breed"
        />
      </div>
      <div class="form-group">
        <label for="age">Age</label>
        <input type="text" class="form-control" id="age"
          v-model="currentAnimal.age"
        />
      </div>
      <div class="form-group">
        <label for="colour">Colour</label>
        <input type="text" class="form-control" id="colour"
          v-model="currentAnimal.colour"
        />
      </div>
    </form>

    <button class="badge badge-danger mr-2"
      @click="deleteAnimal"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateAnimal"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on an Animal...</p>
  </div>
</template>

<script>
import ModuleDataService from "../services/ModuleDataService";

export default {
  name: "animal-details",
  data() {
    return {
      currentAnimal: null,
      message: ''
    };
  },
  methods: {
    getAnimal(id) {
      ModuleDataService.get(id)
        .then(response => {
          this.currentAnimal = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateAnimal() {
      ModuleDataService.update(this.currentAnimal._id, this.currentAnimal)
        .then(response => {
          console.log(response.data);
          this.message = 'The animal was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteAnimal() {
      ModuleDataService.delete(this.currentAnimal._id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "animals" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getAnimal(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
 