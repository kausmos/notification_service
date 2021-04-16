const medium_factory= require('../factories/notification_medium_factory');
class NotificationService{
    
    scheduleNotifications(message,medium,frequency){
        const mediumSingleton = this.getMediumSingleton(medium);
        mediumSingleton.scheduleNotifications(message,frequency);

    }
    sendAdHocNotifications(message,medium){
        const mediumSingleton = this.getMediumSingleton(medium);
        mediumSingleton.sendNotifications(message);
    }

    getMediumSingleton(medium){
        return medium_factory(medium);       
    }
}

module.exports = NotificationService;