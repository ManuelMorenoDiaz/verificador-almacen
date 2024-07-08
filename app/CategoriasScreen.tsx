import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BuscadorAñadir from '@/components/BuscadorAñadir';

const data = [
  { id: '1', title: 'Categoría 1', image: 'https://images.vexels.com/content/234065/preview/hoodie-clothing-stroke-ecdb8a.png', address: 'Dirección 1' },
  { id: '2', title: 'Categoría 2', image: 'https://images.vexels.com/content/234065/preview/hoodie-clothing-stroke-ecdb8a.png', address: 'Dirección 2' },
  { id: '3', title: 'Categoría 3', image: 'https://images.vexels.com/content/234065/preview/hoodie-clothing-stroke-ecdb8a.png', address: 'Dirección 3' },
  { id: '4', title: 'Categoría 4', image: 'https://images.vexels.com/content/234065/preview/hoodie-clothing-stroke-ecdb8a.png', address: 'Dirección 4' },
];

const CategoriasScreen = ({ navigation }) => {
  const handleSearch = (text) => {
    // Implement your search logic here
  };

  const handleAdd = () => {
    // Implement your add logic here
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.address}>{item.address}</Text>
      <View style={styles.iconContainer}>
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
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
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

    overflow: 'hidden',
  },
  image: {
    width: '100%',
    aspectRatio: 1, // Aspect ratio 1:1
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 8,
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    marginBottom: 8,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
  },
  iconButton: {
    marginLeft: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});

export default CategoriasScreen;
