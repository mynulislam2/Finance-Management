import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExpenseListScreen from '../screens/expenses/ExpenseListScreen';
import AddExpenseScreen from '../screens/expenses/AddExpenseScreen';
import ExpenseDetailsScreen from '../screens/expenses/ExpenseDetailsScreen';

export type ExpenseStackParamList = {
  ExpenseList: undefined;
  AddExpense: undefined;
  ExpenseDetails: undefined;
};

const Stack = createNativeStackNavigator<ExpenseStackParamList>();

const ExpenseStackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ExpenseList" component={ExpenseListScreen} />
    <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
    <Stack.Screen name="ExpenseDetails" component={ExpenseDetailsScreen} />
  </Stack.Navigator>
);

export default ExpenseStackNavigator;
