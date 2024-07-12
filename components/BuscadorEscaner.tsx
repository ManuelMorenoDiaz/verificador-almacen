import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const BuscadorEscaner = ({ onSearch, onAdd }) => {
  return (
    <View style={styles.searchContainer}>
      <Icon name="search-outline" size={20} style={styles.searchIcon} />
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar"
        onChangeText={onSearch}
      />
      <TouchableOpacity style={[styles.scanButton, styles.shadow]} onPress={onAdd}>
        <Icon name="scan-outline" size={24} color="black" />
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
});

export default BuscadorEscaner;
