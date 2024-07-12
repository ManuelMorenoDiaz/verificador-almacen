import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
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

// Define each icon component
const LaptopIcon = (props) => (
  <Svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M3 4h18v12H3z" />
    <Path d="M2 20h20" />
    <Path d="M6 16h12v4H6z" />
  </Svg>
);

const DeskIcon = (props) => (
  <Svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M2 3h20v18H2z" />
    <Path d="M6 14h4v6H6z" />
    <Path d="M14 14h4v6h-4z" />
  </Svg>
);

const ChairIcon = (props) => (
  <Svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M6 4h12v14H6z" />
    <Path d="M4 18h16" />
    <Path d="M4 22h16" />
  </Svg>
);

const HeadphoneIcon = (props) => (
  <Svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <Path d="M21 18a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2z" />
    <Path d="M3 18a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z" />
  </Svg>
);

const KeyboardIcon = (props) => (
  <Svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M2 4h20v16H2z" />
    <Path d="M6 10h.01" />
    <Path d="M10 10h.01" />
    <Path d="M14 10h.01" />
    <Path d="M18 10h.01" />
    <Path d="M6 14h12" />
  </Svg>
);

// Define categories with correct icons
const categories = [
  { id_c: 1, name: 'Laptops', icon: LaptopIcon },
  { id_c: 2, name: 'Escritorios', icon: DeskIcon },
  { id_c: 3, name: 'Sillas', icon: ChairIcon },
  { id_c: 4, name: 'Audifonos', icon: HeadphoneIcon },
  { id_c: 5, name: 'Teclados', icon: KeyboardIcon },
];

const products = [
  { id_c: 1, name: 'Gaming Laptop', price: '$1500.99', image: '/laptop.png' },
  { id_c: 2, name: 'Office Desk', price: '$200.99', image: '/desk.png' },
  { id_c: 3, name: 'Ergonomic Chair', price: '$120.99', image: '/chair.png' },
  { id_c: 4, name: 'Wireless Headphones', price: '$250.99', image: '/headphones.png' },
  { id_c: 5, name: 'Mechanical Keyboard', price: '$100.99', image: '/keyboard.png' },
  { id_c: 1, name: 'Business Laptop', price: '$1300.99', image: '/laptop.png' },
  { id_c: 2, name: 'Gaming Desk', price: '$350.99', image: '/desk.png' },
];

const ProductsScreen: React.FC<ProductsScreenProps> = ({ navigation }) => {
  const enviar = () => {
    navigation.navigate('Detalles');
  };

  return (
    <View style={styles.container}>
      <BuscadorEscaner onSearch={handleSearch} onAdd={handleAdd} />
      <ScrollView style={styles.main}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category, index) => (
              <TouchableOpacity key={index} style={[styles.carouselItem, styles.shadow]}>
                <category.icon style={styles.icon} />
                <Text style={styles.carouselText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <View style={styles.grid}>
            {products.map((product, index) => (
              <TouchableOpacity key={index} style={[styles.product, styles.shadow]} onPress={enviar}>
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
    margin: 5,
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
    width: '45%',
    backgroundColor: '#F1F1F1',
    borderRadius: 10,
    margin: 8,
    overflow: 'hidden',
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
  productImage: {
    width: '100%',
    height: 130,
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
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductsScreen;
