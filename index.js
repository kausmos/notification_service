const NotificationService = require('./services/notification_service');
const service = new NotificationService();
service.scheduleNotification("Hey","whatsapp","every_minute");