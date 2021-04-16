const NotificationService = require('./services/notification_service');
const service = new NotificationService();
try{
    service.sendAdHocNotifications("Hey There","sms");

    service.scheduleNotifications("New Football Boots","whatsapp","every_minute");
}catch(error){
    console.log(error.message);
}