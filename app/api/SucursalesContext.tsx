import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios from 'axios';
import { API_URL, getToken } from './auth';

interface Sucursal {
  id_sucursal: number;
  nombre: string;
  direccion: string;
}

interface SucursalContextType {
  sucursales: Sucursal[];
  loading: boolean;
  error: Error | null;
  fetchSucursales: () => void;
  addSucursal: (sucursalData: Omit<Sucursal, 'id_sucursal'>) => void;
  getSucursal: (id_sucursal: number) => Promise<Sucursal | null>;
  updateSucursal: (id_sucursal: number, sucursalData: Omit<Sucursal, 'id_sucursal'>) => void;
  removeSucursal: (id_sucursal: number) => void;
}

const SucursalContext = createContext<SucursalContextType | undefined>(undefined);

interface SucursalProviderProps {
  children: ReactNode;
}

export const SucursalProvider: React.FC<SucursalProviderProps> = ({ children }) => {
  const [sucursales, setSucursales] = useState<Sucursal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const showErrorAlert = (message: string) => {
    alert(`Error: ${message}`);
  };

  const fetchSucursales = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await getToken();
      const response = await axios.get(`${API_URL}/sucursales`, {
        headers: { Authorization: `${token}` },
      });
      console.log("Datos de sucursales:", response.data);

      const fetchedSucursales = response.data.sucursales;

      const uniqueSucursales = fetchedSucursales.filter((sucursal, index, self) =>
        index === self.findIndex((t) => t.id_sucursal === sucursal.id_sucursal)
      );

      setSucursales(uniqueSucursales);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      showErrorAlert(errorMessage);
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
    } finally {
      setLoading(false);
    }
  };

  const addSucursal = async (sucursalData: Omit<Sucursal, 'id_sucursal'>) => {
    setLoading(true);
    try {
      const token = await getToken();
      await axios.post(`${API_URL}/sucursales`, sucursalData, {
        headers: { Authorization: `${token}` },
      });
      await fetchSucursales();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      showErrorAlert(errorMessage);
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
    } finally {
      setLoading(false);
    }
  };

  const getSucursal = async (id_sucursal: number): Promise<Sucursal | null> => {
    setLoading(true);
    try {
      const token = await getToken();
      const response = await axios.get(`${API_URL}/sucursales/${id_sucursal}`, {
        headers: { Authorization: `${token}` },
      });
      return response.data.sucursal;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      showErrorAlert(errorMessage);
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateSucursal = async (id_sucursal: number, sucursalData: Omit<Sucursal, 'id_sucursal'>) => {
    setLoading(true);
    try {
      const token = await getToken();
      await axios.put(`${API_URL}/sucursales/${id_sucursal}`, sucursalData, {
        headers: { Authorization: `${token}` },
      });
      await fetchSucursales();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      showErrorAlert(errorMessage);
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
    } finally {
      setLoading(false);
    }
  };

  const removeSucursal = async (id_sucursal: number) => {
    setLoading(true);
    try {
      const token = await getToken();
      const response = await axios.delete(`${API_URL}/sucursales/${id_sucursal}`, {
        headers: { Authorization: `${token}` },
      });

      setResponseMessage(response.data.result);

      await fetchSucursales();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      showErrorAlert(errorMessage);
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      return "No tienes Autorización";
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSucursales();
  }, []);

  return (
    <SucursalContext.Provider
      value={{
        sucursales,
        loading,
        error,
        fetchSucursales,
        addSucursal,
        getSucursal,
        updateSucursal,
        removeSucursal,
      }}
    >
      {children}
    </SucursalContext.Provider>
  );
};

export const useSucursalContext = () => {
  const context = useContext(SucursalContext);
  if (context === undefined) {
    throw new Error('useSucursalContext must be used within a SucursalProvider');
  }
  return context;
};
