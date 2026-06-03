import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
// EkinBazasy-nyň dogry import edilendigini barladyň (./Ekinder.js faýlynda export edilmeli)
import { EkinBazasy } from './Ekinder'; 

export default function SuwaryshPlan() {
  const [meýdan, setMeýdan] = useState('10');
  const [Q, setQ] = useState('0.15');

  const calculatePlan = () => {
    const valM = parseFloat(meýdan);
    const valQ = parseFloat(Q);

    if (isNaN(valM) || isNaN(valQ) || valQ === 0) {
      Alert.alert("Ýalňyşlyk", "Sanlary dogry giriziň!");
      return;
    }

    // Hasaplaýyş logikasy (Meselem: wagt = (meýdan * norma) / Q)
    const t = (valM * 500) / (valQ * 3600); // Gresiýa mysaly
    Alert.alert("Netije", `Suwaryş wagty: ${t.toFixed(1)} sagat`);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Suwaryş Meýilnamasy</Text>
      
      <TextInput style={styles.input} placeholder="Meýdan (ga)" value={meýdan} onChangeText={setMeýdan} keyboardType="decimal-pad" />
      <TextInput style={styles.input} placeholder="Suw akymy (m³/s)" value={Q} onChangeText={setQ} keyboardType="decimal-pad" />
      
      <Text style={styles.info} onPress={calculatePlan}>Hasaplamak üçin basyň</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  input: { borderBottomWidth: 1, marginBottom: 15, padding: 8, fontSize: 16, borderColor: '#ccc' },
  info: { marginTop: 20, color: '#059669', fontWeight: 'bold', textAlign: 'center' }
});
