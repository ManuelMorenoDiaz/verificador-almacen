import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // Para los iconos
import BuscadorEscaner from '@/components/BuscadorEscaner';

const HomeScreen = () => {
  const handleSearch = (text) => {
    // Implement your search logic here
  };

  const handleAdd = () => {
    // Implement your add logic here
  };

  return (
    <View style={styles.container}>
      <BuscadorEscaner onSearch={handleSearch} onAdd={handleAdd} />
      
      <ScrollView contentContainerStyle={styles.main}>
        <TouchableOpacity style={styles.cardTop}>
          <Text style={styles.cardText}>Sucursales</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Icon name="home" size={32} color="#000" />
          <Text style={styles.cardText}>Sucursales</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Icon name="users" size={32} color="#000" />
          <Text style={styles.cardText}>Usuarios</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Icon name="users" size={32} color="#000" />
          <Text style={styles.cardText}>Categorias</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  main: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardTop: {
    width: '100%',
    backgroundColor: '#F1F1F1',
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 0,
  },
  card: {
    width: '48%',
    backgroundColor: '#F1F1F1',
    borderRadius: 6,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  cardText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default HomeScreen;
