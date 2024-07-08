import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const BuscadorAñadir = ({ onSearch, onAdd }) => {
  return (
    <View style={styles.searchContainer}>
      <Icon name="search-outline" size={20} style={styles.searchIcon} />
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar"
        onChangeText={onSearch}
      />
      <TouchableOpacity style={styles.addButton} onPress={onAdd}>
        <Icon name="add-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
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
  addButton: {
    marginLeft: 16,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F1F1F1',
  },
});

export default BuscadorAñadir;
