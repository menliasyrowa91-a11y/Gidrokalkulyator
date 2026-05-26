import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, SafeAreaView, StatusBar } from 'react-native';
import GpsCalculator from './GpsCalculator';
import DeryaGidrawlika from './DeryaGidrawlika';
import YapGidrawlika from './YapGidrawlika';
import SuwaryshPlan from './SuwaryshPlan';

// Ikonkany import edýäris (assets papkaňdaky ýeriňi barla)
const myIcon = require('../assets/icon.png'); 

export default function App() {
  const [activeTab, setActiveTab] = useState('GPS');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* 1. Ikonka ýerleşýän ýokarky bölek */}
      <View style={styles.header}>
        <Image source={myIcon} style={styles.logo} />
        <Text style={styles.title}>Gidrokalkulýator</Text>
      </View>

      {/* 2. Sazlamalar paneli */}
      <View style={styles.tabBar}>
        <TabButton title="GPS" active={activeTab === 'GPS'} onPress={() => setActiveTab('GPS')} />
        <TabButton title="Derýa" active={activeTab === 'Derya'} onPress={() => setActiveTab('Derya')} />
        <TabButton title="Ýap" active={activeTab === 'Yap'} onPress={() => setActiveTab('Yap')} />
        <TabButton title="Suwaryş" active={activeTab === 'Suw'} onPress={() => setActiveTab('Suw')} />
      </View>

      {/* 3. Mazmun bölümi */}
      <View style={styles.content}>
        {activeTab === 'GPS' && <GpsCalculator />}
        {activeTab === 'Derya' && <DeryaGidrawlika />}
        {activeTab === 'Yap' && <YapGidrawlika />}
        {activeTab === 'Suw' && <SuwaryshPlan />}
      </View>
    </SafeAreaView>
  );
}

const TabButton = ({ title, active, onPress }) => (
  <TouchableOpacity style={[styles.tab, active && styles.activeTab]} onPress={onPress}>
    <Text style={[styles.tabText, active && styles.activeTabText]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f9' },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 15, 
    backgroundColor: '#fff' 
  },
  logo: { width: 40, height: 40, marginRight: 10, resizeMode: 'contain' },
  title: { fontSize: 18, fontWeight: 'bold', color: '#1e3a8a' },
  tabBar: { flexDirection: 'row', backgroundColor: '#fff', padding: 5, borderBottomWidth: 1, borderColor: '#ddd' },
  tab: { flex: 1, padding: 8, alignItems: 'center' },
  activeTab: { backgroundColor: '#059669', borderRadius: 8 },
  tabText: { color: '#333', fontSize: 12 },
  activeTabText: { color: '#fff', fontWeight: 'bold' },
  content: { flex: 1 }
});
