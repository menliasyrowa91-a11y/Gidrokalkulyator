import React, { useState, Suspense, lazy } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';

const GpsCalculator = lazy(() => import('./GpsCalculator'));
const DeryaGidrawlika = lazy(() => import('./DeryaGidrawlika'));
const YapGidrawlika = lazy(() => import('./YapGidrawlika'));
const SuwaryshPlan = lazy(() => import('./SuwaryshPlan'));
const Wodosliw = lazy(() => import('./Wodosliw')); 
const EkinBazasy = lazy(() => import('./EkinBazasy')); 

const myIcon = require('../assets/icon.png'); 

export default function App() {
  const [activeTab, setActiveTab] = useState('GPS');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <Image source={myIcon} style={styles.logo} />
        <Text style={styles.title}>Gidrokalkulýator</Text>
      </View>
      
      {/* Düzüji maglumaty */}
      <View style={styles.authorContainer}>
        <Text style={styles.authorText}>Düzüji: Meňli Aşyrowa</Text>
      </View>

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        <TabButton title="GPS" active={activeTab === 'GPS'} onPress={() => setActiveTab('GPS')} />
        <TabButton title="Derýa" active={activeTab === 'Derya'} onPress={() => setActiveTab('Derya')} />
        <TabButton title="Ýap" active={activeTab === 'Yap'} onPress={() => setActiveTab('Yap')} />
        <TabButton title="Suwaryş" active={activeTab === 'Suw'} onPress={() => setActiveTab('Suw')} />
        <TabButton title="Wodosliw" active={activeTab === 'Wodosliw'} onPress={() => setActiveTab('Wodosliw')} />
        <TabButton title="Ekin" active={activeTab === 'Ekin'} onPress={() => setActiveTab('Ekin')} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Suspense fallback={<ActivityIndicator size="large" color="#059669" style={{marginTop: 50}} />}>
          {activeTab === 'GPS' && <GpsCalculator />}
          {activeTab === 'Derya' && <DeryaGidrawlika />}
          {activeTab === 'Yap' && <YapGidrawlika />}
          {activeTab === 'Suw' && <SuwaryshPlan />}
          {activeTab === 'Wodosliw' && <Wodosliw />}
          {activeTab === 'Ekin' && <EkinBazasy />}
        </Suspense>
      </View>
    </SafeAreaView>
  );
}

const TabButton = ({ title, active, onPress }) => (
  <TouchableOpacity 
    style={[styles.tab, active && styles.activeTab]} 
    onPress={onPress}
    activeOpacity={0.7}
  >
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
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#eee'
  },
  authorContainer: { backgroundColor: '#fff', alignItems: 'center', paddingBottom: 5 },
  authorText: { fontSize: 10, color: '#94a3b8', fontStyle: 'italic' },
  logo: { width: 40, height: 40, marginRight: 10 },
  title: { fontSize: 18, fontWeight: '700', color: '#1e3a8a' },
  tabBar: { flexDirection: 'row', backgroundColor: '#fff', padding: 5, flexWrap: 'wrap' },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 8, minWidth: '30%' },
  activeTab: { backgroundColor: '#059669' },
  tabText: { color: '#64748b', fontSize: 11, fontWeight: '500' },
  activeTabText: { color: '#fff', fontWeight: 'bold' },
  content: { flex: 1 }
});
