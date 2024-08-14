import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';
import axios from 'axios';
import { API_URL, getToken } from './auth';
import { Alert } from 'react-native';

interface DetalleOrden {
  id_producto: number;
  cantidad: number;
}

interface Orden {
  id_ordenVerificacion: number;
  estado: string;
  fecha: string;
  id_sucursal: number;
  id_usuario: number;
  detalles: DetalleOrden[];
}

interface OrdenContextType {
  ordenes: Orden[];
  loading: boolean;
  error: string | null;
  fetchOrdenes: () => void;
  getOrden: (id: number) => Promise<Orden | null>;
  removeOrden: (id: number) => Promise<void>;
  updateOrden: (id: number, updatedOrden: Orden) => Promise<void>;
  addOrden: (orden: Orden) => Promise<string | null>; // Nueva función añadida
}

const OrdenContext = createContext<OrdenContextType | undefined>(undefined);

export const OrdenProvider = ({ children }: { children: ReactNode }) => {
  const [ordenes, setOrdenes] = useState<Orden[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrdenes = useCallback(async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const response = await axios.get(`${API_URL}/ordenes`, {
        headers: { Authorization: `${token}` },
      });
      setOrdenes(response.data.ordenes);
      setError(null);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.message);
        return err.message; // Devolver el mensaje de error
      } else {
        setError('Ocurrió un error inesperado');
        return 'Ocurrió un error inesperado'; // Devolver un mensaje de error genérico
      }
    } finally {
      setLoading(false);
    }
    return null;
  }, []);
  
  const getOrden = async (id: number): Promise<Orden | null> => {
    setLoading(true);
    try {
      const token = await getToken();
      const response = await axios.get(`${API_URL}/ordenes/${id}`, {
        headers: { Authorization: `${token}` },
      });
      setError(null);
      return response.data.orden;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.message);
        return null;
      } else {
        setError('Ocurrió un error inesperado');
        return null;
      }
    } finally {
      setLoading(false);
    }
  };
  
  const removeOrden = async (id: number): Promise<string | null> => {
    setLoading(true);
    try {
      const token = await getToken();
      const res = await axios.delete(`${API_URL}/ordenes/${id}`, {
        headers: { Authorization: `${token}` },
      });

      if (res.status === 403) {
        console.log('Error de autorización');
        Alert.alert('Error', 'No tienes permiso para eliminar esta orden');
        return 'Error de autorización';
      }

      setOrdenes((prev) => prev.filter((orden) => orden.id_ordenVerificacion !== id));
      setError(null);
      return null;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.message);
        return err.message; // Devolver el mensaje de error
      } else {
        setError('Ocurrió un error inesperado');
        return 'Ocurrió un error inesperado'; // Devolver un mensaje de error genérico
      }
    } finally {
      setLoading(false);
    }
  };
  
  const updateOrden = async (id: number, updatedOrden: Orden): Promise<string | null> => {
    setLoading(true);
    try {
      const token = await getToken();
      await axios.put(`${API_URL}/ordenes/${id}`, updatedOrden, {
        headers: { Authorization: `${token}` },
      });
      setOrdenes((prev) =>
        prev.map((orden) => (orden.id_ordenVerificacion === id ? updatedOrden : orden))
      );
      setError(null);
      return null;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.message);
        return err.message; // Devolver el mensaje de error
      } else {
        setError('Ocurrió un error inesperado');
        return 'Ocurrió un error inesperado'; // Devolver un mensaje de error genérico
      }
    } finally {
      setLoading(false);
    }
  };

  const addOrden = async (orden: Orden): Promise<string | null> => {
    setLoading(true);
    try {
      const token = await getToken();
      const response = await axios.post(`${API_URL}/ordenes`, orden, {
        headers: { Authorization: `${token}` },
      });
      console.log('Respuesta de la API:', response.data); // Verifica la estructura de la respuesta
      setOrdenes((prev) => [...prev, response.data.orden]); // Actualiza el estado con la nueva orden
      setError(null);
      return null;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.message);
        return err.message; // Devolver el mensaje de error
      } else {
        setError('Ocurrió un error inesperado');
        return 'Ocurrió un error inesperado'; // Devolver un mensaje de error genérico
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <OrdenContext.Provider value={{ ordenes, loading, error, fetchOrdenes, getOrden, removeOrden, updateOrden, addOrden }}>
      {children}
    </OrdenContext.Provider>
  );
};

export const useOrdenContext = () => {
  const context = useContext(OrdenContext);
  if (!context) {
    throw new Error('useOrdenContext debe ser usado dentro de OrdenProvider');
  }
  return context;
};
