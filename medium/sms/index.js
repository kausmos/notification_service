let inventory = require('./inventory');
const cron = require('node-cron');
const constants = require('../../constants.js');

class SMSMedium {
    constructor(){
     if(! SMSMedium.instance){
       this.job = cron;
       this.inventory=inventory;
       SMSMedium.instance = this;
     }
  
     return SMSMedium.instance;
    }
  
   //sms medium logic comes here
    scheduleNotifications(message,frequency){
        const cronexpression=this.getCronExpression(frequency);        
        this.job.schedule(cronexpression,()=>this.sendNotifications(message));
        
    }

    sendNotifications(message){
        for(let user of this.inventory.getUsers()){
            if(this.pushNotificationToUser(message,user.number)){
                console.log(`SMS message: '${message}' sent to '${user.name}' on '${user.number}'`);
            };
        }
    }

    pushNotificationToUser(message,number,retries=constants.numOfRetries){
        //This is a stub, integration with 3rd party api happens here
        //bedlow condition mimics a small chance of failure
        //below condition will be replaced by something like if(res.ok)        
        if(this.smsVendorApiCall()) return true;

        //this code is executed only on above condition being false, i.e. failure case
        if(retries>0){
            console.log(`SMS to ${number} failed...Retrying.`);
            return this.pushNotificationToUser(message,number,retries-1);
        }else{
            console.log(`SMS to ${number} failed...Max retries reached.`);
            return false;
        }
            
       
    }

    getCronExpression(frequency){
        switch(frequency){
            case 'monthly':
                return constants.cronExpression['MONTHLY'];
            case 'daily':
                return constants.cronExpression['DAILY'];
            case 'weekly':
                return constants.cronExpression['wEEKLY'];
            case 'every_minute':
                return constants.cronExpression['EVERY_MINUTE'];
            default:
                return constants.cronExpression['DEFAULT'];
        }
    }

    smsVendorApiCall(message,number){
        if(Math.floor(Math.random() * 10)) return true;
        return false;
    }
  }
  
  
  module.exports = SMSMedium;