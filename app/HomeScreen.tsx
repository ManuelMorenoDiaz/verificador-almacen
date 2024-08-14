import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // Para los iconos
import BuscadorEscaner from '@/components/BuscadorEscaner';

interface HomeScreenProps {
  navigation?: any;
  ruta?: string
}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const handleSearch = (text) => {
    // Implement your search logic here
  };

  const handleAdd = () => {
    // Implement your add logic here
  };

  const enviar = (ruta) => {
    console.log("Vergas");
    navigation.navigate(ruta);
  };

  return (
    <View style={styles.container}>
      <BuscadorEscaner onSearch={handleSearch} onAdd={handleAdd} />
      
      <ScrollView contentContainerStyle={styles.main}>
        <TouchableOpacity style={styles.cardTop} >
          <Text style={styles.cardText}>Informacion</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card, styles.shadow]} onPress={() => enviar("Sucursales")}>
          <Icon name="home" size={32} color="#000" />
          <Text style={styles.cardText}>Sucursales</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card, styles.shadow]} onPress={() => enviar("Usuarios")}>
          <Icon name="users" size={32} color="#000" />
          <Text style={styles.cardText}>Usuarios</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card, styles.shadow]} onPress={() => enviar("Categorias")}>
          <Icon name="users" size={32} color="#000" />
          <Text style={styles.cardText}>Categorias</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  main: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardTop: {
    width: '100%',
    backgroundColor: '#F1F1F1',
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 0,
  },
  card: {
    width: '48%',
    backgroundColor: '#F1F1F1',
    borderRadius: 6,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
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
  cardText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default HomeScreen;
