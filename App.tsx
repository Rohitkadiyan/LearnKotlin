import { View } from 'react-native';
import React from 'react';
import Main from './src/ui/screens/main/Main';
import Style from './src/ui/components/custom/Style';

const App = () => {
  return (
    <View style={[Style.flex]}>
      <Main />
    </View>
  );
};

export default App;
