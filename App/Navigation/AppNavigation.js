import React from 'react'
import { ScrollView, Text, Button } from 'react-native'

import { StackNavigator, TabNavigator } from 'react-navigation'
import CalScreen from '../Containers/CalScreen'
import MainScreen2 from '../Containers/MainScreen2'
import MainScreen from '../Containers/MainScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import LoginScreen from '../Containers/LoginScreen'

import styles from './Styles/NavigationStyles'


// Manifest of possible screens
const PrimaryNav = StackNavigator({
  MainScreen: { screen: MainScreen, navigationOptions: { title: 'MainScreen' } },
  CalScreen: { screen: CalScreen }
}, {
  headerMode: 'none'
}
/*
, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'Home',
  navigationOptions: {
    header: {
      style: styles.header
    }
  }
}*/
)

export default PrimaryNav
