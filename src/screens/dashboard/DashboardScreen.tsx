import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { Strings } from '../../constants/strings';

const DashboardScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>{Strings.TOTAL_BALANCE}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background },
  title: { fontSize: 24, fontFamily: 'Inter-Bold', color: Colors.text },
});

export default DashboardScreen;