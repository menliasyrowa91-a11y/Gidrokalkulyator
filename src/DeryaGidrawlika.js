import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';

export default function DeryaGidrawlika() {
  const [inputs, setInputs] = useState({
    b_usti: '5.0', b_asty: '3.5', h: '1.2', L: '10', t: '15'
  });
  const [result, setResult] = useState(null);

  const calculate = () => {
    // San dälligi barlamak üçin
    const b_u = parseFloat(inputs.b_usti);
    const b_a = parseFloat(inputs.b_asty);
    const h = parseFloat(inputs.h);
    const L = parseFloat(inputs.L);
    const t = parseFloat(inputs.t);

    if (isNaN(b_u) || isNaN(b_a) || isNaN(h) || isNaN(L) || isNaN(t) || t === 0) {
      Alert.alert("Ýalňyşlyk", "Hemme meýdanlary dogry dolduryň we wagt 0 bolmaly däl!");
      return;
    }

    // 1. Kesik meýdany (F)
    const F = ((b_u + b_a) / 2) * h;
    
    // 2. Tizlik koeffisiýenti (toprakly ýatak üçin standart 0.82)
    const K = 0.82; 
    
    // 3. Ortaça akym tizligi (V)
    const V = (L / t) * K;
    
    // 4. Suw sarpyny (Q)
    const Q = F * V;

    setResult({ F: F.toFixed(2), V: V.toFixed(2), Q: Q.toFixed(3) });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Derýa Gidrawlika Hasaby</Text>
      
      <TextInput style={styles.input} placeholder="Suw üsti ini (b_usti)" value={inputs.b_usti} onChangeText={(v) => setInputs({...inputs, b_usti: v})} keyboardType="decimal-pad" />
      <TextInput style={styles.input} placeholder="Suw asty ini (b_asty)" value={inputs.b_asty} onChangeText={(v) => setInputs({...inputs, b_asty: v})} keyboardType="decimal-pad" />
      <TextInput style={styles.input} placeholder="Çuňluk (h)" value={inputs.h} onChangeText={(v) => setInputs({...inputs, h: v})} keyboardType="decimal-pad" />
      <TextInput style={styles.input} placeholder="Aralyk (L)" value={inputs.L} onChangeText={(v) => setInputs({...inputs, L: v})} keyboardType="decimal-pad" />
      <TextInput style={styles.input} placeholder="Wagt (t)" value={inputs.t} onChangeText={(v) => setInputs({...inputs, t: v})} keyboardType="decimal-pad" />
      
      <Button title="HASAPLA" onPress={calculate} color="#059669" />

      {result && (
        <View style={styles.resultBox}>
          <Text>Meýdan (F): {result.F} m²</Text>
          <Text>Tizlik (V): {result.V} m/s</Text>
          <Text style={styles.highlight}>Suw sarpyny (Q): {result.Q} m³/s</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  input: { borderBottomWidth: 1, marginBottom: 15, padding: 8, fontSize: 16, borderColor: '#ccc' },
  resultBox: { marginTop: 20, padding: 15, backgroundColor: '#f0fdf4', borderRadius: 8 },
  highlight: { fontSize: 18, fontWeight: 'bold', color: '#065f46', marginTop: 5 }
});
