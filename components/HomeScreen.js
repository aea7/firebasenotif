// @flow

import React, {Component} from 'react';
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Button,
  View,
  Text,
} from 'react-native';
import Colors from 'Colors';

const topics = [
  {
    title: 'Paypal Payout Clicked',
    description: 'User clicked on Paypal in the Payouts Screen',
    topic: 'paypalpayout',
  },
  {
    title: 'Game Installed',
    description:
      'Covers how to use the prop named style which controls the visuals.',
    topic: 'gameinstalled',
  },
  {
    title: 'SMS Verification Failed',
    description: 'User tried to payout but failed to do so.',
    topic: 'smsfailed',
  },
  {
    title: 'Successful Payout',
    description: 'User successfully cashed out',
    topic: 'successfulpayout',
  },
];

export default class Homescreen extends Component {
  static navigationOptions = {
    title: 'Topics to Subscribe',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: Colors.black,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  render() {
    return (
      <View style={styles.container}>
        {topics.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              accessibilityRole={'button'}
              onPress={() =>
                this.props.navigation.navigate('Topic',
                    {name: item.title, topic: item.topic})
              }
              style={styles.linkContainer}>
              <Text style={styles.link}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 16,
    backgroundColor: Colors.primary,
  },
  linkContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  link: {
    marginLeft: 16,
    flex: 2,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.lighter,
    textShadowColor: '#585858',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 5,
  },
  description: {
    flex: 3,
    paddingVertical: 16,
    padding: 6,
    fontWeight: '400',
    fontSize: 18,
    color: Colors.black,
  },
});
