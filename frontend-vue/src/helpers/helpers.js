import axios from 'axios';
import Vue from 'vue';
import VueFlashMessage from 'vue-flash-message';
import 'vue-flash-message/dist/vue-flash-message.min.css';

Vue.use(VueFlashMessage, {
    messageOptions: {
        timeout: 3000,
        pauseOnInteract: true
    }
});

const vm = new Vue();
const baseURL = 'http://localhost:3050/Attendance/animals/';

const handleError = fn => (...params) =>
    fn(...params).catch(error => {
        vm.flash(`${error.response.status}: ${error.response.statusText}`, 'error');
    });
 
export const api = {
    getAnimalById: handleError(async id => {
        const res = await axios.get(baseURL + id);
        return res.data;
    }),
    getAnimals: handleError(async () => {
        const res = await axios.get(baseURL);
        console.log("received data: " + JSON.stringify(res.data) );
        return res.data;
    }),
    deleteAnimal: handleError(async id => {
        const res = await axios.delete(baseURL + id);
        return res.data;
    }),
    createAnimal: handleError(async payload => {
        const res = await axios.post(baseURL, payload);
        return res.data;
    }),
    updateAnimal: handleError(async payload => {
        const res = await axios.put(baseURL + payload._id, payload);
        return res.data;
    })
};