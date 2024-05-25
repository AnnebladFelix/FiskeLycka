import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserData {
  userId: string;
  email: string;
}

const AuthContext = createContext<{
  user: UserData | null;
  login: (userData: UserData) => void;
  logout: () => void;
} | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);

  const login = (userData: UserData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
