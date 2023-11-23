const {CronTime} = require('cron-time-generator');

function calculatePeriodFromString(settlementPeriod){
    let parts = settlementPeriod.split(" ");
    let numerical = parseInt(parts[0]);
    let unit = parts[1].toLowerCase();

    let daysInWeek = 7;
    let avgDaysInMonth = 30;
    let avgDaysInYear = 365;

    let dateObj = new Date();
    switch(unit){
        case "minute":
        case "minutes":
            dateObj = CronTime.every(numerical).minutes();
            break;
        case "day":
        case "days":
            dateObj = CronTime.every(numerical).days();
            break;
        case "week":
        case "weeks":
            dateObj = CronTime.every(daysInWeek*numerical).days();
            break;
        case "month":
        case "months":
            dateObj = CronTime.every(avgDaysInMonth*numerical).days();
            break;
        case "year":
        case "years":
            dateObj = CronTime.every(avgDaysInYear*numerical).days();
            break;
        default:
            dateObj = CronTime.every(0).days();
            break;
    }
    return dateObj;
}

module.exports = {calculatePeriodFromString};