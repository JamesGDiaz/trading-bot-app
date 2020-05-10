import React from 'react';

// galio components
import {
    Text, Block, Button, Card, NavBar, Input, Icon, Accordion
} from 'galio-framework';
import theme from '../theme';

function Trade(props) {
    return (
        <Block>
            <Text h5>Open date {props.open_date}</Text>
        </Block>
    )
}

export default Trade;