import React from 'react';
import { View, Text, TextInput, Image, ScrollView, StyleSheet, TouchableOpacity, Button } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import Icon from 'react-native-vector-icons/Feather'; // Para los iconos
import BuscadorEscaner from '@/components/BuscadorEscaner';

interface ProductsScreenProps {
  navigation?: any;
}
const handleSearch = (text) => {
  // Implement your search logic here
};

const handleAdd = () => {
  // Implement your add logic here
};

const ProductsScreen: React.FC<ProductsScreenProps> = ({navigation}) => {
  const enviar =()=>{
    navigation.navigate('Details');
  }
  return (
    <View style={styles.container}>
      <BuscadorEscaner onSearch={handleSearch} onAdd={handleAdd} />
      <ScrollView style={styles.main}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={styles.carouselItem}>
              <BeefIcon style={styles.icon} />
              <Text style={styles.carouselText}>Burgers</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.carouselItem}>
              <PizzaIcon style={styles.icon} />
              <Text style={styles.carouselText}>Pizza</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.carouselItem}>
              <BeefIcon style={styles.icon} />
              <Text style={styles.carouselText}>Meat</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <View style={styles.grid}>
            {[
              { name: 'Extra Meat Burger', price: '$20.99', image: '/placeholder.svg' },
              { name: 'Supreme Pizza', price: '$15.99', image: '/placeholder.svg' },
              { name: 'Chicken Wings', price: '$25.99', image: '/placeholder.svg' },
              { name: 'Berry Cake', price: '$10.99', image: '/placeholder.svg' },
            ].map((product, index) => (
              <TouchableOpacity key={index} style={styles.product} onPress={enviar} >
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <View style={styles.productDetails}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productPrice}>{product.price}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const SearchIcon = (props) => (
  <Svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Circle cx="11" cy="11" r="8" />
    <Path d="m21 21-4.3-4.3" />
  </Svg>
);

const BeefIcon = (props) => (
  <Svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Circle cx="12.5" cy="8.5" r="2.5" />
    <Path d="M12.5 2a6.5 6.5 0 0 0-6.22 4.6c-1.1 3.13-.78 3.9-3.18 6.08A3 3 0 0 0 5 18c4 0 8.4-1.8 11.4-4.3A6.5 6.5 0 0 0 12.5 2Z" />
    <Path d="m18.5 6 2.19 4.5a6.48 6.48 0 0 1 .31 2 6.49 6.49 0 0 1-2.6 5.2C15.4 20.2 11 22 7 22a3 3 0 0 1-2.68-1.66L2.4 16.5" />
  </Svg>
);

const PizzaIcon = (props) => (
  <Svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M15 11h.01" />
    <Path d="M11 15h.01" />
    <Path d="M16 16h.01" />
    <Path d="m2 16 20 6-6-20A20 20 0 0 0 2 16" />
    <Path d="M5.71 17.11a17.04 17.04 0 0 1 11.4-11.4" />
  </Svg>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,

  },
  main: {
    padding: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  carouselItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#F1F1F1',
    borderRadius: 10,
    marginRight: 16,
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 8,
    color: '#F97316',
  },
  carouselText: {
    fontSize: 18,
    fontWeight: '500',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  product: {
    width: '48%',
    backgroundColor: '#F1F1F1',
    borderRadius: 10,
    marginBottom: 16,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  productDetails: {
    padding: 16,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    color: '#999',
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: '#F97316',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default ProductsScreen;


