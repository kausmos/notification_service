const medium_factory= require('../factories/notification_medium_factory');
class NotificationService{
    scheduleNotifications(message,medium,frequency){
        const mediumSingeton = medium_factory(medium);
        mediumSingeton.scheduleNotifications(message,frequency);

    }
    sendAdHocNotifications(message,medium){
        const mediumSingeton = medium_factory(medium);
        mediumSingeton.sendNotifications(message);
    }
}

module.exports = NotificationService;