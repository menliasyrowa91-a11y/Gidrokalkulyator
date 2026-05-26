import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { EkinBazasy } from './Ekinder';

export default function SuwaryshPlan() {
  const [meýdan, setMeýdan] = useState('10');
  const [Q, setQ] = useState('0.15');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Suwaryş Meýilnamasy</Text>
      <TextInput style={styles.input} placeholder="Meýdan (ga)" value={meýdan} onChangeText={setMeýdan} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Suw akymy (m³/s)" value={Q} onChangeText={setQ} keyboardType="numeric" />
      <Text style={styles.info}>Ekin saýlaň we netijäni görüň...</Text>
    </View>
  );
}
// styles...
