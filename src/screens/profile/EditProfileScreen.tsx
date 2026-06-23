import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EditProfileScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Edit Profile</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8FAFC' },
  title: { fontSize: 24, fontFamily: 'Inter-Bold', color: '#0F172A' },
});

export default EditProfileScreen;