/* Global Variables */
// Personal API Key for OpenWeatherMap API
const apiKey = "d4f4f7ed2435d1d60814d96a31cf1253";
const generateBTN = document.querySelector("#generate");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 +'.'+ d.getDate() +'.'+ d.getFullYear();


//Adding an event listener to the buttom to perfrom the function on click
//Adds an event listener to an existing HTML button from DOM using Vanilla JS.
//addEventListener() method called on it, with click as the first parameter, and a named callback function as the second parameter.
generateBTN.addEventListener("click" , async() =>
{
        // generate the URL
        const zipCode = document.querySelector("#zip").value ;
        const feelings = document.querySelector("#feelings").value;




//check if zipCode is correct or not and certain all require data are put in input
if(zipCode.length == 5 && feelings.length != 0){

        //try and catch to find errors
        try{

            const temperature = await getTemperature(zipCode);
            console.log(temperature);
            POSTreq(temperature , feelings);
            showData();

        }catch(error){
            console.log(error);
            // appropriately handle the error

            }


}



else if((zipCode.length == 0 || zipCode.length != 5) && feelings.length !== 0){
    document.querySelector(".zipAlert").style.opacity = "1";
}


else if(zipCode.length == 5 && feelings.length == 0 ){
    document.querySelector(".feelingAlert").style.opacity = "1";

}


else if((zipCode.length == 0 || zipCode.length != 5) && feelings.length == 0){
    document.querySelector(".feelingAlert").style.opacity = "1";
    document.querySelector(".zipAlert").style.opacity = "1";
}


})

    //Get data from the API. Extract the relevant results.
async function getTemperature (zipCode){

    const URL = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`;
    // beacuse fetch is asynch should put await 
    const myResponse =  await fetch (URL);
    // to convert stream data to JSON
    const myData = await myResponse.json();
    // get temperature from myData object
    const temperature = myData.main.temp;

    // Data is successfully returned from the external API
    console.log(temperature);

    return temperature;
}



//Save it on backend/express app using a POST request
// post data from api to server
//The client side function should take two arguments, the URL to make a POST to, and an object holding the data to POST.
async function POSTreq (temperature , feelings){
                await fetch ("/postMyData" , {
                   method:"POST",
                   credentials: 'same-origin',
                   headers:{
                       'Content-Type': 'application/json',
                   },
           
                   body: JSON.stringify({
                       date:newDate,
                       temp:temperature,
                       feelings,
           
                   })
       
           
               });
}


//Fetch it back from the express app using a GET request and display the results.
// function to put new data into client side 
async function showData(){
        //asynchronous function to fetch the data from the app endpoint
        const responseData = await fetch("/getMyData");
        try{
        // Transform into JSON
        const getFinalData = await responseData.json();
        console.log(getFinalData);    



                // Write updated data to DOM elements
                //The div with the id, entryHolder should have three child divs with the ids:date - temp - content
                const date = document.getElementById('date');
                const temprature = document.getElementById('temp');
                const content = document.getElementById('content');

                date.innerHTML = getFinalData.date;
                temprature.innerHTML = getFinalData.temp;
                content.innerHTML = getFinalData.feelings;

    }catch(error){
        console.log(error);
           // appropriately handle the error
    }
    
}
