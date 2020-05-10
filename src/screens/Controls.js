import React from 'react';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// galio components
import { Text, Block, Button, Card, Input, Icon } from 'galio-framework';
import theme from '../theme';
import Nav from '../components/NavBar';
const { width } = Dimensions.get('screen');

export default class ControlsScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <Block safe flex>
        <Nav title="Controls" navigation={navigation} />

        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <Block style={styles.container}>
            {/* Buttons examples using Button component */}
            <Block flex style={{ marginBottom: theme.SIZES.BASE }}>
              <Block flex style={{ padding: theme.SIZES.BASE }}>
                <Text h5>Buttons</Text>
              </Block>
              <Block flex center style={{ padding: theme.SIZES.BASE }}>
                <Button style={styles.button} round>
                  Primary
                </Button>
                <Button color="info" style={styles.button} round>
                  Info
                </Button>
                <Button style={styles.button} color="success" round>
                  Success
                </Button>
                <Button color="warning" style={styles.button} round>
                  Warning
                </Button>
                <Button color="error" style={styles.button} round>
                  Error
                </Button>
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
});
