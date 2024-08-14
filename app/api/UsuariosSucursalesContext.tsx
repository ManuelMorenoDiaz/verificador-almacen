import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios from 'axios';
import { API_URL, getToken } from './auth';

interface UsuarioSucursal {
  id: number;
  id_usuario: number;
  id_sucursal: number;
}

interface UsuarioSucursalContextType {
  usuarioSucursales: UsuarioSucursal[];
  loading: boolean;
  error: Error | null;
  fetchUsuarioSucursales: () => void;
  addUsuarioSucursal: (idUsuario: number, idSucursal: number) => void;
  getUsuarioSucursal: (id: number) => Promise<UsuarioSucursal | null>;
  updateUsuarioSucursal: (id: number, idUsuario: number, idSucursal: number) => void;
  removeUsuarioSucursal: (id: number) => void;
}

const UsuarioSucursalContext = createContext<UsuarioSucursalContextType | undefined>(undefined);

interface UsuarioSucursalProviderProps {
  children: ReactNode;
}

export const UsuarioSucursalProvider: React.FC<UsuarioSucursalProviderProps> = ({ children }) => {
  const [usuarioSucursales, setUsuarioSucursales] = useState<UsuarioSucursal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchUsuarioSucursales = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const response = await axios.get(`${API_URL}/usuarios_sucursales`, {
        headers: { Authorization: `${token}` },
      });
      
      setUsuarioSucursales(response.data.usuarios_sucursales);
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

  const addUsuarioSucursal = async (idUsuario: number, idSucursal: number) => {
    setLoading(true);
    try {
      const token = await getToken();
      await axios.post(`${API_URL}/usuarios_sucursales`, { id_usuario: idUsuario, id_sucursal: idSucursal }, {
        headers: { Authorization: `${token}` },
      });
      await fetchUsuarioSucursales(); // Refresh the list after adding
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

  const getUsuarioSucursal = async (id: number): Promise<UsuarioSucursal | null> => {
    setLoading(true);
    try {
      const token = await getToken();
      const response = await axios.get(`${API_URL}/usuarios_sucursales/${id}`, {
        headers: { Authorization: `${token}` },
      });
      return response.data.usuario_sucursal;
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

  const updateUsuarioSucursal = async (id: number, idUsuario: number, idSucursal: number) => {
    setLoading(true);
    try {
      const token = await getToken();
      await axios.put(`${API_URL}/usuarios_sucursales/${id}`, { id_usuario: idUsuario, id_sucursal: idSucursal }, {
        headers: { Authorization: `${token}` },
      });
      await fetchUsuarioSucursales(); // Refresh the list after updating
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

  const removeUsuarioSucursal = async (id: number) => {
    setLoading(true);
    try {
      const token = await getToken();
      await axios.delete(`${API_URL}/usuarios_sucursales/${id}`, {
        headers: { Authorization: `${token}` },
      });
      await fetchUsuarioSucursales(); // Refresh the list after deleting
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
    fetchUsuarioSucursales();
  }, []);

  return (
    <UsuarioSucursalContext.Provider
      value={{
        usuarioSucursales,
        loading,
        error,
        fetchUsuarioSucursales,
        addUsuarioSucursal,
        getUsuarioSucursal,
        updateUsuarioSucursal,
        removeUsuarioSucursal,
      }}
    >
      {children}
    </UsuarioSucursalContext.Provider>
  );
};

export const useUsuarioSucursalContext = () => {
  const context = useContext(UsuarioSucursalContext);
  if (context === undefined) {
    throw new Error('useUsuarioSucursalContext must be used within a UsuarioSucursalProvider');
  }
  return context;
};
