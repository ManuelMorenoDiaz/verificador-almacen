
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Circle, Path, Line } from 'react-native-svg';

const DetailsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
         
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.itemContainer}>
          <Image
            source={{ uri: 'https://images.vexels.com/media/users/3/152411/isolated/preview/4a22d435331dde73ae0f1cebbdbaacff-icono-de-hamburguesa-doble.png' }} // Cambiar por la ruta correcta de la imagen
            style={styles.image}
          />
          <Text style={styles.itemTitle}>Mc45 Double</Text>
          <Text style={styles.itemPrice}>$20.99</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity style={styles.quantityButton}>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={styles.quantityIcon}
              >
                <Path d="M5 12h14" />
              </Svg>
            </TouchableOpacity>
            <Text style={styles.quantity}>1</Text>
            <TouchableOpacity style={styles.quantityButton}>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={styles.quantityIcon}
              >
                <Path d="M5 12h14M12 5v14" />
              </Svg>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.tabContainer}>
          <View style={styles.tabs}>
            <TouchableOpacity style={styles.tabButton}>
              <Text style={styles.tabButtonText}>Tienda 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabButton}>
              <Text style={styles.tabButtonText}>Tienda 2</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tabContent}>
            <View style={styles.tabPane}>
              <Text style={styles.tabPaneTitle}>Tienda 1</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>In Stock</Text>
              </View>
              <Text style={styles.tabPaneAddress}>123 Main St, Anytown USA 12345</Text>
            </View>
            <View style={styles.tabPane}>
              <Text style={styles.tabPaneTitle}>Tienda 2</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>In Stock</Text>
              </View>
              <Text style={styles.tabPaneAddress}>456 Oak Rd, Othertown USA 67890</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC', // Cambiar al color de fondo deseado
    color: '#1A202C', // Cambiar al color de texto deseado
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0', // Cambiar al color deseado
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 8,
    color: '#F97316', // Cambiar al color deseado
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#F97316', // Cambiar al color deseado
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    
  },
  quantityButton: {
    borderWidth: 1,
    borderColor: '#E2E8F0', // Cambiar al color deseado
    borderRadius: 25,
    padding: 8,
    marginRight: 8,
  },
  quantityIcon: {
    width: 20,
    height: 20,
    color: '#4A5568', // Cambiar al color deseado
  },
  quantity: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
  tabContainer: {
    marginTop: 16,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  tabButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    backgroundColor: '#E2E8F0', // Cambiar al color deseado
    borderRadius: 25,
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3748', // Cambiar al color deseado
  },
  tabContent: {
    marginTop: 8,
  },
  tabPane: {
    marginBottom: 8,
  },
  tabPaneTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  badge: {
    backgroundColor: '#E2E8F0', // Cambiar al color deseado
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 999,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2D3748', // Cambiar al color deseado
  },
  tabPaneAddress: {
    color: '#4A5568', // Cambiar al color deseado
  },
});

export default DetailsScreen;
