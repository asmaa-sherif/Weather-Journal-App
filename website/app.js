/* Global Variables */
const apiKey = "d4f4f7ed2435d1d60814d96a31cf1253";
const generateBTN = document.querySelector("#generate");
const feelings = document.querySelector("#feelings").value;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();

generateBTN.addEventListener("click" , async() =>
{
    const zipCode = document.querySelector("#zip").value ;
    const URL = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`;

   try{
    // beacuse fetch is asynch should put await 
    const myResponse =  await fetch (URL);
    // to convert stream data to JSON
    const myData = await myResponse.json();
    // get temperature from myData object
    const temperature = myData.main.temp;
    console.log(temperature);



        await fetch ("/postMyData" , {
            method:"POST",
            headers:{
                "content-type" : "application/JSON"
            },
    
            body: JSON.stringify({
                date:newDate,
                temp,
                feelings
    
            })
    
        })


    }catch(error){
        console.log(error)
    }
   
    userShow();
    
        

})



const userShow = async ()=>{
    const responseData = await fetch ("/getMyData");
    try{
    const getFinalData = await responseData.json();
    console.log(getFinalData);

document.getElementById("date").innerHTML = `Data: ${newDate}`;
document.getElementById("temp").innerHTML = `Data: ${temperature}`;
document.getElementById("content").innerHTML = `Data: ${feelings}`;


}catch(error){
    console.log(error);
}
}





