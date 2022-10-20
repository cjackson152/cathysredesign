
callImages =new Array();
function preload(){
    for (i = 0; preload.arguments.length; i++){
        callImages[i]= new Image();
        callImages[i].src=preload.arguments[i];

    }
};
// placeholder images for month and year buttons
preload('placeholder', 'placeholder', 'placeholder', 'placeholder');

let currentDate = 1;
let nameMonth = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
let today = new Date();
let dayToday = today.getDay() + 1;
let dateToday = today.getDate();
let monthToday = today.getUTCMonth() + 1;
let yearToday = today.getFullYear();
let numberMonth = monthToday;
let numberYear = yearToday;
let dateFirst = new Date(String(numberMonth) + '/1/' + String(numberYear));
let dayFirst = dateFirst.getUTCDay();
let dateLast = new Date(String(numberMonth) + '/0/' + String(numberYear));
let daysNumber = 0;
let calString = '';

function changeDate(buttonpressed) {
    if (buttonpressed == 'previousYear') numberYear--;
    else if (buttonpressed == 'nextYear') numberYear++;
    else if (buttonpressed == 'previousMonth') numberMonth--;
    else if (buttonpressed == 'nextMonth') numberMonth++;
    else if(buttonpressed == 'return') {
        numberMonth = monthToday;
        numberYear = yearToday;

    }
    if (numberMonth == 0) {
        numberMonth = 12;
        numberYear--;
    }
    else if (numberMonth ==13) {
        numberMonth = 1;
        numberYear++;
    }
    
    dateLast = new Date(string(numberMonth+1) + '/0/' + string(numberYear));
    daysNumber = dateLast.getDate();
    dateFirst = new Date(string(numberMonth) + '/1/' + string(numberYear));
    dayFirst = dateFirst.getDay() + 1;
    createCalendar();
    return;
}

function creation() {
    calendarString = '';
    let dayCount = 0;
    calendarString += '<table width = "260" border = "1" cellpadding = "0" cellspacing = "1">'; 
    calendarString += '<tr>'
    //previous year
    calendarString += '<td align=\"center\" valign=\"center\" width=\"30\" height = \"30\"><a href = \"#\" onMouseOver = \"document.Placeholder.src=\'placeholderimage\/placeholder\.jpg\';\" onMouseOut=\"document.placeholder.src=\'images\/placeholder\.jpg\';\" onClick=\"changedate(\'previousYear\')\"><img name=\"previousYear\" src=\"images\/placeholder\.jpg\" width=\"30"\" height=\"30\" border=\"0\" alt=\"prev year\"\/><\/a><\/td>';
    //previous month
    calendarString += '<td align=\"center\" valign=\"center\" width=\"30\" height = \"30\"><a href = \"#\" onMouseOver = \"document.Placeholder.src=\'placeholderimage\/placeholder\.jpg\';\" onMouseOut=\"document.placeholder.src=\'images\/placeholder\.jpg\';\" onClick=\"changedate(\'previousMonth\')\"><img name=\"previousMonth\" src=\"images\/placeholder\.jpg\" width=\"30"\" height=\"30\" border=\"0\" alt=\"prev month\"\/><\/a><\/td>';
    
    calendarString += '<td bgcolor=\"blue\" alight=\"center\" valign=\"center\" width=\"128"\ height=\"30\" colspan=\"3\"><b>' + nameMonth[numberMonth-1] + '&nbsp;&nbsp;' + numberYear + '<\/b><\/td>';
    
    //next year
    calendarString += '<td align=\"center\" valign=\"center\" width=\"30\" height = \"30\"><a href = \"#\" onMouseOver = \"document.Placeholder.src=\'placeholderimage\/placeholder\.jpg\';\" onMouseOut=\"document.placeholder.src=\'images\/placeholder\.jpg\';\" onClick=\"changedate(\'nextYear\')\"><img name=\"nextYear\" src=\"images\/placeholder\.jpg\" width=\"30"\" height=\"30\" border=\"0\" alt=\"next year\"\/><\/a><\/td>';
    // next Month
    calendarString += '<td align=\"center\" valign=\"center\" width=\"30\" height = \"30\"><a href = \"#\" onMouseOver = \"document.Placeholder.src=\'placeholderimage\/placeholder\.jpg\';\" onMouseOut=\"document.placeholder.src=\'images\/placeholder\.jpg\';\" onClick=\"changedate(\'nextMonth\')\"><img name=\"nextMonth\" src=\"images\/placeholder\.jpg\" width=\"30"\" height=\"30\" border=\"0\" alt=\"next month\"\/><\/a><\/td>';

    calendarString += '<\/tr>';

    calendarString += '<tr>';

    calendarString += '<td bgcolor=\"white\" align=\"center\" valign= \"center\" width=\"40\" heigh\"22\">Sun<\/td>';

    calendarString += '<td bgcolor=\"white\" align=\"center\" valign= \"center\" width=\"40\" heigh\"22\">Mon<\/td>';
    calendarString += '<td bgcolor=\"white\" align=\"center\" valign= \"center\" width=\"40\" heigh\"22\">Tues<\/td>';
    calendarString += '<td bgcolor=\"white\" align=\"center\" valign= \"center\" width=\"40\" heigh\"22\">Wed<\/td>';
    calendarString += '<td bgcolor=\"white\" align=\"center\" valign= \"center\" width=\"40\" heigh\"22\">Thu<\/td>';
    calendarString += '<td bgcolor=\"white\" align=\"center\" valign= \"center\" width=\"40\" heigh\"22\">Fri<\/td>';
    calendarString += '<td bgcolor=\"white\" align=\"center\" valign= \"center\" width=\"40\" heigh\"22\">Sat<\/td>';

    currentDate == 1;

    for (var i = 1; i <=6; i++) {
        calendarString += '<tr>';
        for (var x = 1; x <=7; x++) {
            dayCount = (currentDate - dayFirst) + 1;
            currentDate++;
            if ((dayCount > daysNumber) || (dayCount < 1)) {
                calendarString += '<td align=\"center\" bgcolor=\"green\" height=\"20\" width=\"20\">&nbsp;<\/td>';

            } else {
                if (checkevents(dayCount, numberMonth,numberYear,i,x) || ((dayToday == x) && (dateToday == dayCount) && (monthToday == numberMonth))){
                    if ((dayToday == x) && (dateToday == dayCount) && (monthToday == numberMonth)) {
                        calendarString += '<td align=\"center\" bgcolor=\"yellow\" height=\"20\" width=\"30\"><a href=\"javscript:showevents(' + dayCount + ',' + numberMonth + ',' + numberYear + ',' + x + ')\">' + dayCount + '<\/a><\/td>';   
                    }
                    else calendarString += '<td align=\"center\" bgcolor=\"green\" height =\"20\" width=\"30\"><a href=\"javascript:showevents(' + dayCount + ',' + NumberMonth + ',' + numberYear + ',' + x + ')\">' + dayCount + '<\/a><\/td>';
                } else {
                    calendarString += '<td align=\"center\" bgcolor=\"orange\" height=\"20\" width=\"30\">' + dayCount + '<\/td>';

                }
            }
        }
        calendarString += '<tr><td colspan=\"7\" nowrap align=\"center\" valign=\"center\" bgcolor=\"grey\" width=\"280\" height=\"22\"><a href=\"javascript:changedate(\'return\')\"><b>Show Current Date<\/b><\/a><\/td><\/tr><\/table>';
        var object=document.getElementById('calendar');
        object.innerHTML = calendarString;
        currentDate = 1;
    }
}

