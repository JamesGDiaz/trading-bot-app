import React from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  View,
  FlatList,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import Trade from '../components/Trade';
import { requestApi, capitalize } from '../helpers/helpers';

// galio components
import { Text, Block, Button, Card, Input, Icon } from 'galio-framework';
import NavBar from '../components/NavBar';

import theme from '../theme';

const { width } = Dimensions.get('screen');

export default class TradesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingTrades: true,
      trades: [],
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

  loadTrades = () => {
    let endpoints = ['trades'];
    endpoints.forEach(async (endpoint) => {
      this.setStateFromApi(endpoint);
    });
  };

  componentDidMount() {
    this.loadTrades();
  }
  render() {
    const { navigation } = this.props;
    return (
      <Block safe flex>
        <NavBar title="Trade History" navigation={navigation} />
        {!this.state.loadingTrades ? (
          <SafeAreaView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
          >
            <Block style={styles.container}>
              <Block flex style={{ marginBottom: theme.SIZES.BASE }}>
                <FlatList
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.loadingTrades}
                      onRefresh={this.loadTrades}
                    />
                  }
                  data={this.state.trades.trades}
                  renderItem={({ item }) => <Item {...item} />}
                  keyExtractor={(item) => `${item.trade_id}`}
                />
              </Block>
            </Block>
          </SafeAreaView>
        ) : (
          <SafeAreaView
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <ActivityIndicator
              style={{ alignSelf: 'center' }}
              size="large"
              color={theme.PALETTE.CARMINE}
            />
          </SafeAreaView>
        )}
      </Block>
    );
  }
}

function Item(props) {
  return (
    <View style={styles.item}>
      <View style={{ flex: 1 }}>
        <Text h5 style={styles.h5}>
          {props.pair}
        </Text>
        <Text p style={styles.p}>
          {props.close_date ? props.close_date_hum : props.open_date_hum}
        </Text>
        {props.is_open ? (
          <Text muted style={styles.greenText}>
            Open
          </Text>
        ) : (
          <Text muted style={styles.redText}>
            Closed
          </Text>
        )}
      </View>
      <View style={{ flex: 1 }}>
        <Button
          style={styles.button}
          onlyIcon
          icon="arrow-forward"
          iconFamily="Ionicons"
          iconSize={24}
          color={theme.COLORS.NEUTRAL}
          iconColor={theme.PALETTE.INDIGO}
          onPress={() => {
            console.log(props);
          }}
        >
          Open
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: theme.COLORS.WHITE,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    width: 40,
    height: 20,
    marginRight: 6,
  },
  h5: {
    fontSize: theme.SIZES.FONT * 1.125,
  },
  p: {
    fontSize: theme.SIZES.FONT * 0.875,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: theme.COLORS.WHITE,
    padding: 4,
    paddingHorizontal: 12,
    paddingVertical: 12,
    //marginVertical: 4,
    marginHorizontal: 1,
    color: theme.COLORS.GREY,
    //borderRadius: 18,
    borderBottomColor: theme.COLORS.NEUTRAL,
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  greenText: {
    color: theme.COLORS.SUCCESS,
  },
});
