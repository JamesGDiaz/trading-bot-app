import React from 'react';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { requestApi, capitalize } from '../helpers/helpers';

// galio components
import { Text, Block, Button, Card, Input, Icon } from 'galio-framework';
import theme from '../theme';
import NavBar from '../components/NavBar';
export default class StatusScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingShow_config: true,
      show_config: {},
    };
  }

  setStateFromApi = async (endpoint) => {
    this.setState({ ['loading' + capitalize(endpoint)]: true });
    await requestApi(endpoint).then((response) => {
      console.log(response.data);
      this.setState(
        {
          [endpoint]: response.data,
          ['loading' + capitalize(endpoint)]: false,
        },
        () => {
          console.log(this.state);
        }
      );
    });
  };

  loadData = async () => {
    let endpoints = ['show_config'];
    endpoints.forEach(async (endpoint) => {
      this.setStateFromApi(endpoint);
    });
  };

  componentDidMount() {
    this.loadData();
  }

  render() {
    const { navigation } = this.props;
    return (
      <Block safe flex>
        <NavBar title="Status" navigation={navigation} />

        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.loadingStatus}
              onRefresh={this.loadData}
            />
          }
        >
          <Block style={styles.container}>
            {/* Buttons examples using Button component */}
            <Block flex style={{ marginBottom: theme.SIZES.BASE }}>
              <Block flex style={{ padding: theme.SIZES.BASE }}>
                <Text h4 style={styles.h4}>
                  Status
                </Text>
                {!this.state.loadingShow_config ? (
                  Object.keys(this.state.show_config).map((key, i) => {
                    return (
                      <Text p key={key}>
                        {key}:{' '}
                        {key !== 'minimal_roi'
                          ? String(this.state.show_config[key])
                          : JSON.stringify(this.state.show_config[key])}
                      </Text>
                    );
                  })
                ) : (
                  <ActivityIndicator
                    size="large"
                    color={theme.PALETTE.CARMINE}
                  />
                )}
              </Block>
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
  h4: {
    marginBottom: 12,
  },
  note: {
    marginTop: -16,
    marginBottom: 12,
  },
});
