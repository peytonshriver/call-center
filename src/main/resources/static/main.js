function ajaxReq(command,extension,callback,body){
    let url ="http://localhost:9595" + extension;
    let xhr = new XMLHttpRequest();
    xhr.open(command,url);
    xhr.onreadystatechange=function(){
        if(this.readyState==4 && this.status == 200)
            callback(xhr);
        if(this.readyState==4 && this.status == 201)
            callback();
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
    setTimeout(waitASec, 100);
    function waitASec(){
    row.insertCell(0).innerHTML = avg;
    row.insertCell(1).innerHTML = max;
    row.insertCell(2).innerHTML = median;
    row.insertCell(3).innerHTML = min;
    row.insertCell(4).innerHTML = sum;
    }
}
var min, max, avg, median, sum; //Declaring global variables
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
    for(let i=0; i<allCalls.length; i++){
        let row = table[0].insertRow();
        row.insertCell(0).innerHTML = "<input type='number' id='callID"+i+"' value='"+allCalls[i].id+"'>";
        row.insertCell(1).innerHTML = "<input type='number' id='callTime"+i+"' value='"+allCalls[i].callTime+"'>";
        row.insertCell(2).innerHTML = "<textarea type='text' id='notes"+i+"' rows='4' cols='50'>"+allCalls[i].notes+"</textarea>";
        if(allCalls[i].resolved==true)
            row.insertCell(3).innerHTML = "<select id='resolved"+i+"'><option value='true'>true</option><option value='false'>false</option></select>";
        else
            row.insertCell(3).innerHTML = "<select id='resolved"+i+"'><option value='true'>true</option><option selected value='false'>false</option></select>";
        //document.getElementById("resolved"+i).selected = allCalls[i].resolved;
        row.insertCell(4).innerHTML = "User ID:   " + "<input type='number' id='userID"+i+"' value='"+allCalls[i].user.id+"'>" + "<br>" + "First Name: " + "<input type='text' id='firstName"+i+"' value='"+allCalls[i].user.firstName+"'>"+ " <br> Last Name:" + "<input type='text' id='lastName"+i+"' value='"+allCalls[i].user.lastName+"'>";
        row.insertCell(5).innerHTML = "<button id='update"+i+"' onClick='doUpdate(this.id)'>Update</button><br><button id='delete"+i+"'onClick='doDelete(this.id)'>Delete</button>";
    }
    let i = allCalls.length;
    row = table[0].insertRow();
    row.insertCell(0).innerHTML = "<input type='number' id='callID"+i+"'>";
    row.insertCell(1).innerHTML = "<input type='number' id='callTime"+i+"'>";
    row.insertCell(2).innerHTML = "<textarea type='text' id='notes"+i+"' rows='4' cols='50'></textarea>";
    row.insertCell(3).innerHTML = "<select id='resolved"+i+"'><option value='true'>true</option><option value='false'>false</option></select>";
    row.insertCell(4).innerHTML = "User ID:   " + "<input type='number' id='userID"+i+"'>" + "<br>" + "First Name: " + "<input type='text' id='firstName"+i+"'>"+ " <br> Last Name:" + "<input type='text' id='lastName"+i+"'>";
    row.insertCell(5).innerHTML = "<button id='create"+i+"' onClick='doCreate(this.id)'>Create</button>";
    console.log(i);


}
function doDelete(bId){
    let i = String(bId).split("e")[3];
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
function alertGood(){
    alert("Success")
}
function  getBody(i){
    let body= { callTime: document.getElementById("callTime"+i).value,
        id: document.getElementById("callID"+i).value,
        notes: document.getElementById("notes"+i).value,
        resolved: document.getElementById("resolved"+i).value,
        user: {
          firstName: document.getElementById("firstName"+i).value,
          id: document.getElementById("userID"+i).value,
          lastName: document.getElementById("lastName"+i).value
        }
    }
    return body;
    
}
//event listeners
//for info.html
if(window.location.pathname == "/info.html"){
    document.getElementById("selectTable").addEventListener("change", selectTable);
    document.addEventListener('DOMContentLoaded', getAllCalls)
}
//for crud.html
if(window.location.pathname == "/crud.html")
    document.addEventListener("DOMContentLoaded", getDynamicCallTable)
//event listener helper function
function selectTable(){
    let selectTable = document.getElementById("selectTable");
    document.getElementsByClassName("table")[0].innerHTML = "";
    if(selectTable.value == "All Calls")
        getAllCalls();
    if(selectTable.value == "Call Stats")
        makeCallStatTable();
    if(selectTable.value == "Average Call Time Per User")
        getAvgCallTimePerUser();
    // add other values and functions associated with them
}
