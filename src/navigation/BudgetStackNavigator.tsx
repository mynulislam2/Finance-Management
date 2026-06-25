import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BudgetScreen from '../screens/budget/BudgetScreen';
import CreateBudgetScreen from '../screens/budget/CreateBudgetScreen';

export type BudgetStackParamList = {
  BudgetList: undefined;
  CreateBudget: undefined;
};

const Stack = createNativeStackNavigator<BudgetStackParamList>();

const BudgetStackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="BudgetList" component={BudgetScreen} />
    <Stack.Screen name="CreateBudget" component={CreateBudgetScreen} />
  </Stack.Navigator>
);

export default BudgetStackNavigator;
