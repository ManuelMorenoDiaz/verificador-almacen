import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, FlatList, Modal, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSucursalContext } from './api/SucursalesContext';
import BuscadorEscaner from '@/components/BuscadorEscaner';
import { getUserInfo } from './api/auth';

const SucursalesScreen = () => {
  const { sucursales, fetchSucursales, updateSucursal, removeSucursal } = useSucursalContext();
  const [selectedSucursal, setSelectedSucursal] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [sucursalToDelete, setSucursalToDelete] = useState(null);
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [userRole, setUserRole] = useState('');


  React.useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const info = await getUserInfo();
        if (info && info.rol) {
          setUserRole(info.rol);
        } else {
          console.log('No se pudo obtener la información del usuario.');
        }
      } catch (error) {
        console.error('Error al obtener la información del usuario:', error);
      }
    };

    fetchUserInfo();
    fetchSucursales();
  }, []);

  const handleSearch = (text) => {
    // Implement your search logic here
  };


  const handleEdit = (sucursal) => {
    setSelectedSucursal(sucursal);
    setNombre(sucursal.nombre);
    setDireccion(sucursal.direccion);
    setModalVisible(true);
  };

  const handleSaveEdit = () => {
    if (selectedSucursal) {
      updateSucursal(selectedSucursal.id_sucursal, { nombre, direccion });
      setModalVisible(false);
      setSelectedSucursal(null);
      setNombre('');
      setDireccion('');
    }
  };

  const handleDelete = () => {
    if (sucursalToDelete) {
      removeSucursal(sucursalToDelete.id_sucursal)
        .then(() => {
          fetchSucursales(); // Actualiza la lista de sucursales
          
          setDeleteModalVisible(false);
          setSucursalToDelete(null);
        })
        .catch((error) => {
          console.error("Error al eliminar la sucursal:", error.message);
          setDeleteModalVisible(false);
          if (error.response && error.response.status === 403) {
            Alert.alert(
              "Error",
              "No tienes permiso para eliminar esta sucursal.",
              [{ text: "OK" }]
            );
          } else {
            Alert.alert(
              "Error",
              "Ha ocurrido un error al eliminar la sucursal.",
              [{ text: "OK" }]
            );
          }
        });
    }
  };

  const confirmDelete = (sucursal) => {
    setSucursalToDelete(sucursal);
    setDeleteModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.sucursalContainer}>
      <Text style={styles.sucursalNombre}>{item.nombre}</Text>
      <Text style={styles.sucursalDireccion}>{item.direccion}</Text>
      {userRole === 'Admin' && (
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={() => handleEdit(item)}>
          <Icon name="create-outline" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => confirmDelete(item)}>
          <Icon name="trash-outline" size={20} color="black" />
        </TouchableOpacity>
      </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <BuscadorEscaner onSearch={handleSearch} />
      <FlatList
        data={sucursales}
        renderItem={renderItem}
        keyExtractor={item => item.id_sucursal.toString()}
        contentContainerStyle={styles.sucursalesList}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          setSelectedSucursal(null);
          setNombre('');
          setDireccion('');
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Editar Sucursal</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={nombre}
            onChangeText={setNombre}
          />
          <TextInput
            style={styles.input}
            placeholder="Dirección"
            value={direccion}
            onChangeText={setDireccion}
          />
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={handleSaveEdit}
          >
            <Text style={styles.textStyle}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={() => {
          setDeleteModalVisible(!deleteModalVisible);
          setSucursalToDelete(null);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>¿Estás seguro que quieres eliminar esta sucursal?</Text>
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={handleDelete}
            >
              <Text style={styles.textStyle}>Eliminar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonCancel]}
              onPress={() => {
                setDeleteModalVisible(!deleteModalVisible);
                setSucursalToDelete(null);
              }}
            >
              <Text style={styles.textStyle}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  buttonCancel: {
    backgroundColor: '#FF0000',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default SucursalesScreen;
