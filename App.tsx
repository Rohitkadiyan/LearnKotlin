import React from 'react';
// import Main from './src/ui/screens/main/Main';
import Style from './src/ui/components/custom/Style';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './src/chats/navigation/Navigation';

const App = () => {
  return (
    <SafeAreaProvider style={[Style.flex]}>
      {/* <Main /> */}
      <Navigation />
    </SafeAreaProvider>
  );
};

export default App;
