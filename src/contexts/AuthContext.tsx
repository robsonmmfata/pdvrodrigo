
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  whatsapp?: string;
  role: 'admin' | 'seller' | 'customer';
  storeId?: string;
}

interface Store {
  id: string;
  name: string;
  active: boolean;
}

interface AuthContextType {
  user: User | null;
  currentStore: Store | null;
  stores: Store[];
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setCurrentStore: (store: Store) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const [currentStore, setCurrentStoreState] = useState<Store | null>(() => {
    const saved = localStorage.getItem('currentStore');
    return saved ? JSON.parse(saved) : null;
  });

  const [stores] = useState<Store[]>([
    { id: '1', name: 'Loja Centro', active: true },
    { id: '2', name: 'Loja Shopping', active: true },
    { id: '3', name: 'Loja Online', active: true },
  ]);

  const login = async (email: string, password: string) => {
    // Simulação de login com diferentes tipos de usuário
    let mockUser: User;

    if (email === 'admin@loja.com' && password === '123456') {
      mockUser = {
        id: '1',
        name: 'Admin Master',
        email,
        role: 'admin',
      };
    } else if (email === 'vendedor@loja.com' && password === '123456') {
      mockUser = {
        id: '2',
        name: 'Vendedor João',
        email,
        role: 'seller',
        storeId: '1',
      };
    } else if (email === 'cliente@loja.com' && password === '123456') {
      mockUser = {
        id: '3',
        name: 'Cliente Maria',
        email,
        role: 'customer',
      };
    } else {
      throw new Error('Credenciais inválidas');
    }
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    if (!currentStore && stores.length > 0) {
      setCurrentStore(stores[0]);
    }
  };

  const logout = () => {
    setUser(null);
    setCurrentStoreState(null);
    localStorage.removeItem('user');
    localStorage.removeItem('currentStore');
  };

  const setCurrentStore = (store: Store) => {
    setCurrentStoreState(store);
    localStorage.setItem('currentStore', JSON.stringify(store));
  };

  return (
    <AuthContext.Provider value={{
      user,
      currentStore,
      stores,
      login,
      logout,
      setCurrentStore,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
