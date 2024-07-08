import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BuscadorAñadir from '@/components/BuscadorAñadir';

const UsuariosScreen = () => {
  const usuarios = [
    { id: '1', nombre: 'Nombre1', apellido_p: 'apellido_p1', apellido_m: 'apellido_m1', correo: 'correo 1' },
    { id: '2', nombre: 'Nombre2', apellido_p: 'apellido_p2', apellido_m: 'apellido_m2', correo: 'correo 2' },
    { id: '3', nombre: 'Nombre3', apellido_p: 'apellido_p3', apellido_m: 'apellido_m3', correo: 'correo 3' },
    { id: '4', nombre: 'Nombre4', apellido_p: 'apellido_p4', apellido_m: 'apellido_m4', correo: 'correo 4' },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.usuariosContainer}>
      <Text style={styles.usuariosNombre}>{item.nombre} {item.apellido_p} {item.apellido_m}</Text>
      <Text style={styles.usuariosCorreo}>{item.correo}</Text>
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

  const handleSearch = (text) => {
    // Implement your search logic here
  };

  const handleAdd = () => {
    // Implement your add logic here
  };

  return (
    <View style={styles.container}>
      <BuscadorAñadir onSearch={handleSearch} onAdd={handleAdd} />
      <FlatList
        data={usuarios}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.usuariosList}
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
  usuariosList: {
    paddingTop: 8,
    paddingHorizontal: 10,

  },
  usuariosContainer: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  usuariosNombre: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  usuariosCorreo: {
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

export default UsuariosScreen;
