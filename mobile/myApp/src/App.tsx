import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Colors } from './constants';
import AppNavigator from './navigation/AppNavigator';

const App: React.FC = () => {
  return (
    <>
      <StatusBar style="light" backgroundColor={Colors.background} />
      <AppNavigator />
    </>
  );
};

export default App;
