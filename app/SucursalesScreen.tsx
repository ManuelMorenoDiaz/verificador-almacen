import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BuscadorAñadir from '@/components/BuscadorAñadir';

const SucursalesScreen = () => {
  const sucursales = [
    { id: '1', nombre: 'Sucursal 1', direccion: 'Dirección 1' },
    { id: '2', nombre: 'Sucursal 2', direccion: 'Dirección 2' },
    { id: '3', nombre: 'Sucursal 3', direccion: 'Dirección 3' },
    { id: '4', nombre: 'Sucursal 4', direccion: 'Dirección 4' },
    
  ];
  const handleSearch = (text) => {
    // Implement your search logic here
  };

  const handleAdd = () => {
    // Implement your add logic here
  };


  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.sucursalContainer}>
      <Text style={styles.sucursalNombre}>{item.nombre}</Text>
      <Text style={styles.sucursalDireccion}>{item.direccion}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="create-outline" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="trash-outline" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <BuscadorAñadir onSearch={handleSearch} onAdd={handleAdd} />
      <FlatList
        data={sucursales}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.sucursalesList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  sucursalesList: {
    paddingTop: 8,
    paddingHorizontal: 10,

  },
  sucursalContainer: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  sucursalNombre: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sucursalDireccion: {
    fontSize: 14,
    color: '#666',
  },
  buttonsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 8,
    right: 8,
  },
  iconButton: {
    marginLeft: 8,
  },
});

export default SucursalesScreen;
