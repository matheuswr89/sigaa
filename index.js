import {AppRegistry} from 'react-native';
import './shim.js';
import App from './src/App';

// PushNotification.configure({
//   // (required) Called when a remote is received or opened, or local notification is opened
//   onNotification: function (notification) {
//     console.log('onNotification:', notification);
//     notification.finish(PushNotificationIOS.FetchResult.NoData);
//   },

//   // Should the initial notification be popped automatically
//   popInitialNotification: true,
//   requestPermissions: true,
// });

// PushNotification.createChannel(
//   {
//     channelId: 'fcm_default_channel', // (required)
//     channelName: 'My channel', // (required)
//     channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
//     playSound: false, // (optional) default: true
//     soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
//     importance: 4, // (optional) default: 4. Int value of the Android notification importance
//     vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
//   },
//   created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
// );

AppRegistry.registerComponent('sigaa', () => App);
