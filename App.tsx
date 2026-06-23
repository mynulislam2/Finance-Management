import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './src/store';
import RootNavigator from './src/navigation/RootNavigator';

function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
        <RootNavigator />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;