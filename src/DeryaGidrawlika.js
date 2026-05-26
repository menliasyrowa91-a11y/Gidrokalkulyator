import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

export default function DeryaGidrawlika() {
  const [data, setData] = useState({ b_usti: 5, b_asty: 3.5, h: 1.2, L: 10, t: 15 });
  
  const calculate = () => {
    const { b_usti, b_asty, h, L, t } = data;
    const F = ((parseFloat(b_usti) + parseFloat(b_asty)) / 2) * parseFloat(h);
    const V = (parseFloat(L) / parseFloat(t)) * 0.82; // Toprakly derýa üçin K=0.82
    const Q = F * V;
    alert(`Suw sarpyny: ${Q.toFixed(3)} m³/s`);
  };

  return (
    <View style={{ padding: 20 }}>
      {/* Inputlar... */}
      <Button title="HASAPLA" onPress={calculate} />
    </View>
  );
}
