import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import GpsCalculator from './GpsCalculator';
import DeryaGidrawlika from './DeryaGidrawlika';
import YapGidrawlika from './YapGidrawlika';
import SuwaryshPlan from './SuwaryshPlan';

export default function App() {
  const [activeTab, setActiveTab] = useState('GPS'); // Başlangyçda GPS açylar

  return (
    <View style={styles.container}>
      {/* 1. Ekranyň arassa bolmagy üçin sazlamalar paneli */}
      <View style={styles.tabBar}>
        <TabButton title="GPS" active={activeTab === 'GPS'} onPress={() => setActiveTab('GPS')} />
        <TabButton title="Derýa" active={activeTab === 'Derya'} onPress={() => setActiveTab('Derya')} />
        <TabButton title="Ýap" active={activeTab === 'Yap'} onPress={() => setActiveTab('Yap')} />
        <TabButton title="Suwaryş" active={activeTab === 'Suw'} onPress={() => setActiveTab('Suw')} />
      </View>

      {/* 2. Diňe saýlanan bölüm görner, galany gizli bolar */}
      <View style={styles.content}>
        {activeTab === 'GPS' && <GpsCalculator />}
        {activeTab === 'Derya' && <DeryaGidrawlika />}
        {activeTab === 'Yap' && <YapGidrawlika />}
        {activeTab === 'Suw' && <SuwaryshPlan />}
      </View>
    </View>
  );
}

const TabButton = ({ title, active, onPress }) => (
  <TouchableOpacity style={[styles.tab, active && styles.activeTab]} onPress={onPress}>
    <Text style={[styles.tabText, active && styles.activeTabText]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabBar: { flexDirection: 'row', backgroundColor: '#fff', padding: 5, borderBottomWidth: 1, borderColor: '#ddd' },
  tab: { flex: 1, padding: 10, alignItems: 'center' },
  activeTab: { backgroundColor: '#059669', borderRadius: 8 },
  tabText: { color: '#333' },
  activeTabText: { color: '#fff', fontWeight: 'bold' },
  content: { flex: 1 }
});
