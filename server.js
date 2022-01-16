const bodyParser = require("body-parser");

// Setup empty JS object to act as endpoint for all routes
myProjectData = {};

// Require Express to run server and routes
const express = require ('express');

const cors = require ('cors');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());


// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const portNumber = 8080;
//Local server  running and producing feedback to the Command Line through a working callback function.
app.listen( portNumber , () =>{
    console.log(`The Server is running in port ${portNumber}`);
})

//GET route setup on the server side with the first argument as a string naming the route, and the second argument a callback function to return the JS object created at the top of server code.
app.get("/getMyData" , (req,res)=>{
    res.send(myProjectData);
})

//add an entry to the project endpoint using a POST route setup on the server side and executed on the client side as an asynchronous function.
app.post("/postMyData" , (req,res)=>{
    myProjectData = req.body;
    req.end;
})






