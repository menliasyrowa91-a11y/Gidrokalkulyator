import React, { useState } from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

export default function GpsCalculator() {
  const [points, setPoints] = useState([]);

  const addPoint = async () => {
    // Takyklygy ýokarlandyrmak üçin 'High' ýerine 'BestForNavigation' ulanýarys
    let loc = await Location.getCurrentPositionAsync({ 
      accuracy: Location.Accuracy.BestForNavigation 
    });
    
    setPoints(prev => [...prev, loc.coords]);
    Alert.alert("Nokat goşuldy", `Takyklyk: ${loc.coords.accuracy.toFixed(1)}m`);
  };

  const calculatePreciseArea = () => {
    if (points.length < 3) {
      Alert.alert("Ýalňyşlyk", "Azyndan 3 nokat gerek!");
      return;
    }

    // Ýeriň radiusy (metr)
    const R = 6378137; 
    let area = 0;

    // Koordinatalary metr sistemasynda poligon edip hasaplaýarys
    // Bu formula çylşyrymly (irregular) formalary hem dogry ölçäýär
    for (let i = 0; i < points.length; i++) {
      let p1 = points[i];
      let p2 = points[(i + 1) % points.length];

      area += (p2.longitude * Math.PI / 180 - p1.longitude * Math.PI / 180) * (2 + Math.sin(p1.latitude * Math.PI / 180) + Math.sin(p2.latitude * Math.PI / 180));
    }

    area = Math.abs(area * R * R / 2.0); // metr kwadrat (m²)

    const ga = (area / 10000).toFixed(4);
    Alert.alert("Netije", `Meýdan: ${ga} gektar (${area.toFixed(2)} m²)`);
  };

  return (
    <View style={styles.container}>
      <Button title="Nokat Goş" onPress={addPoint} />
      <Button title="Takyk Hasapla" onPress={calculatePreciseArea} color="green" />
      <Button title="Arassala" onPress={() => setPoints([])} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({ container: { padding: 20 } });
