import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../constants/colors';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import ExpenseStackNavigator from './ExpenseStackNavigator';
import IncomeStackNavigator from './IncomeStackNavigator';
import RecurringStackNavigator from './RecurringStackNavigator';
import BudgetStackNavigator from './BudgetStackNavigator';
import AnalyticsScreen from '../screens/analytics/AnalyticsScreen';
import ReportsScreen from '../screens/reports/ReportsScreen';
import ProfileStackNavigator from './ProfileStackNavigator';

export type TabParamList = {
  Dashboard: undefined;
  Expenses: undefined;
  Income: undefined;
  Recurring: undefined;
  Budget: undefined;
  Analytics: undefined;
  Reports: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const iconMap: Record<string, string> = {
  Dashboard: 'home-outline',
  Expenses: 'cart-outline',
  Income: 'cash-outline',
  Recurring: 'repeat-outline',
  Budget: 'wallet-outline',
  Analytics: 'bar-chart-outline',
  Reports: 'document-text-outline',
  Profile: 'person-outline',
};

const TabIcon = ({
  routeName,
  color,
  size,
}: {
  routeName: string;
  color: string;
  size: number;
}) => <Icon name={iconMap[routeName]} size={size} color={color} />;

const BottomTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBarIcon: ({ color, size }) => <TabIcon routeName={route.name} color={color} size={size} />,
      tabBarActiveTintColor: Colors.primary,
      tabBarInactiveTintColor: Colors.muted,
    })}
  >
    <Tab.Screen name="Dashboard" component={DashboardScreen} />
    <Tab.Screen name="Expenses" component={ExpenseStackNavigator} />
    <Tab.Screen name="Income" component={IncomeStackNavigator} />
    <Tab.Screen name="Recurring" component={RecurringStackNavigator} />
    <Tab.Screen name="Budget" component={BudgetStackNavigator} />
    <Tab.Screen name="Analytics" component={AnalyticsScreen} />
    <Tab.Screen name="Reports" component={ReportsScreen} />
    <Tab.Screen name="Profile" component={ProfileStackNavigator} />
  </Tab.Navigator>
);

export default BottomTabNavigator;
