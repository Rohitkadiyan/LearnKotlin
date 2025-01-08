/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
//Register Headless js Task
AppRegistry.registerHeadlessTask('OnAttendanceChange', () => {
    return require('./src/ui/screens/geofence/OnAttendanceChange');
});
