import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import ReduxThunk from 'redux-thunk';
//import { composeWithDevTools } from 'redux-devtools-extension'
//agregarlo en const store = createStore(rootReducer, composeWithDevTools());

import productsReducer from './storage/reducers/products';
import cartReducer from './storage/reducers/cart';
import ordersReducer from './storage/reducers/orders';
import authReducer from './storage/reducers/auth';
import ShopNavigator from './navigation/ShopNavigator';

// npm install --save expo-font
const rootReducer = combineReducers({
  productsRoot: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer
});

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false) 
 
  if (!fontLoaded) {
    return <AppLoading 
      startAsync={fetchFonts}
      onFinish={() => {
          setFontLoaded(true)
        }}
      onError={console.warn}
    />;
  } 
  
    return (
      <Provider store={store}>
        <ShopNavigator/>
      </Provider>
    );
}