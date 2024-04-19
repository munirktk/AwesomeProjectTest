import React from 'react';
import { Provider } from 'react-redux';
import { NativeBaseProvider } from 'native-base';
import { store } from './Src/Redux/store/store';  
import { ThemeProvider } from './Src/Context/ThemeContext';  
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from './Src/screens/home/Dashboard';
import Login from './Src/screens/auth/Login';
import Todos from './Src/screens/Todos'; 
import Movies from './Src/screens/Movies'; 

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
    <ThemeProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login"
           screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Todos" component={Todos} />
            <Stack.Screen name="Movies" component={Movies} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </ThemeProvider>
  </Provider>
  );
}
