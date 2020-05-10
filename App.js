import React from 'react';
import { View, StatusBar, Vibration, Platform } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import TradingBotApp from './routes';

export default class App extends React.Component {
  state = {
    expoPushToken: '',
    notification: {},
  };

  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        console.log('Failed to get permission for push notification!');
        return;
      }
      token = await Notifications.getExpoPushTokenAsync();
      this.setState({ expoPushToken: token });
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('trading-bot', {
        name: 'trading-bot',
        description: 'Notifications for the trading bot',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
        badge: true,
      });
    }
  };

  componentDidMount() {
    this.registerForPushNotificationsAsync();
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification = (notification) => {
    Vibration.vibrate(500);
    if (notification.data) console.log(notification.data);
    this.setState({ notification: notification });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden={false} />
        <TradingBotApp expoPushToken={this.state.expoPushToken} />
      </View>
    );
  }
}
