import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, FlatList, Modal, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BuscadorAñadir from '@/components/BuscadorAñadir';
import { useCategoriesContext } from './api/CategoriesContext';
import BuscadorEscaner from '@/components/BuscadorEscaner';
import { getUserInfo } from './api/auth';

// Mapeo de iconos personalizados a Ionicons con outline
const iconMap = {
  electronics_icon: 'phone-portrait-outline',
  furniture_icon: 'bed-outline',
  clothing_icon: 'shirt-outline',
  appliances_icon: 'home-outline',
  books_icon: 'book-outline',
  toys_icon: 'game-controller-outline',
  sports_icon: 'football-outline',
  beauty_icon: 'heart-outline',
  gardening_icon: 'flower-outline',
};

const CategoriasScreen = ({ navigation }) => {
  const { categories, fetchCategories, updateCategory, removeCategory } = useCategoriesContext();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('');
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
    fetchCategories(); // Cargar las categorías al iniciar
  }, []);

  console.log("5555555555555555555555555555555555");
  console.log(userRole);
  
  

  const handleSearch = (text) => {
    // Implement your search logic here
  };

  const handleAdd = () => {
    // Implement your add logic here
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setNombre(category.nombre);
    setDescripcion(category.descripcion);
    setImagen(category.imagen)
    setModalVisible(true);
  };

  const handleSaveEdit = () => {
    if (selectedCategory) {
      updateCategory(selectedCategory.id_categoria, { nombre, descripcion, imagen });
      setModalVisible(false);
      setSelectedCategory(null);
      setNombre('');
      setDescripcion('');
    }
  };

  const handleDelete = () => {
    if (categoryToDelete) {
      removeCategory(categoryToDelete.id_categoria)
        .then(() => {
          fetchCategories(); // Actualiza la lista de categorías
          
          setDeleteModalVisible(false);
          setCategoryToDelete(null);
        })
        .catch((error) => {
          console.error("Error al eliminar la categoría:", error.message);
          setDeleteModalVisible(false);
          if (error.response && error.response.status === 403) {
            Alert.alert(
              "Error",
              "No tienes permiso para eliminar esta categoría.",
              [{ text: "OK" }]
            );
          } else {
            Alert.alert(
              "Error",
              "Ha ocurrido un error al eliminar la categoría.",
              [{ text: "OK" }]
            );
          }
        });
    }
  };

  const confirmDelete = (category) => {
    setCategoryToDelete(category);
    setDeleteModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Icon name={iconMap[item.imagen] || 'help-outline'} style={styles.icon} size={50} color="black" />
      <Text style={styles.title}>{item.nombre}</Text>
      <Text style={styles.address}>{item.descripcion}</Text>
      
      {/* Mostrar botones de editar y eliminar solo si el rol es Admin */}
      {userRole === 'Admin' && (
        <View style={styles.iconContainer}>
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
      <BuscadorEscaner onSearch={handleSearch}></BuscadorEscaner>
      
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id_categoria.toString()}
        contentContainerStyle={styles.listContent}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          setSelectedCategory(null);
          setNombre('');
          setDescripcion('');
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Editar Categoría</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={nombre}
            onChangeText={setNombre}
          />
          <TextInput
            style={styles.input}
            placeholder="Descripción"
            value={descripcion}
            onChangeText={setDescripcion}
          />
          <TextInput
            style={styles.input}
            placeholder="Imagen"
            value={imagen}
            onChangeText={setImagen}
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
          setCategoryToDelete(null);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>¿Estás seguro que quieres eliminar esta categoría?</Text>
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
                setCategoryToDelete(null);
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
  listContent: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  card: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    padding: 16,
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    marginBottom: 8,
    flex: 1,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
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

export default CategoriasScreen;
