import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';

export default function Wodosliw() {
  const [b, setB] = useState('0.5');
  const [h, setH] = useState('0.09');
  const [meydan, setMeydan] = useState('1');
  const [norma, setNorma] = useState('800');
  const [ptk, setPtk] = useState('0.85');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const valB = parseFloat(b);
    const valH = parseFloat(h);
    const valM = parseFloat(meydan);
    const valNorma = parseFloat(norma);
    const valPtk = parseFloat(ptk);

    // Q = 1.86 * b * H^1.5 (l/s-e öwürmek üçin * 1000)
    const Q_l_sek = (1.86 * valB * Math.pow(valH, 1.5)) * 1000;
    const Q_m3_sek = Q_l_sek / 1000;
    
    // Jemi suw (m3) = (meýdan * norma) / ptk
    const jemiSuwBrutto = (valM * valNorma) / valPtk;
    
    // Wagt (sekunt) = Jemi suw / Q_m3_sek
    const wagtSek = jemiSuwBrutto / Q_m3_sek;
    const wagtSagat = wagtSek / 3600;

    setResult({
      Q_l_sek: Q_l_sek.toFixed(2),
      wagtSagat: wagtSagat.toFixed(2),
      jemiSuwBrutto: jemiSuwBrutto.toFixed(2)
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Wodosliw Hasaby</Text>
      <TextInput style={styles.input} placeholder="Wodosliw ini (b)" value={b} onChangeText={setB} keyboardType="decimal-pad" />
      <TextInput style={styles.input} placeholder="Suw beýikligi (H)" value={h} onChangeText={setH} keyboardType="decimal-pad" />
      <TextInput style={styles.input} placeholder="Meýdan (ga)" value={meydan} onChangeText={setMeydan} keyboardType="decimal-pad" />
      <TextInput style={styles.input} placeholder="Suw norma" value={norma} onChangeText={setNorma} keyboardType="decimal-pad" />
      <TextInput style={styles.input} placeholder="PTK (0.85)" value={ptk} onChangeText={setPtk} keyboardType="decimal-pad" />
      
      <Button title="HASAPLA" onPress={calculate} color="#059669" />

      {result && (
        <View style={styles.result}>
          <Text>Sekuntda alnan suw: {result.Q_l_sek} l/sek</Text>
          <Text>Jemi suw (Brutto): {result.jemiSuwBrutto} m³</Text>
          <Text style={styles.bold}>Hakyky suwaryş wagty: {result.wagtSagat} sagat</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  input: { borderBottomWidth: 1, marginBottom: 10, padding: 8 },
  result: { marginTop: 20, padding: 15, backgroundColor: '#f0fdf4' },
  bold: { fontWeight: 'bold', marginTop: 10 }
});
