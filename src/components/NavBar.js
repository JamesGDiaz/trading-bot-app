import React from 'react';
import { NavBar as Nav, Icon } from 'galio-framework';
import { TouchableOpacity } from 'react-native';
import theme from '../theme';

export default function NavBar(props) {
  return (
    <Nav
      title={props.title}
      titleStyle={{ fontSize: theme.SIZES.BASE * 1.5 }}
      left={
        <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
          <Icon
            name="menu"
            family="feather"
            size={theme.SIZES.BASE * 1.5}
            color={theme.COLORS.ICON}
          />
        </TouchableOpacity>
      }
    />
  );
}
