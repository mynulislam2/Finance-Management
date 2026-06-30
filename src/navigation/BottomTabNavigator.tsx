import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../constants/colors';
import { Fonts } from '../constants/fonts';
import { BorderRadius, Spacing } from '../constants/spacing';
import HomeStackNavigator from './HomeStackNavigator';
import FinanceStackNavigator from './FinanceStackNavigator';
import InsightsStackNavigator from './InsightsStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';

export type TabParamList = {
  Home: undefined;
  Finance: undefined;
  Reports: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TAB_ICONS: Record<string, { active: string; inactive: string }> = {
  Home: { active: 'home', inactive: 'home-outline' },
  Finance: { active: 'wallet', inactive: 'wallet-outline' },
  Reports: { active: 'bar-chart', inactive: 'bar-chart-outline' },
  Profile: { active: 'person', inactive: 'person-outline' },
};

const TabIcon = ({ routeName, focused }: { routeName: string; focused: boolean }) => {
  const icons = TAB_ICONS[routeName];
  return (
    <View style={[styles.iconWrapper, focused && styles.iconWrapperActive]}>
      <Icon
        name={focused ? icons.active : icons.inactive}
        size={focused ? 24 : 22}
        color={focused ? Colors.primary : Colors.outline}
      />
    </View>
  );
};

const BottomTabNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => <TabIcon routeName={route.name} focused={focused} />,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.outline,
        tabBarLabel: route.name,
        tabBarLabelStyle: styles.tabLabel,
        tabBarStyle: [
          styles.tabBar,
          { bottom: Platform.OS === 'ios' ? insets.bottom : Spacing.sm },
        ],
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Finance" component={FinanceStackNavigator} />
      <Tab.Screen name="Reports" component={InsightsStackNavigator} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.surface,
    borderTopWidth: 0,
    height: 72,
    paddingBottom: Spacing.sm,
    paddingTop: Spacing.sm,
    position: 'absolute',
    bottom: Spacing.md,
    left: Spacing.md,
    right: Spacing.md,
    borderRadius: BorderRadius.xxl,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapperActive: {
    backgroundColor: Colors.primaryContainer + '15',
  },
  icon: { fontSize: 22 },
  iconActive: { fontSize: 24 },
  tabLabel: {
    fontSize: 10,
    fontFamily: Fonts.family.semiBold,
    letterSpacing: 0.05,
    textTransform: 'uppercase',
    marginTop: 2,
  },
});

export default BottomTabNavigator;
