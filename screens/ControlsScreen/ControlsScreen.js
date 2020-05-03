import * as React from 'react';
import { Text, View } from 'react-native';

function ControlsScreen() {
    return (
        <View style={
            {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }
        }>
            <Text>Controls!</Text>
        </View>
    );
}

export default ControlsScreen;