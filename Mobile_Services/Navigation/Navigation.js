import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import Home from '../Components/Home';
import Launch from '../Components/Launch';

const BabyNavigator = createStackNavigator({
    Launch: {
        screen: Launch,
        navigationOptions: {
            header: null,
        },
    },
    Home: {
        screen: Home,
        navigationOptions: {
            header: null,
        },
    },
})

export default AppContainer = createAppContainer(BabyNavigator);