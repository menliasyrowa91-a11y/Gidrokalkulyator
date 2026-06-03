import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { EkinBazasy } from './Ekinder';

export default function SuwaryshPlan() {
  const [meýdan, setMeýdan] = useState('10');
  const [Q, setQ] = useState('0.15');
  const [selectedEkin, setSelectedEkin] = useState('gowaca'); // Default ekin

  const calculatePlan = () => {
    const valM = parseFloat(meýdan);
    const valQ = parseFloat(Q);
    const ekin = EkinBazasy[selectedEkin];

    if (isNaN(valM) || isNaN(valQ) || valQ === 0) {
      Alert.alert("Ýalňyşlyk", "Sanlary dogry giriziň!");
      return;
    }

    // Hasaplaýyş: t = (meýdan * norma) / (Q * 3600 * kpd)
    // Norma m³/ga hasaplanýar
    const t = (valM * ekin.norma) / (valQ * 3600 * ekin.kpd);
    
    Alert.alert("Netije", `${ekin.ady} üçin suwaryş wagty: ${t.toFixed(1)} sagat`);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Suwaryş Meýilnamasy</Text>
      
      <Text style={styles.label}>Ekin görnüşini saýlaň:</Text>
      <View style={styles.ekinContainer}>
        {Object.keys(EkinBazasy).map((key) => (
          <TouchableOpacity 
            key={key} 
            style={[styles.ekinButton, selectedEkin === key && styles.activeEkin]} 
            onPress={() => setSelectedEkin(key)}
          >
            <Text style={styles.ekinText}>{EkinBazasy[key].ady}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput style={styles.input} placeholder="Meýdan (ga)" value={meýdan} onChangeText={setMeýdan} keyboardType="decimal-pad" />
      <TextInput style={styles.input} placeholder="Suw akymy (m³/s)" value={Q} onChangeText={setQ} keyboardType="decimal-pad" />
      
      <TouchableOpacity style={styles.calcButton} onPress={calculatePlan}>
        <Text style={styles.calcButtonText}>HASAPLA</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  label: { fontSize: 16, marginBottom: 10 },
  ekinContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 },
  ekinButton: { padding: 8, backgroundColor: '#e2e8f0', margin: 4, borderRadius: 5 },
  activeEkin: { backgroundColor: '#059669' },
  ekinText: { fontSize: 14 },
  input: { borderBottomWidth: 1, marginBottom: 15, padding: 8, fontSize: 16, borderColor: '#ccc' },
  calcButton: { backgroundColor: '#059669', padding: 15, borderRadius: 8, alignItems: 'center' },
  calcButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});
