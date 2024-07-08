import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BuscadorAñadir from '@/components/BuscadorAñadir';

const OrdenesScreen = () => {
  const usuarios = [
    { id: '1', sucursal: 'Sucursal 1', usuario: 'usuario1', apellido_p: 'apellido_p1', apellido_m: 'apellido_m1', cantidad: 'cantidad 1', estado: 'Abierta', fecha: '00-00-0000' },
    { id: '2', sucursal: 'Sucursal 2', usuario: 'usuario1', apellido_p: 'apellido_p2', apellido_m: 'apellido_m2', cantidad: 'cantidad 2', estado: 'Cerrada', fecha: '00-00-0000' },
    { id: '3', sucursal: 'Sucursal 3', usuario: 'usuario1', apellido_p: 'apellido_p3', apellido_m: 'apellido_m3', cantidad: 'cantidad 3', estado: 'Abierta', fecha: '00-00-0000' },
    { id: '4', sucursal: 'Sucursal 4', usuario: 'usuario1', apellido_p: 'apellido_p4', apellido_m: 'apellido_m4', cantidad: 'cantidad 4', estado: 'Abierta', fecha: '00-00-0000' },
    { id: '2', sucursal: 'Sucursal 2', usuario: 'usuario1', apellido_p: 'apellido_p2', apellido_m: 'apellido_m2', cantidad: 'cantidad 2', estado: 'Cerrada', fecha: '00-00-0000' },
    { id: '3', sucursal: 'Sucursal 3', usuario: 'usuario1', apellido_p: 'apellido_p3', apellido_m: 'apellido_m3', cantidad: 'cantidad 3', estado: 'Abierta', fecha: '00-00-0000' },
    { id: '4', sucursal: 'Sucursal 4', usuario: 'usuario1', apellido_p: 'apellido_p4', apellido_m: 'apellido_m4', cantidad: 'cantidad 4', estado: 'Abierta', fecha: '00-00-0000' },
  ];

  const handleSearch = (text) => {
    // Implement your search logic here
  };

  const handleAdd = () => {
    // Implement your add logic here
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.ordenesContainer}>
      <Text style={styles.ordenesSucursal}>{item.sucursal}</Text>
      <Text style={styles.usuarioscantidad}>Usuario: {item.usuario} {item.apellido_p} {item.apellido_m}</Text>
      <Text style={styles.usuarioscantidad}>Cantidad: {item.cantidad}</Text>
      <Text style={styles.usuariosestado}>Estado: {item.estado}</Text>

      <View style={styles.fechaContainer}>
        <Text style={styles.fecha}> {item.fecha}</Text>
      </View>
    </TouchableOpacity>
  );

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
  ordenesContainer: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  ordenesSucursal: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  usuarioscantidad: {
    fontSize: 14,
    color: '#666',
  },
  usuariosestado: {
    fontSize: 14,
    color: '#500',
  },
  fechaContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 17,
    right: 8,
  },
  fecha:{
    fontSize: 12,
    color: '#666',
  },
  iconButton: {
    marginLeft: 8,
  },
});

export default OrdenesScreen;
