import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios from 'axios';
import { API_URL, getToken } from './auth';

interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  // Agrega otras propiedades necesarias
}

interface CategoryContextType {
  categories: Category[];
  loading: boolean;
  error: Error | null;
  fetchCategories: () => void;
  addCategory: (categoryData: Omit<Category, 'id'>) => void;
  getCategory: (id: number) => Promise<Category | null>;
  updateCategory: (id: number, categoryData: Omit<Category, 'id'>) => void;
  removeCategory: (id: number) => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

interface CategoryProviderProps {
  children: ReactNode;
}

export const CategoryProvider: React.FC<CategoryProviderProps> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const response = await axios.get(`${API_URL}/categorias`, {
        headers: { Authorization: `${token}` },
      });
      setCategories(response.data.categorias);
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

  const addCategory = async (categoryData: Omit<Category, 'id'>) => {
    setLoading(true);
    try {
      const token = await getToken();
      await axios.post(`${API_URL}/categorias`, categoryData, {
        headers: { Authorization: `${token}` },
      });
      await fetchCategories();
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

  const getCategory = async (id: number): Promise<Category | null> => {
    setLoading(true);
    try {
      const token = await getToken();
      const response = await axios.get(`${API_URL}/categorias/${id}`, {
        headers: { Authorization: `${token}` },
      });
      return response.data.categoria;
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

  const updateCategory = async (id: number, categoryData: Omit<Category, 'id'>) => {
    setLoading(true);
    try {
      const token = await getToken();
      await axios.put(`${API_URL}/categorias/${id}`, categoryData, {
        headers: { Authorization: `${token}` },
      });
      await fetchCategories();
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

  const removeCategory = async (id: number) => {
    setLoading(true);
    try {
      const token = await getToken();
      await axios.delete(`${API_URL}/categorias/${id}`, {
        headers: { Authorization: `${token}` },
      });
      await fetchCategories();
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
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        loading,
        error,
        fetchCategories,
        addCategory,
        getCategory,
        updateCategory,
        removeCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoriesContext = () => {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error('useCategoryContext must be used within a CategoryProvider');
  }
  return context;
};
