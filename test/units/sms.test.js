const mocha = require('mocha');
const assert= require('assert');
const sms = require('../../medium/sms');
const smsInventory = require('../../medium/sms/inventory');
const constants=require('../../constants');
const sinon = require("sinon");
describe('SMS Medium ',function(){
    
    it('should be a singleton',()=>{        
        const smsMedium1 = new sms();
        const smsMedium2 = new sms();
        assert.strictEqual(smsMedium1,smsMedium2);
    });
    
    it('should maintain the inventory in its state',()=>{        
        const smsMedium = new sms();        
        assert.strictEqual(smsMedium.inventory,smsInventory);
    });

    it('should maintain the cron job object in its state',()=>{        
        const smsMedium = new sms();        
        assert.strictEqual(typeof smsMedium.job, 'object');        
    });

    it('sendNotifications() should call pushNotificationToUser once per user in inventory',()=>{        
        const smsMedium = new sms();
        const counter = sinon.fake();
        sinon.replace(smsMedium,"pushNotificationToUser",counter);
        smsMedium.sendNotifications("Dummy");
        assert.strictEqual(counter.callCount,smsInventory.getUsers().length);        
        
    });
    it('pushNotificationToUser() should only retry as many times as specified in constants file',()=>{        
        
        
        const smsMedium = new sms();    
       

        //sets up the object to always fail a user notification push, this triggers retries
        const failedApiCall = sinon.stub().returns(false);
        sinon.replace(smsMedium,"smsVendorApiCall",failedApiCall);
       
        const spy = sinon.spy(smsMedium,"pushNotificationToUser");
        smsMedium.pushNotificationToUser("test",7777);
        
        assert.strictEqual(spy.callCount,constants.numOfRetries+1);
        
    });
    
    afterEach(function () {
        sinon.restore();
    });
})
