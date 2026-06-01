import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CalculatorScreen = () => {
  const [b, setB] = useState(''); // Wodosliwiň ini
  const [H, setH] = useState(''); // Suwuň beýikligi
  const [t, setT] = useState(''); // Wagty (sekunt)
  const [meydan, setMeydan] = useState(''); // Gektar
  const [ekin, setEkin] = useState('bugday'); // Default ekin
  const [result, setResult] = useState(null);

  const suwNormalary = {
    bugday: { label: "Bugdaý", norma: 600 },
    gowaca: { label: "Gowaça", norma: 800 },
    yorunja: { label: "Ýorunja", norma: 1000 },
    arpa: { label: "Arpa", norma: 500 }
  };

  const calculate = () => {
    const valB = parseFloat(b);
    const valH = parseFloat(H);
    const valT = parseFloat(t);
    const valMeydan = parseFloat(meydan);
    
    // Basit wodosliw formulasy (Mysal üçin)
    const Q = valB * valH * 0.5; 
    const jemiSuw = Q * valT;
    const ortaçaSuw = jemiSuw / valMeydan;
    const aratapawut = ortaçaSuw - suwNormalary[ekin].norma;

    setResult({ jemiSuw, ortaçaSuw, aratapawut });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Wodosliwiň ini (b) metr:</Text>
      <TextInput style={styles.input} keyboardType="numeric" onChangeText={setB} value={b} />

      <Text style={styles.label}>Suwuň beýikligi (H) metr:</Text>
      <TextInput style={styles.input} keyboardType="numeric" onChangeText={setH} value={H} />

      <Text style={styles.label}>Suwaryş dowamlylygy (sekund):</Text>
      <TextInput style={styles.input} keyboardType="numeric" onChangeText={setT} value={t} />

      <Text style={styles.label}>Meýdan (ga):</Text>
      <TextInput style={styles.input} keyboardType="numeric" onChangeText={setMeydan} value={meydan} />

      <Text style={styles.label}>Ekin görnüşini saýlaň:</Text>
      <Picker selectedValue={ekin} onValueChange={(itemValue) => setEkin(itemValue)}>
        {Object.keys(suwNormalary).map((key) => (
          <Picker.Item key={key} label={suwNormalary[key].label} value={key} />
        ))}
      </Picker>

      <Button title="Hasapla" onPress={calculate} />

      {result && (
        <View style={styles.resultContainer}>
          <Text>Jemi alnan suw: {result.jemiSuw.toFixed(2)} m³</Text>
          <Text>1 gektara düşýän suw: {result.ortaçaSuw.toFixed(2)} m³/ga</Text>
          <Text style={result.aratapawut > 0 ? styles.alert : styles.success}>
            Aratapawut: {result.aratapawut.toFixed(2)} m³/ga
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 15, padding: 8 },
  label: { marginBottom: 5 },
  resultContainer: { marginTop: 20, padding: 15, backgroundColor: '#f0f0f0' },
  alert: { color: 'red', fontWeight: 'bold' },
  success: { color: 'green', fontWeight: 'bold' }
});

export default CalculatorScreen;
