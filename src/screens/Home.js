import React from 'react';
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

import { requestApi, capitalize } from '../helpers/helpers';

// galio components
import { Text, Block, Button, Card, Input, Icon } from 'galio-framework';
import Nav from '../components/NavBar';
import theme from '../theme';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingProfit: true,
      profit: {},
      loadingPerformance: true,
      performance: [],
      loadingBalance: true,
      balance: [],
    };
  }

  setStateFromApi = async (endpoint) => {
    this.setState({ ['loading' + capitalize(endpoint)]: true });
    await requestApi(endpoint).then((response) => {
      this.setState(
        {
          [endpoint]: response.data,
          ['loading' + capitalize(endpoint)]: false,
        },
        () => {}
      );
    });
  };

  loadData = async () => {
    let endpoints = ['profit', 'performance', 'balance'];
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
        <Nav title="Home" navigation={navigation} />

        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={
                this.state.loadingProfit &&
                this.state.loadingBalance &&
                this.state.loadingPerformance
              }
              onRefresh={this.loadData}
            />
          }
        >
          <Block style={styles.container}>
            {/* Buttons examples using Button component */}
            <Block flex style={{ marginBottom: theme.SIZES.BASE }}>
              <Block flex style={{ padding: theme.SIZES.BASE }}>
                <Text h4 style={styles.h4}>
                  Profit
                </Text>
                {!this.state.loadingProfit ? (
                  Object.keys(this.state.profit).map((key, i) => {
                    return (
                      <Text p key={key}>
                        {key}: {this.state.profit[key]}
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
              <Block flex style={{ padding: theme.SIZES.BASE }}>
                <Text h4 style={styles.h4}>
                  Performance
                </Text>
                {!this.state.loadingPerformance ? (
                  this.state.performance.map((key, i) => {
                    return (
                      <Block
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                        key={i}
                      >
                        <Text p>
                          {key.pair}: ${key.profit}
                        </Text>
                        <Text muted>{key.count}</Text>
                      </Block>
                    );
                  })
                ) : (
                  <ActivityIndicator
                    size="large"
                    color={theme.PALETTE.INDIGO}
                  />
                )}
              </Block>
              <Block flex style={{ padding: theme.SIZES.BASE }}>
                {!this.state.loadingBalance ? (
                  <Block>
                    <Block
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                      <Text h4 style={styles.h4}>
                        Balance
                      </Text>
                      <Text muted>
                        {this.state.balance.total.toFixed(2)}{' '}
                        {this.state.balance.symbol}
                      </Text>
                    </Block>
                    {this.state.balance.note ? (
                      <Text muted style={styles.note}>
                        {this.state.balance.note}
                      </Text>
                    ) : null}
                  </Block>
                ) : (
                  <Text h4 style={styles.h4}>
                    Balance
                  </Text>
                )}
                {!this.state.loadingBalance ? (
                  this.state.balance.currencies.map((key, i) => {
                    return (
                      <Block key={i}>
                        <Text p>
                          {key.balance} {key.currency}
                        </Text>
                        <Text muted>
                          Free: {key.free} Used: {key.used}
                        </Text>
                      </Block>
                    );
                  })
                ) : (
                  <ActivityIndicator
                    size="large"
                    color={theme.PALETTE.PASTEL}
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
