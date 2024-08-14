import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios from 'axios';
import { API_URL, getToken } from './auth';

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserContextType {
  users: User[];
  loading: boolean;
  error: Error | null;
  fetchUsers: () => void;
  addUser: (userData: Omit<User, 'id'>) => void;
  getUser: (id: number) => Promise<User | null>;
  updateUser: (id: number, userData: Omit<User, 'id'>) => void;
  removeUser: (id: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const response = await axios.get(`${API_URL}/usuarios`, {
        headers: { Authorization: `${token}` },
      });
      const fetchedUsers=response.data.usuarios;

      const uniqueUsers = fetchedUsers.filter((usuario, index, self) =>
    index ===self.findIndex((t)=>t.id === usuario.id)
    )

      setUsers(response.data.usuarios);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error:", err.message);
        setError(err);
      } else {
        console.error("Error desconocido");
        setError(new Error('Unknown error occurred'));
      }
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (userData: Omit<User, 'id'>) => {
    setLoading(true);
    try {
      const token = await getToken();
      await axios.post(`${API_URL}/usuarios`, userData, {
        headers: { Authorization: `${token}` },
      });
      await fetchUsers(); // Actualizar la lista después de añadir
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

  const getUser = async (id: number): Promise<User | null> => {
    setLoading(true);
    try {
      const token = await getToken();
      const response = await axios.get(`${API_URL}/usuarios/${id}`, {
        headers: { Authorization: `${token}` },
      });
      return response.data;
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

  const updateUser = async (id: number, userData: Omit<User, 'id'>) => {
    setLoading(true);
    try {
      const token = await getToken();
      await axios.put(`${API_URL}/usuarios/${id}`, userData, {
        headers: { Authorization: `${token}` },
      });
      await fetchUsers(); // Actualizar la lista después de editar
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

  const removeUser = async (id: number) => {
    setLoading(true);
    try {
      const token = await getToken();
      await axios.delete(`${API_URL}/usuarios/${id}`, {
        headers: { Authorization: `${token}` },
      });
      await fetchUsers(); // Actualizar la lista después de eliminar
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
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider
      value={{
        users,
        loading,
        error,
        fetchUsers,
        addUser,
        getUser,
        updateUser,
        removeUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
