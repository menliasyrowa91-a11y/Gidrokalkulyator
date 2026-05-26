import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Picker } from 'react-native';

export default function YapGidrawlika() {
  const [type, setType] = useState('acyk');
  const [b, setB] = useState('0.50'); // Wodosliw ini
  const [H, setH] = useState('0.15'); // Suw gatlagy
  const [d, setD] = useState('300');  // Turba diametri
  const [v, setV] = useState('0.9');  // Tizlik
  const [result, setResult] = useState(0);

  // Turbanyň kesik meýdan tabelasy (m²)
  const tabelaF = {
    "300": 0.07, "400": 0.12, "500": 0.19, "600": 0.28, 
    "700": 0.38, "800": 0.50, "900": 0.63, "1000": 0.78
  };

  const calculate = () => {
    let Q = 0;
    if (type === 'acyk') {
      // Açyk ýap (Wodosliw formulasy: Q = 1.86 * b * H^1.5)
      Q = 1.86 * parseFloat(b) * Math.pow(parseFloat(H), 1.5);
    } else {
      // Ýapyk ýap (Turba: Q = F * V)
      const F = tabelaF[d] || 0.1;
      Q = F * parseFloat(v);
    }
    setResult(Q.toFixed(3));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ýap Gidrawlika Hasaby</Text>
      
      <Button title={type === 'acyk' ? "Açyk Ýap" : "Turba (Ýapyk)"} onPress={() => setType(type === 'acyk' ? 'yapyk' : 'acyk')} />
      
      {type === 'acyk' ? (
        <View>
          <TextInput placeholder="Wodosliw ini (b)" value={b} onChangeText={setB} style={styles.input} />
          <TextInput placeholder="Suw gatlagy (H)" value={H} onChangeText={setH} style={styles.input} />
        </View>
      ) : (
        <View>
          <TextInput placeholder="Diametr (mm)" value={d} onChangeText={setD} style={styles.input} />
          <TextInput placeholder="Tizlik (m/s)" value={v} onChangeText={setV} style={styles.input} />
        </View>
      )}

      <Button title="HASAPLA" onPress={calculate} color="green" />
      <Text style={styles.result}>Netije: {result} m³/s</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderBottomWidth: 1, marginBottom: 10, padding: 5 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  result: { fontSize: 20, marginTop: 20, color: 'blue' }
});
