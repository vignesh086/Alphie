import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  WelcomeScreen,
  AccountTypeSelectionScreen,
  PersonalOnboardingScreen,
  BusinessOnboardingScreen,
  AccountReviewScreen,
  SuccessScreen,
} from '../screens';
import { RootStackParamList } from '../types';
import { Colors } from '../constants/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.background },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen
          name="AccountTypeSelection"
          component={AccountTypeSelectionScreen}
        />
        <Stack.Screen
          name="PersonalOnboarding"
          component={PersonalOnboardingScreen}
        />
        <Stack.Screen
          name="BusinessOnboarding"
          component={BusinessOnboardingScreen}
        />
        <Stack.Screen name="AccountReview" component={AccountReviewScreen} />
        <Stack.Screen
          name="Success"
          component={SuccessScreen}
          options={{
            gestureEnabled: false, // Prevent going back from success screen
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
