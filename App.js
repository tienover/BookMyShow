import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from './src/Screens/Splash';
import SelectCity from './src/Screens/SelectCity';
import Home from './src/Screens/Home';
import { Wrapper } from './src/Context/Wrapper';
import Details from './src/Screens/Details';
import Malls from './src/Screens/Malls';
import MyTicket from './src/Screens/MyTicket';
import Login from './src/Screens/Login';
import Signup from './src/Screens/Signup';
import Profile from './src/Screens/Profile';





const Stack = createNativeStackNavigator();


const App = () => {
  return (
    
    
    <Wrapper>


    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Splash"
        screenOptions={{headerShown:false}}
        >

        <Stack.Screen name="Splash" component={Splash}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="SelectCity" component={SelectCity}/>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Details" component={Details}/>
        <Stack.Screen name="Malls" component={Malls}/>
        <Stack.Screen name="MyTicket" component={MyTicket}/>
        <Stack.Screen name="Signup" component={Signup}/>
        <Stack.Screen name="Profile" component={Profile}/>
        
        
              </Stack.Navigator>

    </NavigationContainer>
   </Wrapper>
   
   
  )
}


export default App;