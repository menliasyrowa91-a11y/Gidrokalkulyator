import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function YapGidrawlika() {
  const [type, setType] = useState('acyk');
  const [b, setB] = useState('0.50');
  const [H, setH] = useState('0.15');
  const [d, setD] = useState('300');
  const [v, setV] = useState('0.9');
  const [result, setResult] = useState('0.000');

  const tabelaF = {
    "300": 0.07, "400": 0.12, "500": 0.19, "600": 0.28, 
    "700": 0.38, "800": 0.50, "900": 0.63, "1000": 0.78
  };

  const calculate = () => {
    let Q = 0;
    
    if (type === 'acyk') {
      const valB = parseFloat(b);
      const valH = parseFloat(H);
      if (isNaN(valB) || isNaN(valH)) {
        Alert.alert("Ýalňyşlyk", "Dogry san giriziň!");
        return;
      }
      Q = 1.86 * valB * Math.pow(valH, 1.5);
    } else {
      const valV = parseFloat(v);
      const F = tabelaF[d];
      if (!F || isNaN(valV)) {
        Alert.alert("Ýalňyşlyk", "Diametr ýa-da tizlik nädogry!");
        return;
      }
      Q = F * valV;
    }
    setResult(Q.toFixed(3));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ýap Gidrawlika Hasaby</Text>
      
      <View style={styles.toggleContainer}>
        <Button 
          title={type === 'acyk' ? "Režim: Açyk Ýap" : "Režim: Turba (Ýapyk)"} 
          onPress={() => setType(type === 'acyk' ? 'yapyk' : 'acyk')} 
          color={type === 'acyk' ? "#2563eb" : "#7c3aed"}
        />
      </View>
      
      {type === 'acyk' ? (
        <View>
          <TextInput placeholder="Wodosliw ini (b)" value={b} onChangeText={setB} style={styles.input} keyboardType="decimal-pad" />
          <TextInput placeholder="Suw gatlagy (H)" value={H} onChangeText={setH} style={styles.input} keyboardType="decimal-pad" />
        </View>
      ) : (
        <View>
          <TextInput placeholder="Diametr (mm: 300-1000)" value={d} onChangeText={setD} style={styles.input} keyboardType="numeric" />
          <TextInput placeholder="Tizlik (m/s)" value={v} onChangeText={setV} style={styles.input} keyboardType="decimal-pad" />
        </View>
      )}

      <Button title="HASAPLA" onPress={calculate} color="#059669" />
      <Text style={styles.result}>Netije: {result} m³/s</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  toggleContainer: { marginBottom: 20 },
  input: { borderBottomWidth: 1, marginBottom: 15, padding: 8, fontSize: 16, borderColor: '#ccc' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  result: { fontSize: 20, marginTop: 20, color: '#1e3a8a', fontWeight: 'bold' }
});
