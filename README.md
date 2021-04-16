# notification_service
Notification service that integrates with third party messaging applications. Periodically sends notifications.

----------------------------------------------------------------------------------

#Overview
The application has a service layer which calls a medium created by the medium factory.
The getter function has been stubbed for unit testing to isolate the service from the medium;

The medium classes are singletons responsible for the actual pushing of the notifications as well as scheduling. They 

The medium classes maintain the corresponding medium's inventory which has details of the push notifications for the medium and the cron object.

A constants file maintains constants which can be configured, such as number of retries, names of media etc.

The number of retries is set to 3 by default and can be changed in constants.

If no time frequency is provided for the scheduler, it by default schedules it every second. This can be changed in constants as well.

To mimic a partial chance of failure, Math.random() function has been used.

The unit testing for Whatsapp medium has not been added but is identical to the sms medium.


----------------------------------------------------------------------------------

#To run code / use the service:
run : 'npm start'

#To run tests:
run : 'npm test'

----------------------------------------------------------------------------------

#Patterns used:
Factory(creational) factories/notification_medium_factory, Singleton(creational): medium/*

----------------------------------------------------------------------------------

#External Dependencies:
node-cron: for scheduling tasks, mocha: test runner for running unit tests
