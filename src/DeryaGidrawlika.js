import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

export default function DeryaGidrawlika() {
  const [inputs, setInputs] = useState({
    b_usti: '5.0', b_asty: '3.5', h: '1.2', L: '10', t: '15', hana_tury: 'toprakly'
  });
  const [result, setResult] = useState(null);

  const calculate = () => {
    const { b_usti, b_asty, h, L, t, hana_tury } = inputs;
    
    // 1. Kesik meýdany (F) hasaplaýarys
    const F = ((parseFloat(b_usti) + parseFloat(b_asty)) / 2) * parseFloat(h);
    
    // 2. Tizlik koeffisiýenti (K) - Ýatagyň görnüşine görä
    const k_map = { 'dasly': 0.78, 'toprakly': 0.82, 'betonly': 0.88 };
    const K = k_map[hana_tury] || 0.82;
    
    // 3. Ortaça akym tizligi (V)
    const V = (parseFloat(L) / parseFloat(t)) * K;
    
    // 4. Suw sarpyny (Q)
    const Q = F * V;

    setResult({ F: F.toFixed(2), V: V.toFixed(2), Q: Q.toFixed(3) });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Derýa Gidrawlika Hasaby</Text>
      
      <TextInput style={styles.input} placeholder="Suw üsti ini (b_usti)" value={inputs.b_usti} onChangeText={(v) => setInputs({...inputs, b_usti: v})} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Suw asty ini (b_asty)" value={inputs.b_asty} onChangeText={(v) => setInputs({...inputs, b_asty: v})} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Çuňluk (h)" value={inputs.h} onChangeText={(v) => setInputs({...inputs, h: v})} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Aralyk (L)" value={inputs.L} onChangeText={(v) => setInputs({...inputs, L: v})} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Wagt (t)" value={inputs.t} onChangeText={(v) => setInputs({...inputs, t: v})} keyboardType="numeric" />
      
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
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  input: { borderBottomWidth: 1, marginBottom: 10, padding: 8, fontSize: 16 },
  resultBox: { marginTop: 20, padding: 15, backgroundColor: '#f0fdf4', borderRadius: 8 },
  highlight: { fontSize: 18, fontWeight: 'bold', color: '#065f46' }
});
