import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerItemList,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { Fontisto, Ionicons } from '@expo/vector-icons';
import { Block, Icon, Text } from 'galio-framework';
// screens
import Home from './src/screens/Home';
import Status from './src/screens/Status';
import Trades from './src/screens/Trades';
import Controls from './src/screens/Controls';
import Settings from './src/screens/Settings';

import theme from './src/theme';

const GalioDrawer = (props) => (
  <SafeAreaView
    style={styles.drawer}
    forceInset={{ top: 'always', horizontal: 'never' }}
  >
    <Block space="between" row style={styles.header}>
      <Block flex={0.3}>
        <Fontisto
          name="money-symbol"
          iconStyle={{ marginTop: 18 }}
          size={42}
          color={theme.PALETTE.INDIGO}
        />
      </Block>
      <Block flex style={styles.middle}>
        <Text size={theme.SIZES.FONT * 1.4}>Trading Bot</Text>
        <Text muted size={theme.SIZES.FONT * 1.2}>
          freqtrade
        </Text>
      </Block>
    </Block>
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
  },
  header: {
    paddingHorizontal: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 1.25,
    paddingBottom: theme.SIZES.BASE * 1.6875,
    borderBottomColor: '#D8D8D8',
    borderBottomWidth: 0.5,
    //marginTop: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : null,
  },
  middle: {
    justifyContent: 'center',
  },
});

const MenuIcon = ({ name, family, focused }) => (
  <Icon
    name={name}
    family={family}
    size={theme.SIZES.FONT}
    color={focused ? theme.COLORS.ICON : '#5D5D5D'}
  />
);

MenuIcon.defaultProps = {
  name: null,
  family: null,
  focused: false,
};

MenuIcon.propTypes = {
  name: PropTypes.string,
  family: PropTypes.string,
  focused: PropTypes.bool,
};

const options = {
  contentComponent: (props) => <GalioDrawer {...props} />,
  contentOptions: {
    labelStyle: {
      fontWeight: '500',
      color: theme.COLORS.GREY,
      fontSize: theme.SIZES.FONT * 0.875,
      marginLeft: theme.SIZES.BASE * 0.75,
    },
    activeLabelStyle: {
      color: theme.COLORS.WHITE,
    },
    activeBackgroundColor: theme.COLORS.THEME,
    itemsContainerStyle: {
      paddingVertical: 0,
    },
    iconContainerStyle: {
      marginHorizontal: 0,
      marginLeft: theme.SIZES.BASE * 1.65,
      // marginRight: theme.SIZES.BASE * 0.76,
    },
  },
};

const Drawer = createDrawerNavigator();

function TradingBotApp(props) {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerStyle={{ width: '60%' }}
        drawerContent={(props) => <GalioDrawer {...props} />}
      >
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{
            drawerIcon: (props) => (
              <MenuIcon
                name="home"
                family="fontawesome"
                focused={props.focused}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Status"
          component={Status}
          options={{
            drawerIcon: (props) => (
              <MenuIcon
                name="linechart"
                family="antdesign"
                focused={props.focused}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Trades"
          component={Trades}
          options={{
            drawerIcon: (props) => (
              <MenuIcon
                name="history"
                family="fontawesome"
                focused={props.focused}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Controls"
          component={Controls}
          options={{
            drawerIcon: (props) => (
              <MenuIcon
                name="game-controller"
                family="entypo"
                focused={props.focused}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Settings"
          options={{
            drawerIcon: (props) => (
              <MenuIcon
                name="settings"
                family="feather"
                focused={props.focused}
              />
            ),
          }}
        >
          {(props) => (
            <Settings {...props} expoPushToken={props.expoPushToken} />
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default TradingBotApp;
