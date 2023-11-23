const schedule = require('node-schedule');

const {makeSettlement} = require('./makeSettlement');
const split = require('./spliting');
const {processPayment} = require('../PaymentProcessor/processor');
const {CronTime} = require('cron-time-generator');
const {calculatePeriodFromString} = require('./dateConversion');

const group = require('../Models/groupModel');

// create a job based on the settlement period (a cron expression)
const jobForSettlement = async (settlementPeriod, groupId) => {
        const date = await calculatePeriodFromString(settlementPeriod);
        console.log(date);
        const job = schedule.scheduleJob(date, async function(){
        console.log("settlement job started");
        groupObj = await group.findById(groupId);

        // no group present
        if(!groupObj){
            console.log("No group is present");
            console.log("Cancelling the job");
            // cancel associated scheduler
            job.cancel();
            return;
        }

        // no members present in the group
        if(groupObj.members.length == 0){
            console.log("No group members present in the group");
            console.log("Cancelling the job as no members are present");
            // cancel associated scheduler
            job.cancel();
            return;
        }
        
        // split the expenses among the members
        settlementAmountArray = split(groupObj.groupExpensesList[0]);
        
        // payment processing and settlement between members
        settlementAmountArray.forEach(async function(settlementInfo){

            // if there is no amount to settle then return
            if(settlementInfo[2] == 0){
                return;
            }

            // settlementInfo consists of these information -> from, to, amount
            let paymentReq = {
                body:{
                    sender: settlementInfo[0],
                    receiver: settlementInfo[1],
                    amount: settlementInfo[2]
                }
            };
            let paymentRes = await processPayment(paymentReq);

            console.log("payment res", paymentRes);
            // retry payment if failed
            if(paymentRes.error){
                console.log("Error in payment processor");

                let retryCount = 3;
                console.log("retrying payment");
                while(retryCount > 0){
                    retryCount--;
                    paymentRes = await processPayment(paymentReq);
                    if(paymentRes.error){
                        break;
                    }
                }

                if(paymentRes.error){
                    console.log("Payment failed");
                    return;
                }
            }

            console.log(`making settlement for everyone in group id: ${groupObj.name}`);

            let settlementReq = {
                body:{
                    id: groupId,
                    From: settlementInfo[0],
                    To: settlementInfo[1],
                    Amount: settlementInfo[2]
                }
            }
            // make settlement
            let settlementRes = makeSettlement(settlementReq);

            // retry settlement if failed
            if(settlementRes.error){
                console.log("Error in making settlement");
                retryCpunt = 3;
                while(retryCount > 0){
                    retryCount--;
                    console.log("retrying settlement");
                    settlementRes = makeSettlement(settlementReq);
                    if(!settlementRes.error){
                        break;
                    }
                }
            }
        });


    });
};

module.exports = {jobForSettlement};