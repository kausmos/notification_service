const medium_factory= require('../factories/notification_medium_factory');
class NotificationService{
    scheduleNotification(message,medium,frequency){
        const mediumSingeton = medium_factory(medium);
        mediumSingeton.scheduleNotification(message,frequency);

    }
    sendAdHocNotification(message,medium){
        const mediumSingeton = medium_factory(medium);
        mediumSingeton.sendNotification(message);
    }
}

module.exports = NotificationService;