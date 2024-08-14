import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useRoute } from '@react-navigation/native';

const DetailsScreen = () => {
  const route = useRoute();
  const { product } = route.params;

  // Función para convertir base64 a URI de imagen
  const base64ToUri = (base64String) => `data:image/png;base64,${base64String}`;

  return (
    <ScrollView style={styles.container}>
      
      <View style={styles.content}>
        <View style={styles.itemContainer}>
          <Image
            source={{ uri: `${product.imagen}` }} // Cambia esto a la ruta de la imagen de tu producto si tienes una
            style={styles.image}
          />
          <Text style={styles.itemTitle}>{product.nombre}</Text>
          <Text style={styles.itemPrice}>${product.precio}</Text>
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
            <Text style={styles.quantity}>{product.cantidad}</Text>
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
              <Text style={styles.tabButtonText}>{product.nombre_sucursal}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tabContent}>
            <View style={styles.tabPane}>
              <Text style={styles.tabPaneTitle}>Categorias</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{product.nombre_categoria}</Text>
              </View>
            </View>
            <View style={styles.tabPane}>
              <Text style={styles.tabPaneTitle}>Descripción</Text>
              <View>
                <Text style={styles.badgeText}>{product.descripcion}</Text>
              </View>
            </View>
          </View>
          <View style={styles.tabContent}>
            <View style={styles.tabPane}>
              <Text style={styles.tabPaneTitle}>Código QR / Barras</Text>
              <View style={styles.codesContainer}>
                <View style={styles.codeContainer}>
                  <Image
                    source={{ uri: base64ToUri(product.qr_code) }}
                    style={styles.codeImage}
                  />
                  <Image
                    source={{ uri: base64ToUri(product.barcode) }}
                    style={[styles.codeImage, styles.barcodeImage]}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Cambia al color de fondo deseado
    color: '#1A202C', // Cambia al color de texto deseado
    marginBottom: 50,
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0', // Cambia al color deseado
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 8,
    color: '#F97316', // Cambia al color deseado
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
    color: '#F97316', // Cambia al color deseado
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  quantityButton: {
    borderWidth: 1,
    borderColor: '#E2E8F0', // Cambia al color deseado
    borderRadius: 25,
    padding: 8,
    marginRight: 8,
  },
  quantityIcon: {
    width: 20,
    height: 20,
    color: '#4A5568', // Cambia al color deseado
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
    backgroundColor: '#E2E8F0', // Cambia al color deseado
    borderRadius: 25,
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3748', // Cambia al color deseado
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
    backgroundColor: '#E2E8F0', // Cambia al color deseado
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 999,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2D3748', // Cambia al color deseado
  },
  codesContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  codeContainer: {
    marginBottom: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  codeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  codeImage: {
    width: 150,
    height: 150,
    marginLeft: 20,
    marginBottom: 10,
    resizeMode: 'contain', // Cambiado a 'contain' para preservar la proporción
  },
  barcodeImage: {
    width: 300, // Ajusta el ancho para que el código de barras no esté demasiado comprimido
    height: 150, // Asegúrate de que la altura sea suficiente para que los datos sean legibles
  },
});

export default DetailsScreen;
