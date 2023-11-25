const {CronTime} = require('cron-time-generator');
 
function calculatePeriodFromString(settlementPeriod){
    let parts = settlementPeriod.split(" ");
    let numerical = parseInt(parts[0]);
    let unit = parts[1].toLowerCase();
 
    let days = getTimeUnits(numerical, unit);
    
    // not valid numercials or units
    if(numerical < 0 || isNaN(numerical) || !isValidUnit(unit)){
        return null;
    }
 
    let timeUnits = getTimeUnits(numerical, unit);
    let dateObj = getDate(timeUnits, unit);
    return dateObj;
}
 
function getDate(timeUnits, unit){
    let dateObj = {};
    if(!isValidUnit(unit)){
        return null;
    }
    else if(unit == "minute" || unit == "minutes"){
        dateObj = CronTime.every(timeUnits).minutes();
    } else {
        dateObj = CronTime.every(timeUnits).days();
    }
    return dateObj;
}
 
function isValidUnit(unit){
    let units = ["minute", "minutes", "day", "days", "week", "weeks", "month", "months", "year", "years"];
    if(units.includes(unit)){
        return true;
    }
    return false;
}
 
function getTimeUnits(numerical, unit){
    let daysInWeek = 7;
    let avgDaysInMonth = 30;
    let avgDaysInYear = 365;
 
    let timeUnits = 0;
    switch(unit){
        case "week":
        case "weeks":
            timeUnits = daysInWeek*numerical;
            break;
        case "month":
        case "months":
            timeUnits = avgDaysInMonth*numerical;
            break;
        case "year":
        case "years":
            timeUnits = avgDaysInYear*numerical;
            break;
        default:
            timeUnits = numerical;
            break;
    }
    return timeUnits;
}
 
module.exports = {calculatePeriodFromString, getDate};