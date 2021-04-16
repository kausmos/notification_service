const mocha = require('mocha');
const assert= require('assert');
const NotificationService = require('../../services/notification_service');
const medium_factory = require('../../factories/notification_medium_factory');
const constants=require('../../constants');
const sinon = require("sinon");

describe('Notification Service ',function(){
    
    it('scheduleNotifications() should call the medium factory once',()=>{        
        //replace the getMediumSingleton to return mockMedia
        
        const service = new NotificationService();       

        let stub=sinon.stub(service,"getMediumSingleton");
        stub.returns(
            {
                scheduleNotifications:function(){}
            }
        )
        
        service.scheduleNotifications("Test","sms");
        assert.strictEqual(stub.callCount,1);        
    });
    it('sendAdHocNotifications() should call the medium factory once',()=>{        
        //replace the getMediumSingleton to return mockMedia
        
        const service = new NotificationService();
        
        let stub=sinon.stub(service,"getMediumSingleton");
        stub.returns(
            {
                sendNotifications:function(){}
            }
        )
        
        service.sendAdHocNotifications("Test","sms");
        assert.strictEqual(stub.callCount,1);        
    });    
    
    afterEach(function () {
        sinon.restore();
    });
})
