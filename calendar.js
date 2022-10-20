today = new Date();
currentMonth = today.getMonth();
currentYear = today.getFullYear();
selectYear = document.getElementById("year");
selectMonth = document.getElementById("month");
eventDay = document.querySelector("eventList")
//variables for popup on date
popup = $("#modal");
closeModal = document.querySelector(".closeModal");
let editing
//Month Names for display
months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : {}
//{

monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);

//next month button
function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth +1) % 12;
    showCalendar(currentMonth, currentYear);
}

//last month button
function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

//jump to month/ year
function choose() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

// function to click tds through calendar
$(document).on('click', 'td', function(e){
    $('.eventTitle').text('')
    $('.modal-venue').text('');
    $('.modal-location').text('');
    editing = $(this).text()
    $('.modal-title').text((currentMonth + 1) + "/" + $(this).text() + "/" + currentYear);
    $('.eventTitle').text(todos[editing] ? todos[editing].title : '')
    $('.modal-venue').text(todos[editing] ? todos[editing].venue : '');
    $('.modal-location').text(todos[editing] ? todos[editing].location : '');
    $('.modal-body').text(todos[editing] ? todos[editing].info : '');
    $('.modal').attr('style', 'display:block');
    $('.modal').addClass('show');
    // the code to change the color of the correct cell needs further expanding so its only on if event is there
    e.target.classList.add('bg-success')
})

$(document).on('click', '.close', function(){
    $('.modal').attr('style', 'display:none');
    $('.modal').removeClass('show');
})

$(document).on('click', '.removeEvent', 'td', function(){
    $('.eventTitle').text("")
    $('.modal-venue').text("");
    $('.modal-location').text("");
    $('.modal-body').text("");
    $('.modal').attr('style', 'display:block');
    //functions if cell is removed, but doesnt function properly, currently removes all color from the calendar
    
})


$(document).on('click', '.createEvent', 'td', function(e){
    let whatEvent = prompt("Whats the Event?")
    let whatVenue = prompt("Whats the venue name?")
    let whatLocation = prompt("Wheres it at?")
    let whatInfo = prompt("What are you doing?")

    // $('.eventTitle').text(whatEvent);
    // $('.modal-venue').text(whatVenue);
    // $('.modal-location').text(whatLocation);
    // $('.modal-body').text(whatInfo);
    let temp = {
        title: whatEvent,
        venue: whatVenue,
        location: whatLocation,
        info: whatInfo
    }
    todos[editing] = temp
    localStorage.setItem('todos', JSON.stringify(todos))
})

// this currently works but removes the color from other dates marked important
// need to write event check that supercedes mouseout event
// ask ta
$(document).on('mouseover', 'td',  function(){
    $(this).addClass('bg-info')
})

$(document).on('mouseout', 'td', function(){
    $(this).removeClass('bg-info')
})

//code thought for events
/*
if(eventList === cell){
    cell.classList.add('bg-info');
    $('.eventTitle').text(date, eventList);
    $('.modal-venue').text(date, venueList);
    $('.modal-location').text(date, locationList);
    $('.modal-body').text(date, eventInfo);
}




*/

//generates calendar
function showCalendar(month, year) {

let firstDay = (new Date(year, month)).getDay();

tbl = document.getElementById("calendar-body");

tbl.innerHTML = "";

monthAndYear.innerHTML = (months[month]) + " " + year;
selectYear.value = year;
selectMonth.value = month;


//creates calendar rows
let date = 1;
for (let i = 0; i < 6; i++) {
    let row = document.createElement("tr");  


//creates calendar cells
for (let a = 0; a < 7; a++) {
    if (i === 0 && a <firstDay) {
        
        cell = document.createElement("td");
        cellText = document.createTextNode("");
        cell.appendChild(cellText);
        cell.setAttribute('data-todo', '')
        row.appendChild(cell);
    }
    else if (date > daysInMonth(month, year)) {
        break;
    }
    else {
        cell = document.createElement("td");
        cellText = document.createTextNode(date);
        cell.setAttribute('id', `data${date}`);
        cell.setAttribute('data-todo', '');
        todos[date] ? cell.classList.add("bg-success") : ''
        
        //this is the code that causes the highlighting didnt realize it was still here
        if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()){
            cell.classList.add("bg-primary");
        }
        cell.appendChild(cellText);
        row.appendChild(cell);
        date++
    }
}
    tbl.appendChild(row);
}

function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}
}


