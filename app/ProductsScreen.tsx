import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker'; // Importa desde '@react-native-picker/picker'
import BuscadorEscaner from '@/components/BuscadorEscaner';
import { useProductContext } from './api/ProductContext';
import { useCategoriesContext } from './api/CategoriesContext';
import { useSucursalContext } from './api/SucursalesContext';
import { getUserInfo } from './api/auth';

const ProductsScreen = ({ navigation }) => {
  const { products, loading: productLoading, error: productError, fetchProducts, addProduct } = useProductContext();
  const { categories, loading: categoryLoading, error: categoryError, fetchCategories } = useCategoriesContext();
  const { sucursales, loading: sucursalLoading, error: sucursalError, fetchSucursales } = useSucursalContext();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSucursal, setSelectedSucursal] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newProduct, setNewProduct] = useState({
    nombre: '',
    descripcion: '',
    imagen: '',
    cantidad: '',
    id_categoria: '',
    id_sucursal: '',
    precio: '',
  });

  const [userRole, setUserRole] = useState('');


  useEffect(() => {
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
    fetchProducts();
    fetchCategories();
    fetchSucursales();
  }, []);

  const handleAddProduct = async () => {
    if (newProduct.nombre && newProduct.descripcion && newProduct.imagen && newProduct.cantidad && newProduct.id_categoria && newProduct.id_sucursal && newProduct.precio) {
      await addProduct({
        nombre: newProduct.nombre,
        descripcion: newProduct.descripcion,
        imagen: newProduct.imagen,
        cantidad: parseInt(newProduct.cantidad),
        id_categoria: parseInt(newProduct.id_categoria),
        id_sucursal: parseInt(newProduct.id_sucursal),
        precio: parseFloat(newProduct.precio),
      });
      setModalVisible(false);
      setNewProduct({
        nombre: '',
        descripcion: '',
        imagen: '',
        cantidad: '',
        id_categoria: '',
        id_sucursal: '',
        precio: '',
      });
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
      setNewProduct({ ...newProduct, imagen: imageUri });
    }
  };

  const handleSearch = (text) => {
    // Implementa tu lógica de búsqueda aquí
  };

  const CategoryIcon = ({ iconName, style }) => (
    <Icon name={iconName} style={style} size={24} color="black" />
  );

  const iconMappings = {
    "prueba Categoria imagen": "image",
    "electronics_icon": "cpu",
    "furniture_icon": "box",
    "clothing_icon": "shopping-bag",
    "appliances_icon": "coffee",
    "books_icon": "book-open",
    "toys_icon": "gift",
    "sports_icon": "activity",
    "beauty_icon": "heart",
    "gardening_icon": "sun",
  };

  const enviar = (product) => {
    navigation.navigate('Detalles', { product });
  };

  const filteredProducts = selectedCategory
    ? products.filter(product => product.id_categoria === selectedCategory)
    : products;

  if (productLoading || categoryLoading || sucursalLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  if (productError || categoryError || sucursalError) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Error al cargar datos: {productError?.message || categoryError?.message || sucursalError?.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BuscadorEscaner onSearch={handleSearch} />
      {userRole === 'Admin'  || userRole === 'Gerente'  && (
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Icon name="plus" size={24} color="white" />
        <Text style={styles.addButtonText}>Añadir Producto</Text>
      </TouchableOpacity>
      )}
      <ScrollView style={styles.main}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categorías</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.carouselItem,
                  selectedCategory === category.id_categoria && styles.selectedCategory
                ]}
                onPress={() => setSelectedCategory(category.id_categoria === selectedCategory ? null : category.id_categoria)}
              >
                <CategoryIcon iconName={iconMappings[category.imagen]} style={styles.icon} />
                <Text style={styles.carouselText}>{category.nombre}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Productos Destacados</Text>
          <View style={styles.grid}>
            {filteredProducts.map((product, index) => (
              <TouchableOpacity key={index} style={styles.product} onPress={() => enviar(product)}>
                {product.imagen ? (
                  <Image source={{ uri: `${product.imagen}` }} style={styles.productImage} />
                ) : (
                  <View style={styles.placeholderImage} />
                )}
                <View style={styles.productDetails}>
                  <Text style={styles.productName}>{product.nombre}</Text>
                  <Text style={styles.productPrice}>${product.precio}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Añadir Nuevo Producto</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre del producto"
              placeholderTextColor="#888"
              value={newProduct.nombre}
              onChangeText={(text) => setNewProduct({ ...newProduct, nombre: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Descripción del producto"
              placeholderTextColor="#888"
              value={newProduct.descripcion}
              onChangeText={(text) => setNewProduct({ ...newProduct, descripcion: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Cantidad del producto"
              placeholderTextColor="#888"
              keyboardType="numeric"
              value={newProduct.cantidad}
              onChangeText={(text) => setNewProduct({ ...newProduct, cantidad: text })}
            />
            <View style={styles.pickerContainer}>
              <Text style={styles.pickerLabel}>Categoría</Text>
              <Picker
                selectedValue={selectedCategory}
                onValueChange={(itemValue) => {
                  setSelectedCategory(itemValue);
                  setNewProduct({ ...newProduct, id_categoria: itemValue.toString() });
                }}
                style={styles.picker}
              >
                <Picker.Item label="Selecciona una categoría" value="" />
                {categories.map((category) => (
                  <Picker.Item key={category.id_categoria} label={category.nombre} value={category.id_categoria} />
                ))}
              </Picker>
            </View>
            <View style={styles.pickerContainer}>
              <Text style={styles.pickerLabel}>Sucursal</Text>
              <Picker
                selectedValue={selectedSucursal}
                onValueChange={(itemValue) => {
                  setSelectedSucursal(itemValue);
                  setNewProduct({ ...newProduct, id_sucursal: itemValue.toString() });
                }}
                style={styles.picker}
              >
                <Picker.Item label="Selecciona una sucursal" value="" />
                {sucursales.map((sucursal) => (
                  <Picker.Item key={sucursal.id_sucursal} label={sucursal.nombre} value={sucursal.id_sucursal} />
                ))}
              </Picker>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Precio del producto"
              placeholderTextColor="#888"
              keyboardType="numeric"
              value={newProduct.precio}
              onChangeText={(text) => setNewProduct({ ...newProduct, precio: text })}
            />
            <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
              <Text style={styles.imageButtonText}>Seleccionar Imagen</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton} onPress={handleAddProduct}>
              <Text style={styles.submitButtonText}>Añadir Producto</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Icon name="x" size={24} color="white" />
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
  loadingText: {
    fontSize: 18,
    color: '#333',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'black',
    borderRadius: 5,
    margin: 10,
  },
  addButtonText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 18,
  },
  main: {
    flex: 1,
  },
  section: {
    padding: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  carouselItem: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 3,
    marginVertical:10,
    marginRight: 10,
    alignItems: 'center',
    
    shadowColor: '#000',
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  
  },
  selectedCategory: {
    backgroundColor: '#f8f9fa',
    borderRadius: 3,
    padding: 10,

  },
  icon: {
    marginBottom: 5,
  },
  carouselText: {
    fontSize: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  product: {
    width: '48%',
    backgroundColor: '#fff',
    margin: '1%',
    borderRadius: 5,
    overflow: 'hidden',
    elevation: 2,

    padding:5,

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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 5,
    fontSize: 16,
  },
  pickerContainer: {
    marginBottom: 20,
  },
  pickerLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  imageButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  imageButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#28A745',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default ProductsScreen;
