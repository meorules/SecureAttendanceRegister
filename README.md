# AttendanceRegister
Attendance Register Project.<br />
Authors: ``Christopher, Nathan, Mazen, Lantana``.

# What is the project?
University Project for SAD Module<br />
Group: ``Thu 16-18 Group 1``

# Setup Guide:

1. Install npm
2. Install nodejs
3. Install Vue.js
4. Install MongoDB/Mongosh (same process as outlined in ``Week 03 - Lab - NodeJS + Express + Mongoose``)
5. Suggested IDE: VSCode

NOTE: If any of the steps below fail, please find a list of all npm packages we have installed at the bottom of this README.<br />
If a certain version is required, please find the required versions for our project in our ``package.json`` files.

# Setup & Running the MongoDb.
Execute your MongoDB server.<br />
Example Command (run inside Powershell): ``H:\MongoDB\MongoDBServer\bin\mongod.exe --dbpath=H:\MongoDB\MongoDBServer\data --nojournal``<br />
NOTE: Slashes conform to Windows standards.<br />
NOTE: Our database is populated when our backend is launched. If data exists, we do not repopulate the database.<br />
NOTE: If database issues occur, you may need to use Mongosh to drop the database.<br />
Example Command (run inside Powershell): ``H:\MongoDB\MongoDBClient\bin\mongosh.exe``<br />
To switch to our database: ``use Attendancedb``<br />
To drop our database: ``db.dropDatabase()``<br />

# Setup for top level directory.
Ensure you are within the top-level directory.<br />
Example: ``AttendanceRegister``<br />
Execute: ``npm install``<br />

# Setup & Running the frontend.

Ensure you are within the frontend directory.<br />
Example: ``AttendanceRegister/frontend-vue``<br />
Execute: ``npm install``<br />
Execute: ``npm run serve``<br />
Which starts the frontend Vue3 framework.<br />
To access the frontend, connect to your localhost: ``http://localhost:8080/``<br />
NOTE: Slashes may be different on your machine if using Windows. (Example path obtained in Ubuntu).

# Setup & Running the backend.
Ensure you are within the backend directory.<br />
Example: ``AttendanceRegister/backend``<br />
Execute: ``npm install``<br />
Execute: ``npm start``<br />
Which starts the back-end Node server.<br />
NOTE: You will need the Mongo Database running on your machine whilst running the backend for it to compile.<br />
NOTE: Slashes may be different on your machine if using Windows. (Example path obtained in Ubuntu).

# Running Unit Tests.
If you are running Unit tests, run: ``npm test``<br />
These Unit tests are run within: ``AttendanceRegister/backend``

# Running UI (Selenium) Tests.
If you are running UI tests, you will be required to use the .SIDE file provided. (found in our .zip upload on Blackboard)<br />
You will need to install the Selenium extension for either Microsoft Edge, Firefox or Chrome.<br />
You will need to select ``Open an existing project`` and use the .SIDE file provided.<br />
The default path should be: ``http://localhost:8080/login`` by default, if not set.

# List of npm packages (If manual install is required):
Any of these packages may be installed with ``npm install``
```
@vue/cli
express-generator
nodemon
@fortawesome/fontawesome-svg-core
@fortawesome/free-solid-svg-icons
@fortawesome/vue-fontawesome
axios
bootstrap
core-js
jquery
popper.js
semantic-ui-css
vee-validate
vue
vue-flash-message
vue-router
vuex
yup
bcryptjs
body-parser
cookie-parser
cors
debug
express
http-errors
jsonwebtoken
mongoose
morgan
multer
nodemon
pug
```

# List of Development Dependencies (If manual install is required):
```
@babel/core
@babel/eslint-parser
@vue/cli-plugin-babel
@vue/cli-plugin-eslint
@vue/cli-service
eslint
eslint-plugin-vue
chai
chai-http
mocha
```
