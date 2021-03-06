//establishing event listeners that are page specific
//for info.html
if(window.location.pathname == "/info.html"){
    document.getElementById("selectTable").addEventListener("change", selectTable);
    document.addEventListener('DOMContentLoaded', getAllCalls)
}
//event listener helper function
function selectTable(){// helper function for the event listener on the drop-down box in info.html;
    let selectTable = document.getElementById("selectTable");
    document.getElementsByClassName("table")[0].innerHTML = "";
    if(selectTable.value == "All Calls")
        getAllCalls();
    if(selectTable.value == "Call Stats")
        makeCallStatTable();
    if(selectTable.value == "Average Call Time Per User")
        getAvgCallTimePerUser();
}
//for crud.html
let userDropDown;
if(window.location.pathname == "/crud.html"){
     createUserDropdown(); // declaring a global variable because Ill need the same value cross function... this was to avoid an unrealiable timeout function like in makeCallStatTable
    document.addEventListener("DOMContentLoaded", getDynamicCallTable);
}
function ajaxReq(command,extension,callback,body){//Ajax request that handles all instances of AJAX
    let url ="http://localhost:9595" + extension;
    let xhr = new XMLHttpRequest();
    xhr.open(command,url);
    xhr.onreadystatechange=function(){
        if(this.readyState==4 && this.status == 200){
            callback(xhr);
            return;
        }
        if(this.readyState==4 && (this.status == 201 || this.status==204)){
            callback(xhr);
            return;
        }
        if(this.readyState==4){//This line could be better, but it gets the job done in the current context
            callback(xhr)
        }
    }
    if(command != "GET"){
        xhr.setRequestHeader("Content-type", "application/json")
        let message = JSON.stringify(body);
        xhr.send(message);
    }else
        xhr.send();
}
//functions for getting all calls and putting them in a table, info.html
function getAllCalls(){
    ajaxReq("GET","/call/all",processAllCalls);
}
function processAllCalls(xhr){
    let allCalls = JSON.parse(xhr.response);
    makeAllCallsTable(allCalls);
}
function makeAllCallsTable(dataObj){
    let table = document.getElementsByClassName("table");
    let row = table[0].insertRow();
    row.insertCell(0).innerHTML = "Call ID";
    row.insertCell(1).innerHTML= "Call Time";
    row.insertCell(2).innerHTML= "Notes";
    row.insertCell(3).innerHTML= "Resolved";
    row.insertCell(4).innerHTML = "User"
    for(let i=0; i<dataObj.length; i++){
        let row = table[0].insertRow();
        row.insertCell(0).innerHTML = dataObj[i].id;
        row.insertCell(1).innerHTML = dataObj[i].callTime;
        row.insertCell(2).innerHTML = dataObj[i].notes;
        row.insertCell(3).innerHTML = dataObj[i].resolved;
        row.insertCell(4).innerHTML = "User ID: " + dataObj[i].user.id + "<br>" + "Name: " + dataObj[i].user.firstName+ " " +dataObj[i].user.lastName ;

    }         
}
// functions for getting call stats and putting them in a table, info.html
function makeCallStatTable(){
    ajaxReq("GET","/call/min",getMin);
    ajaxReq("GET","/call/max",getMax);
    ajaxReq("GET","/call/avg",getAverage);
    ajaxReq("GET","/call/median",getMedian);
    ajaxReq("GET","/call/sum",getSum);
    let table = document.getElementsByClassName("table");
    let row = table[0].insertRow();
    row.insertCell(0).innerHTML = "Average Call Time";
    row.insertCell(1).innerHTML= "Max Call Time";
    row.insertCell(2).innerHTML= "Median Call Time";
    row.insertCell(3).innerHTML= "Minimum Call Time";
    row.insertCell(4).innerHTML = "Sum of All Call Times";
    row = table[0].insertRow();
    setTimeout(waitASec, 100);// delays finishing the table until the 
    function waitASec(){//       above ajax request are done processing
    row.insertCell(0).innerHTML = avg.toFixed(2);
    row.insertCell(1).innerHTML = max;
    row.insertCell(2).innerHTML = median;
    row.insertCell(3).innerHTML = min;
    row.insertCell(4).innerHTML = sum;
    }
}
var min, max, avg, median, sum; //Declaring global variables
//Processing functions that set their respective global variables to the values of them from the database
function getMax(xhr){
    max = JSON.parse(xhr.response)
}
function getMin(xhr){
    min = JSON.parse(xhr.response)
}
function getAverage(xhr){
    avg = JSON.parse(xhr.response)
}
function getMedian(xhr){
    median = JSON.parse(xhr.response)
}
function getSum(xhr){
    sum = JSON.parse(xhr.response)
}
// functions for getting the avg time per user and putting into a table, info.html
function getAvgCallTimePerUser(){
    ajaxReq("GET","/user/all/avg",processAvgCallTimePerUser);
}
function processAvgCallTimePerUser(xhr){
    let avgCallTimePerUser = JSON.parse(xhr.response);
    makeAvgCallTimePerUserTable(avgCallTimePerUser);
}
function makeAvgCallTimePerUserTable(dataObj){
    let table = document.getElementsByClassName("table");
    let row = table[0].insertRow();
    row.insertCell(0).innerHTML = "Average Call Time";
    row.insertCell(1).innerHTML= "User";
    let user_time = Object.entries(dataObj);
    for(let [user,time] of user_time){
        let row = table[0].insertRow()
        row.insertCell(0).innerHTML = time;
        let userSplit = user.split(",")
        let id = userSplit[0].split("=")[1];
        let firstName = userSplit[1].split("=")[1];
        let lastName = userSplit[2].split("=")[1].replace("]","");
        row.insertCell(1).innerHTML = "User ID: "+ id+ "<br>" + "Name: " + firstName+ " " + lastName;
    }         
}
// function for making a table of all calls with input fields in the cells, whoose deafault values are the original data...
// with the addition of buttons that will have a special functionality
function getDynamicCallTable(){
    ajaxReq("GET","/call/all",makeDynamicCallTable);
}
function makeDynamicCallTable(xhr){
    let allCalls = JSON.parse(xhr.response);
    let table = document.getElementsByClassName("table");
    let row = table[0].insertRow();
    row.insertCell(0).innerHTML = "Call ID";
    row.insertCell(1).innerHTML= "Call Time";
    row.insertCell(2).innerHTML= "Notes";
    row.insertCell(3).innerHTML= "Resolved";
    row.insertCell(4).innerHTML = "User"
    row.insertCell(5).innerHTML = "Options"
    let nCID; //announcing new call id
    for(let i=0; i<allCalls.length; i++){
        if(i==allCalls.length-1)//makes it so the call id assigned to the new entry will not preceed the last entry of the table
            nCID = allCalls[i].id+1;
        let row = table[0].insertRow();
        row.insertCell(0).innerHTML = "<p id='callID"+i+"'>"+allCalls[i].id+"</p>";//stand alone i is to make sure all the ids of collums are unique and correspond to the row number
        row.insertCell(1).innerHTML = "<input type='number' id='callTime"+i+"' value='"+allCalls[i].callTime+"'>";
        row.insertCell(2).innerHTML = "<textarea type='text' id='notes"+i+"'>"+allCalls[i].notes+"</textarea>";
        if(allCalls[i].resolved==true)
            row.insertCell(3).innerHTML = "<select id='resolved"+i+"'><option value='true'>true</option><option value='false'>false</option></select>";
        else
            row.insertCell(3).innerHTML = "<select id='resolved"+i+"'><option value='true'>true</option><option selected value='false'>false</option></select>";
        row.insertCell(4).innerHTML = "<select id='userID"+i+"'>"+userDropDown.toString()+"</select>";
        row.insertCell(5).innerHTML = "<button id='update"+i+"' onClick='doUpdate(this.id)'>Update</button><br><button id='delete"+i+"'onClick='doDelete(this.id)'>Delete</button>";
    }
    for(let i=0; i<allCalls.length; i++){//This loops through every select tag and sets its default value to its appropriate value
        let options = document.getElementById("userID"+i);
        for(let j = 0; j<options.length; j++){
            if(allCalls[i].user.id == options[j].value)
                options[j].setAttribute("selected","true"); 
        }
    }
    let i = allCalls.length;// The rest of this code creates the last row of the table for crud.html
    row = table[0].insertRow();// This row is responsible for taking new info to create a new call
    row.insertCell(0).innerHTML = "<p id='callID"+i+"'>"+nCID+"</p>";
    row.insertCell(1).innerHTML = "<input type='number' id='callTime"+i+"'>";
    row.insertCell(2).innerHTML = "<textarea type='text' id='notes"+i+"'></textarea>";
    row.insertCell(3).innerHTML = "<select id='resolved"+i+"'><option value='true'>true</option><option value='false'>false</option></select>";
    row.insertCell(4).innerHTML = "<select id='userID"+i+"'>"+userDropDown+"</select>"
    row.insertCell(5).innerHTML = "<button id='create"+i+"' onClick='doCreate(this.id)'>Create</button>";
}
//functions for getting bodies of ajax request and sending them
function doDelete(bId){
    let i = String(bId).split("e")[3]; //gets the row number of the id from the button id
    let body = getBody(i);
    ajaxReq("DELETE","/call",alertGood, body);
}
function doUpdate(bId){
    let i = String(bId).split("e")[1];
    let body = getBody(i);
    ajaxReq("PUT","/call",alertGood, body);
}
function doCreate(bId){
    let i = String(bId).split("e")[2];
    let body = getBody(i);
    ajaxReq("POST","/call",alertGood, body);
}
function alertGood(xhr){//Tells the user if the update,delete, or create was successful or not
    if(xhr.status==201 || xhr.status== 204){
        alert("Success");
    }else{
        alert("Action failed, try again!");}
    document.getElementsByClassName("table")[0].innerHTML = "";//clears the table
    getDynamicCallTable();//gets most recent version of the table
}
function  getBody(i){ //gets the body of the POST,PUT,and DELETE request based on the location of the button that is pushed
    let body= { callTime: document.getElementById("callTime"+i).value,
        id: document.getElementById("callID"+i).innerHTML,
        notes: document.getElementById("notes"+i).value,// notice it gets the values from the correct boxes based on row number
        resolved: document.getElementById("resolved"+i).value,
        user: {
          id: document.getElementById("userID"+i).value,  //only gets id because that is all that is necessary in the body of
        }//                                                 PUT,POST, and DELETE methods being used
    }
    return body;   
}
function createUserDropdown(){//helper function to make the AJAX call to get all users
    ajaxReq("GET","/user/all",makeUserDropDown);
}
function makeUserDropDown(xhr){//makes the options for the user drop-down box
    let allUsers = JSON.parse(xhr.response);
    for(let i = 0; i<allUsers.length; i++){
        userDropDown += "<option value='"+allUsers[i].id+"'>"+allUsers[i].id+". "+allUsers[i].firstName+" "+allUsers[i].lastName+"</option>";
    }
}