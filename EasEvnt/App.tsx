import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import ScreenNavigations from './src/ScreenNavigations';
import { persistor, store } from './src/redux/store';

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ScreenNavigations />
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
