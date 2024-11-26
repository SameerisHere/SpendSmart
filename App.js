import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as ScreenOrientation from 'expo-screen-orientation';
//import LearnScreen from './LearnScreen'; // This is now the renamed LessonScreen file
import HomeScreen from './HomeScreen';
import GoalsScreen from './GoalsScreen';
import ProfileScreen from './ProfileScreen';
import BudgetScreen from './BudgetScreen';

// Set screen orientation to portrait
ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Learn" component={HomeScreen} />
        <Stack.Screen name="Goals" component={GoalsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Budget" component={BudgetScreen} />
        
        <Stack.Screen 
          name="GoalsScreen" 
          component={GoalsScreen} // Reference the renamed LearnScreen here
          options={{ headerShown: false }} 
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
