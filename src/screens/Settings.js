import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Notifications } from 'expo';

import {
  registerPushNotificationToken,
  removePushNotificationToken,
} from '../helpers/helpers';

// galio components
import { Text, Block, Button, Card, Icon, Switch } from 'galio-framework';
import NavBar from '../components/NavBar';

import theme from '../theme';

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      switchNotifications: false,
      ...props,
    };
  }

  async managePushToken() {
    token = await Notifications.getExpoPushTokenAsync();
    if (this.state.switchNotifications) {
      registerPushNotificationToken(token);
    } else {
      removePushNotificationToken(token);
    }
  }

  toggleNotifications = () => {
    this.setState(
      (prevState, props) => ({
        switchNotifications: !prevState.switchNotifications,
      }),
      () => {
        this.managePushToken();
      }
    );
  };

  render() {
    const { navigation } = this.props;
    return (
      <Block safe flex>
        <NavBar title="Settings" navigation={navigation} />

        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <Block style={styles.container}>
            {/* Buttons examples using Button component */}
            <Block flex style={{ marginBottom: theme.SIZES.BASE }}>
              <Block flex style={{ padding: theme.SIZES.BASE }}>
                <Text h5>Notifications</Text>
                <Switch
                  initialValue={this.state.switchNotifications}
                  value={this.state.switchNotifications}
                  onChange={() => this.toggleNotifications()}
                  color={theme.COLORS.PRIMARY}
                  trackColor={{
                    false: theme.COLORS.GREY,
                    true: theme.COLORS.SEAWEED,
                  }}
                />
              </Block>
              <Block flex center style={{ padding: theme.SIZES.BASE }}></Block>
            </Block>
          </Block>
        </ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
    justifyContent: 'flex-start',
    backgroundColor: theme.COLORS.WHITE,
  },
  button: {
    marginBottom: 20,
  },
});
