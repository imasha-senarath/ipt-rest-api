const express = require("express");
const bodyParser = require("body-parser");
const app = express();

//content type
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//import routes
const studentRoutes = require('./api/routes/student-routes');
const expertRoutes = require('./api/routes/expert-routes');

//CORS handling
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({})
    }
    next();
})

//set port
app.listen(3000, () => {console.log("Server is running.")});

app.use('/',studentRoutes);
app.use('/',expertRoutes);

module.exports = app; 


