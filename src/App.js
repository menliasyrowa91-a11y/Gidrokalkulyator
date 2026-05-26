import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Platform, View } from 'react-native';
import GpsCalculator from './GpsCalculator';
import DeryaGidrawlika from './DeryaGidrawlika';
import YapGidrawlika from './YapGidrawlika';
import SuwaryshPlan from './SuwaryshPlan';

export default function App() {
  // Bu ýerde siz tablaryň arasynda geçiş edip bilersiňiz
  // Häzirçilik ähli funksiýalary aşakdaky ýaly yzygiderli görüp bilersiňiz
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <GpsCalculator />
        <DeryaGidrawlika />
        <YapGidrawlika />
        <SuwaryshPlan />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  content: {
    padding: 10,
  }
});
