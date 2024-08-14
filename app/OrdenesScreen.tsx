import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Button, Alert } from 'react-native';
import { useOrdenContext } from './api/OrdenesContext';
import { useProductContext } from './api/ProductContext';
import { useSucursalContext } from './api/SucursalesContext';
import BuscadorEscaner from '@/components/BuscadorEscaner';
import Icon from 'react-native-vector-icons/Feather';
import { getUserInfo } from './api/auth';


const OrdenesScreen = () => {
  const { ordenes, loading, error, fetchOrdenes, getOrden, removeOrden, updateOrden, addOrden } = useOrdenContext();
  const { products, loadingProducts, errorProducts, fetchProducts } = useProductContext();
  const { sucursales, loadingSucursales, errorSucursales, fetchSucursales } = useSucursalContext();

  const [selectedOrden, setSelectedOrden] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [errorAlertVisible, setErrorAlertVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [userRole, setUserRole] = useState('');


  const [newOrden, setNewOrden] = useState({
    estado: '',
    fecha: '',
    id_sucursal: '',
    id_usuario: '',
    detalles: [{ id_producto: '', cantidad: '' }],
  });

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
  }, []);

  useEffect(() => {
    fetchOrdenes();
    // fetchProducts(); // Assuming you need to fetch products as well
    // fetchSucursales(); // Assuming you need to fetch sucursales as well
  }, [fetchOrdenes, fetchProducts, fetchSucursales]);

  const handleSearch = (text) => {
    // Implement your search logic here
  };

  const handleAddOrden = async () => {
    const { estado, fecha, id_sucursal, id_usuario, detalles } = newOrden;

    if (!estado || !fecha || !id_sucursal || !id_usuario || detalles.length === 0) {
      setErrorMessage('Todos los campos son requeridos');
      setErrorAlertVisible(true);
      
      return;
    }

    const ordenToAdd = {
      estado,
      fecha,
      id_sucursal: parseInt(id_sucursal, 10),
      id_usuario: parseInt(id_usuario, 10),
      detalles: detalles.map(detalle => ({
        id_producto: parseInt(detalle.id_producto, 10),
        cantidad: parseInt(detalle.cantidad, 10),
      })),
    };

    try {
      await addOrden(ordenToAdd);
      setModalVisible2(false);
      fetchOrdenes(); // Refresh orders list
      setNewOrden({
        estado: '',
        fecha: '',
        id_sucursal: '',
        id_usuario: '',
        detalles: [{ id_producto: '', cantidad: '' }],
      });
    } catch (error) {
      setErrorMessage(error.message || 'Error al añadir la orden');
      setErrorAlertVisible(true);
    }
  };

  const handleOrdenPress = async (id) => {
    try {
      const orden = await getOrden(id);
      if (orden) {
        setSelectedOrden(orden);
        setModalVisible(true);
      } else {
        throw new Error('Error al obtener la orden');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setErrorAlertVisible(true);
    }
  };

  const handleEliminar = async (id) => {
    try {
      await removeOrden(id);
      setModalVisible(false);
      fetchOrdenes(); // Refresh orders list
    } catch (error) {
      setErrorMessage(error.message || 'Error al eliminar la orden');
      setErrorAlertVisible(true);
    }
  };

  const handleFinalizar = async (orden) => {
    const updatedOrden = {
      estado: 'Cerrada',
      fecha:orden.fecha,
      id_sucursal: orden.sucursal.id_sucursal,
      id_usuario: orden.usuario.id_usuario,
    };
    
    try {
      await updateOrden(orden.id_ordenVerificacion, updatedOrden);
      setModalVisible(false);
      fetchOrdenes(); // Refresca la lista de órdenes
    } catch (error) {
      setErrorMessage(error.message || 'Error al finalizar la orden');
      setErrorAlertVisible(true);
    }
};


  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.ordenesContainer} onPress={() => handleOrdenPress(item.id_ordenVerificacion)}>
      <Text style={styles.ordenesSucursal}>{item.sucursal.nombre}</Text>
      <Text style={styles.usuarioscantidad}>Usuario: {item.usuario.nombre}</Text>
      <Text style={styles.usuariosestado}>Estado: {item.estado}</Text>
      <View style={styles.fechaContainer}>
        <Text style={styles.fecha}>{new Date(item.fecha).toLocaleDateString()}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando órdenes...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error al cargar las órdenes: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BuscadorEscaner onSearch={handleSearch} />
      {userRole === 'Empleado' && (
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible2(true)}>
        <Icon name="plus" size={24} color="white" />
        <Text style={styles.addButtonText}>Añadir Orden</Text>
      </TouchableOpacity>
      )}
      <FlatList
        data={ordenes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id_ordenVerificacion.toString()}
        contentContainerStyle={styles.usuariosList}
      />
      {selectedOrden && (
        <Modal
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Detalles de la Orden</Text>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}><Text style={styles.modalLabel}>ID:</Text> {selectedOrden.id_ordenVerificacion}</Text>
              <Text style={styles.modalText}><Text style={styles.modalLabel}>Sucursal:</Text> {selectedOrden.sucursal.nombre}</Text>
              <Text style={styles.modalText}><Text style={styles.modalLabel}>Usuario:</Text> {selectedOrden.usuario.nombre}</Text>
              <Text style={styles.modalText}><Text style={styles.modalLabel}>Estado:</Text> {selectedOrden.estado}</Text>
              <Text style={styles.modalText}><Text style={styles.modalLabel}>Fecha:</Text> {new Date(selectedOrden.fecha).toLocaleDateString()}</Text>
              <Text style={styles.modalSubtitle}>Detalles:</Text>
              {selectedOrden.detalles.map((detalle, index) => (
                <View key={index} style={styles.detalleContainer}>
                  <Text style={styles.detalleText}>Producto: {detalle.id_producto}</Text>
                  <Text style={styles.detalleText}>Cantidad: {detalle.cantidad}</Text>
                </View>
              ))}
            </View>
            <View style={styles.buttonContainer}>
              {(userRole === 'Admin' || userRole === 'Gerente') && (
                <>
                  <TouchableOpacity style={styles.button} onPress={() => handleEliminar(selectedOrden.id_ordenVerificacion)}>
                    <Text style={styles.buttonText}>Eliminar</Text>
                  </TouchableOpacity>
                  {selectedOrden.estado !== 'Cerrada' && (
                    <TouchableOpacity style={[styles.button, styles.finalizarButton]} onPress={() => handleFinalizar(selectedOrden)}>
                      <Text style={styles.buttonText}>Finalizar</Text>
                    </TouchableOpacity>
                  )}
                </>
              )}
              <TouchableOpacity style={[styles.button, styles.closeButton]} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
      <Modal
        visible={errorAlertVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setErrorAlertVisible(false)}
      >
        <View style={styles.alertContainer}>
          <View style={styles.alertBox}>
            <Text style={styles.alertText}>{errorMessage}</Text>
            <TouchableOpacity onPress={() => setErrorAlertVisible(false)}>
              <Icon name="x-circle" size={24} color="red" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        visible={modalVisible2}
        animationType="slide"
        onRequestClose={() => setModalVisible2(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Añadir Nueva Orden</Text>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Estado"
              value={newOrden.estado}
              onChangeText={(text) => setNewOrden(prev => ({ ...prev, estado: text }))}
            />
            <TextInput
              style={styles.input}
              placeholder="Fecha (YYYY-MM-DD)"
              value={newOrden.fecha}
              onChangeText={(text) => setNewOrden(prev => ({ ...prev, fecha: text }))}
            />
            <TextInput
              style={styles.input}
              placeholder="ID Sucursal"
              value={newOrden.id_sucursal}
              onChangeText={(text) => setNewOrden(prev => ({ ...prev, id_sucursal: text }))}
            />
            <TextInput
              style={styles.input}
              placeholder="ID Usuario"
              value={newOrden.id_usuario}
              onChangeText={(text) => setNewOrden(prev => ({ ...prev, id_usuario: text }))}
            />
            {/* Map through and render inputs for `detalles` */}
            {newOrden.detalles.map((detalle, index) => (
              <View key={index} style={styles.detalleInputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder={`ID Producto ${index + 1}`}
                  value={detalle.id_producto}
                  onChangeText={(text) => {
                    const newDetalles = [...newOrden.detalles];
                    newDetalles[index].id_producto = text;
                    setNewOrden(prev => ({ ...prev, detalles: newDetalles }));
                  }}
                />
                <TextInput
                  style={styles.input}
                  placeholder={`Cantidad ${index + 1}`}
                  value={detalle.cantidad}
                  onChangeText={(text) => {
                    const newDetalles = [...newOrden.detalles];
                    newDetalles[index].cantidad = text;
                    setNewOrden(prev => ({ ...prev, detalles: newDetalles }));
                  }}
                />
              </View>
            ))}
            <TouchableOpacity style={styles.AbtnButton} onPress={() => setNewOrden(prev => ({ ...prev, detalles: [...prev.detalles, { id_producto: '', cantidad: '' }] }))} >
              <Text style={styles.buttonText}>Añadir Detalle</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnButton} onPress={handleAddOrden} >
              <Text style={styles.buttonText}>Añadir Orden</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible2(false)}>
              <Text style={styles.buttonText}>Cerrar</Text>
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
    backgroundColor: 'white',
    padding:10,
    paddingBottom:70,

  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ordenesContainer: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    shadowColor: '#000',
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  ordenesSucursal: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  usuarioscantidad: {
    fontSize: 16,
    marginVertical: 5,
  },
  usuariosestado: {
    fontSize: 16,
    marginVertical: 5,
  },
  fechaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fecha: {
    fontSize: 16,
  },
  addButton: {
    backgroundColor: 'black',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
  },
  usuariosList: {
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },
  modalText: {
    fontSize: 16,
    marginVertical: 5,
  },
  modalLabel: {
    fontWeight: 'bold',
  },
  modalSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  detalleContainer: {
    marginVertical: 5,
  },
  detalleText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin:10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  finalizarButton: {
    backgroundColor: '#28A745',
  },
  closeButton: {
    backgroundColor: '#DC3545',
    padding:10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  detalleInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    flex: 1,
    marginRight: 10,
  },
  alertContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertBox: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  alertText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  detalleInputContainer: {
    marginBottom: 10,
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  AbtnButton:{
    marginBottom:10,
    backgroundColor:'green',
    padding:10,
    borderRadius:5,
    alignItems:'center',
  },
  btnButton:{
    marginBottom:10,
    backgroundColor:'black',
    padding:10,
    borderRadius:5,
    alignItems:'center',
  }
});

export default OrdenesScreen;
