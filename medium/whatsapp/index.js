let inventory = require('./inventory');
const cron = require('node-cron');
const constants = require('../../constants.js');

class WhatsappMedium {
    constructor(){
     if(! WhatsappMedium.instance){
       this.job = cron;
       this.inventory=inventory;
       WhatsappMedium.instance = this;
     }
  
     return WhatsappMedium.instance;
    }
  
   //Whatsapp medium logic comes here
    scheduleNotifications(message,frequency){
        const cronexpression=this.getCronExpression(frequency);        
        this.job.schedule(cronexpression,()=>this.sendNotifications(message));
        
    }

    sendNotifications(message){
        for(let user of this.inventory.getUsers()){
            if(this.pushNotificationToUser(message,user.number)){
                console.log(`Whatsapp message: '${message}' sent to '${user.name}' on '${user.number}'`);
            };
        }
    }

    pushNotificationToUser(message,number,retries=constants.numOfRetries){
        //This is a stub, integration with 3rd party api happens here
        //bedlow condition mimics a small chance of failure
        //below condition will be replaced by something like if(res.ok)        
        if(Math.floor(Math.random() * 10)) return true;

        //this code is executed only on above condition being false, i.e. failure case
        if(retries>0){
            console.log(`Whatsapp to ${number} failed...Retrying.`);
            return this.pushNotificationToUser(message,number,retries-1);
        }else{
            console.log(`Whatsapp to ${number} failed...Max retries reached.`);
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
                return '* * * * * *';
        }
    }
  }
  
  
  module.exports = WhatsappMedium;