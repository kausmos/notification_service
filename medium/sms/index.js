let inventory = require('./inventory');
const cron = require('node-cron');
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
    scheduleNotification(message,frequency){
        const cronexpression=this.getCronExpression(frequency);
        this.job.schedule(cronexpression,()=>this.sendNotification(message));
        
    }

    sendNotification(message){
        for(let user of this.inventory.getUsers()){
            console.log(`SMS message: '${message}' sent to '${user.name}' on '${user.number}'`);
            //this can be further replaced by an api call or an sdk module
        }
    }

    getCronExpression(frequency){
        switch(frequency){
            case 'monthly':
                return '0 0 1 * *';
            case 'daily':
                return '0 0 * * *';
            case 'weekly':
                return '0 0 * * 1';
            case 'every_minute':
                return '* * * * *';
            default:
                return '* * * * * *';
        }
    }
  }
  
  const instance = new SMSMedium();
  Object.freeze(instance);
  
  module.exports = instance;