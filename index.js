const NotificationService = require('./services/notification_service');
const service = new NotificationService();
service.sendAdHocNotifications("Hey There","sms");
service.scheduleNotifications("New Football Boots","whatsapp","every_minute");