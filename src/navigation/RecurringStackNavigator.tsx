import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecurringListScreen from '../screens/recurring/RecurringListScreen';
import AddRecurringScreen from '../screens/recurring/AddRecurringScreen';

export type RecurringStackParamList = {
  RecurringList: undefined;
  AddRecurring: undefined;
};

const Stack = createNativeStackNavigator<RecurringStackParamList>();

const RecurringStackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="RecurringList" component={RecurringListScreen} />
    <Stack.Screen name="AddRecurring" component={AddRecurringScreen} />
  </Stack.Navigator>
);

export default RecurringStackNavigator;
