// @flow

import React, {Component} from 'react';
import {Button, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Colors from 'Colors';
import DialogInput from 'react-native-dialog-input';
import firebase from 'react-native-firebase';

export default class Aboutscreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Subscribe',
      dialogVisible: false,
      message: 'Whatever',
    };
  }

  showDialog = () => {
    this.setState({dialogVisible: true});
  };

  closeDialog = () => {
    this.setState({dialogVisible: false});
  };

  sendToFCM = (message: String) => {
    const {navigation} = this.props;
    let topic = navigation.getParam('topic');
    let title = navigation.getParam('name');
    fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'key=AAAA4quRwmc:APA91bHSj7osmmneviDpT2ToIROkDmd11CTRDMyb7pgvSTKtOh29xvryVm5RMEC7RMVREvLhjS4amgVRlkx5bkfqDEiTojyKNyjyfKuogKEwSNZW6rdy2UhAwtArzWhPQcXnvsBiCmrI',
      },
      body: JSON.stringify({
        to: '/topics/' + topic,
        priority: 'high',
        notification: {
          title: title,
          text: message,
          body: message,
          sound: 'default',
          icon: '@drawable/ic_stat_aa',
          high_priority: 'high',
          image:
            'https://makeawebsitehub.com/wp-content/uploads/2019/03/google-url-shortener-alternatives.png',
          show_in_foreground: true,
        },
        android: {
          title: 'YEAH',
          android_channel_id: 'firebasenotifs',
        },
        data: {
          json: {
            type: 'notify',
            text: 'Eimantessssssss',
          },
          my_custom_key2: true,
        },
      }),
    });
    this.setState({dialogVisible: false});
    alert('Send the Push Notification');
  };

  componentDidMount() {
    this.props.navigation.setParams({
      title: this.state.title,
      button: this.onPress,
    });
  }

  onPress = () => {
    let {title} = this.state;
    let {navigation} = this.props;
    if (title === 'Subscribe') {
      firebase.messaging().subscribeToTopic(navigation.getParam('topic'));
      alert('Subscribed to ' + navigation.getParam('name', 'Topic'));
      title = 'Unsubscribe';
    } else {
      firebase.messaging().unsubscribeFromTopic(navigation.getParam('topic'));
      alert('Unsubscribed from ' + navigation.getParam('name', 'Topic'));
      title = 'Subscribe';
    }
    this.setState({title});
    this.props.navigation.setParams({
      title: title,
    });
  };

  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('name', 'Message'),
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: Colors.black,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerRight: (
        <TouchableOpacity
          onPress={navigation.getParam('button')}
          color={Colors.dark}
          style={{paddingRight: 16}}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '400',
              color: Colors.light,
              textShadowColor: '#585858',
              textShadowOffset: {width: 2, height: 2},
              textShadowRadius: 5,
            }}>
            {navigation.getParam('title', 'Subscribe')}
          </Text>
        </TouchableOpacity>
      ),
    };
  };
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.showDialog}>
          <Text>Send Notification</Text>
        </TouchableOpacity>
        <DialogInput
          isDialogVisible={this.state.dialogVisible}
          title={'Push Notification'}
          message={'Do you want to send this message to all topic subscribers?'}
          hintInput={'Message'}
          submitInput={inputText => {
            this.sendToFCM(inputText);
          }}
          closeDialog={() => {
            this.closeDialog();
          }}
        />
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
