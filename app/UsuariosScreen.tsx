import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, FlatList, Modal, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useUsuarioSucursalContext } from './api/UsuariosSucursalesContext';
import BuscadorEscaner from '@/components/BuscadorEscaner';
import { getUserInfo } from './api/auth';


const UsuariosScreen = () => {
  const { usuarioSucursales, fetchUsuarioSucursales, updateUsuarioSucursal, removeUsuarioSucursal } = useUsuarioSucursalContext();
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [usuarioToDelete, setUsuarioToDelete] = useState(null);
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
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
    fetchUsuarioSucursales();
  }, []);

  const handleSearch = (text) => {
  };


  const handleEdit = (usuario) => {
    setSelectedUsuario(usuario);
    setNombre(usuario.nombre);
    setCorreo(usuario.correo);
    setModalVisible(true);
  };

  const handleSaveEdit = () => {
    if (selectedUsuario) {
      updateUsuarioSucursal(selectedUsuario.id_usuario, { nombre, correo });
      setModalVisible(false);
      setSelectedUsuario(null);
      setNombre('');
      setCorreo('');
    }
  };

  const handleDelete = () => {
    if (usuarioToDelete) {
      removeUsuarioSucursal(usuarioToDelete.id_usuario)
        .then(() => {
          fetchUsuarioSucursales(); // Actualiza la lista de usuarios
          console.log("Usuario eliminado y lista actualizada");
          setDeleteModalVisible(false);
          setUsuarioToDelete(null);
        })
        .catch((error) => {
          console.error("Error al eliminar el usuario:", error.message);
          setDeleteModalVisible(false);
          if (error.response && error.response.status === 403) {
            Alert.alert(
              "Error",
              "No tienes permiso para eliminar este usuario.",
              [{ text: "OK" }]
            );
          } else {
            Alert.alert(
              "Error",
              "Ha ocurrido un error al eliminar el usuario.",
              [{ text: "OK" }]
            );
          }
        });
    }
  };

  const confirmDelete = (usuario) => {
    setUsuarioToDelete(usuario);
    setDeleteModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.usuariosContainer}>
      <Text style={styles.usuariosNombre}>{item.nombre} {item.apellido_p} {item.apellido_m}</Text>
      <Text style={styles.usuariosCorreo}>{item.correo}</Text>
      {userRole === 'Admin'  || userRole === 'Gerente'  && (
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
  data={usuarioSucursales}
  renderItem={renderItem}
  keyExtractor={item => item?.id_usuario?.toString() ?? Math.random().toString()}
  contentContainerStyle={styles.usuariosList}
/>


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          setSelectedUsuario(null);
          setNombre('');
          setCorreo('');
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Editar Usuario</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={nombre}
            onChangeText={setNombre}
          />
          <TextInput
            style={styles.input}
            placeholder="Correo"
            value={correo}
            onChangeText={setCorreo}
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
          setUsuarioToDelete(null);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>¿Estás seguro que quieres eliminar este usuario?</Text>
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
                setUsuarioToDelete(null);
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
    marginBottom:40
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

export default UsuariosScreen;
