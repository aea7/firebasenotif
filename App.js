import React, {Component} from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import {AsyncStorage} from 'react-native';
import firebase from 'react-native-firebase';

import HomeScreen from './components/HomeScreen';
import Message from './components/Message';

export default class App extends React.Component {
  async componentDidMount() {
    const notificationOpen: NotificationOpen = await firebase
      .notifications()
      .getInitialNotification();

    if (notificationOpen) {
      const action = notificationOpen.action;
      const notification: Notification = notificationOpen.notification;
      var seen = [];
      alert(
        JSON.stringify(notification.data, function(key, val) {
          if (val != null && typeof val === 'object') {
            if (seen.indexOf(val) >= 0) {
              return;
            }
            seen.push(val);
          }
          return val;
        }),
      );
    }

    this.messageListener = firebase.messaging().onMessage(message => {
      debugger;
    });

    const channel = new firebase.notifications.Android.Channel(
      'firebasenotifs',
      'Firebase Notifications',
      firebase.notifications.Android.Importance.Max,
    ).setDescription('My apps test channel');
    // Create the channel
    firebase.notifications().android.createChannel(channel);
    this.notificationDisplayedListener = firebase
      .notifications()
      .onNotificationDisplayed((notification: Notification) => {
      });

    this.notificationListener = firebase
      .notifications()
      .onNotification((notification: Notification) => {
        // Process your notification as required
        notification.android
          .setChannelId('firebasenotifs')
          .android.setSmallIcon('@drawable/ic_stat_aa')
          .android.setBigPicture('@drawable/bigpic');
        firebase.notifications().displayNotification(notification);
      });

    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened((notificationOpen: NotificationOpen) => {
        // Get the action triggered by the notification being opened
        const action = notificationOpen.action;
        // Get information about the notification that was opened
        const notification: Notification = notificationOpen.notification;
        var seen = [];
        alert(
          JSON.stringify(notification.data, function(key, val) {
            if (val != null && typeof val === 'object') {
              if (seen.indexOf(val) >= 0) {
                return;
              }
              seen.push(val);
            }
            return val;
          }),
        );
        firebase
          .notifications()
          .removeDeliveredNotification(notification.notificationId);
      });
  }
  componentWillUnmount() {
    this.notificationDisplayedListener();
    this.notificationListener();
    this.notificationOpenedListener();
  }
  render() {
    return <AppContainer />;
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Topic: {
    screen: Message,
  },
});

const AppContainer = createAppContainer(AppNavigator);
