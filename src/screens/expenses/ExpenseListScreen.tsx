import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { Strings } from '../../constants/strings';

const ExpenseListScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>{Strings.EXPENSES}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background },
  title: { fontSize: 24, fontFamily: 'Inter-Bold', color: Colors.text },
});

export default ExpenseListScreen;