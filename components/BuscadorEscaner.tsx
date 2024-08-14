import React, { useEffect, useState, useCallback } from 'react';
import { View, TextInput, Image, TouchableOpacity, StyleSheet, Alert, Text, Modal, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../app/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { logOut } from '../app/api/auth';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useProductContext } from '@/app/api/ProductContext';

const BuscadorEscaner = () => {
  const { logout } = useAuth();
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { products, loading: productLoading, error: productError, fetchProducts } = useProductContext();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
    fetchProducts();
  }, []);

  // Filtrar productos basados en la consulta de búsqueda
  const filteredProducts = products.filter(product =>
    product.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBarCodeScanned = useCallback(({ type, data }) => {
    if (!scanned) {
      setScanned(true);
      Alert.alert('Código escaneado!', `\nDato: ${data}`);
      setScanned(false);
    }
  }, [scanned]);

  const enviar = (product) => {
    navigation.navigate('Detalles', { product });
  };

  const cerrarSesion = async () => {
    try {
      const rest = await logOut();
      if (rest) {
        console.log('Sesión cerrada correctamente');
        logout();
      } else {
        console.log('Error al cerrar la sesión');
      }
    } catch (error) {
      console.error('Error al cerrar la sesión:', error);
    }
  };

  if (hasPermission === null) {
    return <Text>Solicitando permiso para acceder a la cámara...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No se concedió acceso a la cámara</Text>;
  }

  return (
    <>
      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={20} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar"
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />
        <TouchableOpacity
          style={[styles.scanButton, styles.shadow]}
          onPress={() => setModalVisible(true)}
        >
          <Icon name="scan-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.scanButton, styles.shadow]} onPress={cerrarSesion}>
          <Icon name="exit-outline" size={24} color="black" />
        </TouchableOpacity>

        {/* Modal para mostrar la cámara de escaneo */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
            setScanned(false); // Reinicia el estado al cerrar el modal
          }}
        >
          <View style={styles.cameraContainer}>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setModalVisible(false);
                setScanned(false); // Reinicia el estado al cerrar el modal
              }}
            >
              <Icon name="close-circle" size={32} color="white" />
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
      {/* Mostrar productos solo si hay una consulta activa */}
      {searchQuery && (
        <View style={styles.productsSearch}>
          <FlatList
            data={filteredProducts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.product} onPress={() => enviar(item)}>
                {item.imagen ? (
                  <Image source={{ uri: `${item.imagen}` }} style={styles.productImage} />
                ) : (
                  <View style={styles.placeholderImage} />
                )}
                <View style={styles.productDetails}>
                  <Text style={styles.productName}>{item.nombre}</Text>
                  <Text style={styles.productPrice}>${item.precio}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchIcon: {
    position: 'absolute',
    left: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 32,
    fontSize: 16,
  },
  scanButton: {
    marginLeft: 16,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F1F1F1',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  productsSearch:{
    borderColor:'black',
    borderWidth:2,
    width: '100%',
    height: '100%',
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  product: {
    width: '100%',
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 5,
    overflow: 'hidden',
    elevation: 2,
    padding: 5,
    shadowColor: '#000',
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  productImage: {
    width: '100%',
    height: 150,
  },
  placeholderImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#ddd',
  },
  productDetails: {
    padding: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: '#007BFF',
  },
});

export default BuscadorEscaner;
