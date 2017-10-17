import Expo, { Permissions } from 'expo';

const NOTIFICATION_KEY = 'udacicardsnotifications';

export default {
  clearLocalNotification () {
    return Expo.SecureStore.deleteItemAsync(NOTIFICATION_KEY)
      .then(Expo.Notifications.cancelAllScheduledNotificationsAsync)
  },

  createNotification () {
    return {
      title: 'Take a quiz!',
      body: "👋 don't forget to take a quiz today!",
      ios: {
        sound: true,
      },
      android: {
        sound: true,
        priority: 'high',
        sticky: false,
        vibrate: true,
      }
    }
  },

  setLocalNotification () {
    console.log(this);
    Expo.SecureStore.getItemAsync(NOTIFICATION_KEY)
      .then(JSON.parse)
      .then((data) => {
        if (data === null) {
          Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({ status }) => {
              if (status === 'granted') {
                Expo.Notifications.cancelAllScheduledNotificationsAsync()

                let tomorrow = new Date()
                tomorrow.setDate(tomorrow.getDate())
                tomorrow.setHours(20)
                tomorrow.setMinutes(0)

                Expo.Notifications.scheduleLocalNotificationAsync(
                  this.createNotification(),
                  {
                    time: tomorrow,
                    repeat: 'day',
                  }
                )

                Expo.SecureStore.setItemAsync(NOTIFICATION_KEY, JSON.stringify(true))
              }
            })
        }
      });
  }
};
