import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import AnalyticsScreen from '../screens/analytics/AnalyticsScreen';
import ReportsScreen from '../screens/reports/ReportsScreen';

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

const BottomTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ color, size }) => {
        const icons: Record<string, string> = {
          Dashboard: 'home-outline',
          Expenses: 'cart-outline',
          Income: 'cash-outline',
          Recurring: 'repeat-outline',
          Budget: 'wallet-outline',
          Analytics: 'bar-chart-outline',
          Reports: 'document-text-outline',
          Profile: 'person-outline',
        };
        return <Icon name={icons[route.name]} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#4F46E5',
      tabBarInactiveTintColor: '#94A3B8',
    })}>
    <Tab.Screen name="Dashboard" component={DashboardScreen} />
    <Tab.Screen name="Analytics" component={AnalyticsScreen} />
    <Tab.Screen name="Reports" component={ReportsScreen} />
  </Tab.Navigator>
);

export default BottomTabNavigator;