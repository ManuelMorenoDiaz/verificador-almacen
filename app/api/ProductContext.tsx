import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';
import axios from 'axios';
import { API_URL, getToken } from './auth';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: Error | null;
  fetchProducts: () => void;
  addProduct: (productData: Omit<Product, 'id'>) => void;
  getProduct: (id: number) => Promise<Product | null>;
  updateProduct: (id: number, productData: Omit<Product, 'id'>) => void;
  removeProduct: (id: number) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isFetched, setIsFetched] = useState(false); // Nueva variable de estado

  const fetchProducts = useCallback(async () => {
    if (isFetched) return; // Si ya se ha hecho la petición, no hacer nada

    setLoading(true);
    try {
      const token = await getToken();
      console.log("Token:", token); // Verifica que el token sea el esperado
      const response = await axios.get(`${API_URL}/productos`, {
        headers: { Authorization: `${token}` },
      });
      
      setProducts(response.data.productos);
      setIsFetched(true); // Marcar como ya se han obtenido los datos
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error:", err.message); // Muestra el mensaje de error completo
        setError(err);
      } else {
        console.error("Error desconocido");
        setError(new Error('Unknown error occurred'));
      }
    } finally {
      setLoading(false);
    }
  }, [isFetched]); // Añadir isFetched como dependencia

  const addProduct = async (productData: Omit<Product, 'id'>) => {
    setLoading(true);
    try {
      const token = await getToken();
      await axios.post(`${API_URL}/productos`, productData, {
        headers: { Authorization: `${token}` },
      });
      setIsFetched(false); // Marcar para volver a cargar los productos después de añadir
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error('Unknown error occurred'));
      }
    } finally {
      setLoading(false);
    }
  };

  const getProduct = async (id: number): Promise<Product | null> => {
    setLoading(true);
    try {
      const token = await getToken();
      const response = await axios.get(`${API_URL}/productos/${id}`, {
        headers: { Authorization: `${token}` },
      });
      return response.data.producto; // Ajusta según la estructura del backend
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error('Unknown error occurred'));
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id: number, productData: Omit<Product, 'id'>) => {
    setLoading(true);
    try {
      const token = await getToken();
      await axios.put(`${API_URL}/productos/${id}`, productData, {
        headers: { Authorization: `${token}` },
      });
      setIsFetched(false); // Marcar para volver a cargar los productos después de editar
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error('Unknown error occurred'));
      }
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (id: number) => {
    setLoading(true);
    try {
      const token = await getToken();
      await axios.delete(`${API_URL}/productos/${id}`, {
        headers: { Authorization: `${token}` },
      });
      setIsFetched(false); // Marcar para volver a cargar los productos después de eliminar
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error('Unknown error occurred'));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(); // Este efecto debería ejecutarse solo una vez
  }, [fetchProducts]);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        fetchProducts,
        addProduct,
        getProduct,
        updateProduct,
        removeProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};
