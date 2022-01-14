const bodyParser = require("body-parser");

// Setup empty JS object to act as endpoint for all routes
myProjectData = {};
const portNumber = 8080;
const cors = require ("cors");
// Require Express to run server and routes
const express = require ("express");

// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors);
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.listen( portNumber , () =>{
    console.log(`The Server is running in port ${portNumber}`);
})

app.get("/getMyData" , (req,res)=>{
    res.send(myProjectData);
})

app.post("/postMyData" , (req,res)=>{
    console.log("here");
    myProjectData = req.body;
    console.log("myProjectData");
    req.end;
})