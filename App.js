/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import Registration from './src/screens/Registration'

export default class App extends React.Component {
  render() {
    return (
      <Registration/>
    )
  }
}
